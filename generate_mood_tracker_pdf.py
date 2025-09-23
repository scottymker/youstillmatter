import math
from collections import OrderedDict


def escape_pdf_text(text: str) -> str:
    return text.replace("\\", r"\\\\").replace("(", r"\\(").replace(")", r"\\)")


objects: list[str] = []


def add_object(content: str) -> int:
    objects.append(content)
    return len(objects)


font_objects = OrderedDict(
    {
        "F1": add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
        "F2": add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"),
        "F3": add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique >>"),
        "F4": add_object("<< /Type /Font /Subtype /Type1 /BaseFont /ZapfDingbats >>"),
    }
)

content_lines: list[str] = []
content_lines.append("1 w")
content_lines.append("0 0 0 rg")
content_lines.append("0 0 0 RG")


def fmt(value: float) -> str:
    return f"{value:.2f}".rstrip("0").rstrip(".") if not float(value).is_integer() else str(int(value))


def draw_soft_rect(x: float, y: float, w: float, h: float) -> None:
    content_lines.extend(
        [
            "0.83 0.83 0.83 RG",
            "0.96 0.96 0.96 rg",
            f"{fmt(x)} {fmt(y)} {fmt(w)} {fmt(h)} re B",
            "0 0 0 RG",
            "0 0 0 rg",
        ]
    )


def draw_checkbox(x: float, y: float, size: float) -> None:
    content_lines.extend(
        [
            "0.75 0.75 0.75 RG",
            "1 1 1 rg",
            f"{fmt(x)} {fmt(y)} {fmt(size)} {fmt(size)} re S",
            "0 0 0 RG",
            "0 0 0 rg",
        ]
    )


def draw_circle(cx: float, cy: float, radius: float) -> None:
    c = 0.5522847498 * radius
    content_lines.extend(
        [
            "0.75 0.75 0.75 RG",
            "0.98 0.98 0.98 rg",
            "n",
            f"{fmt(cx)} {fmt(cy + radius)} m",
            f"{fmt(cx + c)} {fmt(cy + radius)} {fmt(cx + radius)} {fmt(cy + c)} {fmt(cx + radius)} {fmt(cy)} c",
            f"{fmt(cx + radius)} {fmt(cy - c)} {fmt(cx + c)} {fmt(cy - radius)} {fmt(cx)} {fmt(cy - radius)} c",
            f"{fmt(cx - c)} {fmt(cy - radius)} {fmt(cx - radius)} {fmt(cy - c)} {fmt(cx - radius)} {fmt(cy)} c",
            f"{fmt(cx - radius)} {fmt(cy + c)} {fmt(cx - c)} {fmt(cy + radius)} {fmt(cx)} {fmt(cy + radius)} c",
            "B",
            "0 0 0 RG",
            "0 0 0 rg",
        ]
    )


def draw_star(cx: float, cy: float, outer_r: float, inner_r: float) -> None:
    points: list[tuple[float, float]] = []
    for i in range(10):
        angle = math.radians(90 - i * 36)
        radius = outer_r if i % 2 == 0 else inner_r
        points.append((cx + radius * math.cos(angle), cy + radius * math.sin(angle)))

    content_lines.extend([
        "0.75 0.75 0.75 RG",
        "1 1 1 rg",
        f"{fmt(points[0][0])} {fmt(points[0][1])} m",
    ])
    for x, y in points[1:]:
        content_lines.append(f"{fmt(x)} {fmt(y)} l")
    content_lines.extend(["h", "S", "0 0 0 RG", "0 0 0 rg"])


def add_text(font_ref: str, size: float, x: float, y: float, text: str) -> None:
    content_lines.append(
        f"BT /{font_ref} {fmt(size)} Tf {fmt(x)} {fmt(y)} Td ({escape_pdf_text(text)}) Tj ET"
    )


checkbox_x = 36
checkbox_top = 700
checkbox_size = 20
for index in range(11):
    draw_checkbox(checkbox_x, checkbox_top - index * 40, checkbox_size)

add_text("F3", 34, 72, 722, "Mental health check in")
add_text("F2", 11, 360, 678, "DATE")
draw_soft_rect(360, 646, 180, 28)

add_text("F2", 11, 72, 634, "HOW ARE YOU FEELING TODAY?")
draw_soft_rect(72, 496, 228, 126)

add_text("F2", 11, 72, 472, "HOW ARE YOU FEELING TODAY?")
draw_soft_rect(72, 414, 228, 58)
for offset in range(5):
    draw_circle(96 + offset * 44, 443, 14)

add_text("F2", 11, 72, 392, "HOW CAN YOU IMPROVE YOUR MENTAL HEALTH?")
draw_soft_rect(72, 282, 228, 106)

add_text("F2", 11, 320, 634, "WHAT HAVE BEEN YOUR THREE DOMINANT EMOTIONS THIS WEEK?")
draw_soft_rect(320, 496, 220, 126)

add_text("F2", 11, 320, 472, "WHAT DO YOU FEEL GOOD ABOUT RIGHT NOW?")
draw_soft_rect(320, 414, 220, 58)

add_text("F2", 11, 320, 392, "THINGS THAT TRIGGER NEGATIVE EMOTIONS")
draw_soft_rect(320, 332, 220, 74)

add_text("F2", 11, 320, 310, "MY RANKING OF MY MENTAL HEALTH THIS WEEK")
draw_soft_rect(320, 270, 220, 50)
for offset in range(5):
    draw_star(350 + offset * 36, 296, 14, 6)

content_stream = "\n".join(content_lines)
stream_obj = f"<< /Length {len(content_stream)} >>\nstream\n{content_stream}\nendstream"
stream_obj_num = add_object(stream_obj)

# Placeholder for page object so we can reference its number in annotations
page_obj_num = add_object("<<>>")

pages_obj_num = add_object("<<>>")
acroform_obj_num = add_object("<<>>")
catalog_obj_num = add_object(
    f"<< /Type /Catalog /Pages {pages_obj_num} 0 R /AcroForm {acroform_obj_num} 0 R >>"
)

form_fields = [
    {"type": "text", "name": "Date", "rect": [368, 650, 532, 670], "multiline": False},
    {"type": "text", "name": "FeelingSummary", "rect": [78, 504, 294, 612], "multiline": True},
    {"type": "text", "name": "FeelingEmoji", "rect": [78, 444, 294, 468], "multiline": False},
    {"type": "text", "name": "ImproveMentalHealth", "rect": [78, 292, 294, 382], "multiline": True},
    {"type": "text", "name": "DominantEmotions", "rect": [326, 504, 532, 612], "multiline": True},
    {"type": "text", "name": "FeelGood", "rect": [326, 422, 532, 464], "multiline": True},
    {"type": "text", "name": "Triggers", "rect": [326, 338, 532, 396], "multiline": True},
    {"type": "text", "name": "WeeklyRanking", "rect": [326, 304, 532, 320], "multiline": False},
    {
        "type": "button",
        "name": "PrintForm",
        "rect": [456, 724, 572, 748],
        "caption": "Print form",
    },
]

annotation_obj_nums: list[int] = []
for field in form_fields:
    rect_values = " ".join(fmt(value) for value in field["rect"])
    if field["type"] == "text":
        flags = 4096 if field.get("multiline") else 0
        parts = [
            "<<",
            "/Type /Annot",
            "/Subtype /Widget",
            f"/Rect [{rect_values}]",
            "/FT /Tx",
            f"/T ({escape_pdf_text(field['name'])})",
            "/F 4",
            f"/P {page_obj_num} 0 R",
            "/DA (/F1 11 Tf 0 g)",
            "/MK <<>>",
            f"/Ff {flags}",
            "/BS << /W 0 >>",
            "/V ()",
            ">>",
        ]
    else:
        caption = escape_pdf_text(field["caption"])
        js_code = escape_pdf_text("this.print(true);")
        parts = [
            "<<",
            "/Type /Annot",
            "/Subtype /Widget",
            f"/Rect [{rect_values}]",
            "/FT /Btn",
            f"/T ({escape_pdf_text(field['name'])})",
            "/F 4",
            f"/P {page_obj_num} 0 R",
            "/DA (/F1 12 Tf 0 g)",
            f"/MK << /CA ({caption}) /BG [0.88 0.91 0.96] /BC [0.56 0.63 0.78] >>",
            "/Ff 65536",
            "/BS << /W 1 /S /S >>",
            f"/A << /S /JavaScript /JS ({js_code}) >>",
            ">>",
        ]
    annotation_obj_nums.append(add_object("\n".join(parts)))

font_resource_entries = " ".join(f"/{name} {obj_num} 0 R" for name, obj_num in font_objects.items())
annots_array = "[" + " ".join(f"{num} 0 R" for num in annotation_obj_nums) + "]"

page_dict = (
    f"<< /Type /Page /Parent {pages_obj_num} 0 R /MediaBox [0 0 612 792] "
    f"/Resources << /Font << {font_resource_entries} >> >> "
    f"/Contents {stream_obj_num} 0 R /Annots {annots_array} >>"
)
objects[page_obj_num - 1] = page_dict

pages_dict = f"<< /Type /Pages /Kids [{page_obj_num} 0 R] /Count 1 >>"
objects[pages_obj_num - 1] = pages_dict

fields_array = "[" + " ".join(f"{num} 0 R" for num in annotation_obj_nums) + "]"
acroform_dict = (
    f"<< /Fields {fields_array} /DA (/F1 11 Tf 0 g) "
    f"/NeedAppearances true /DR << /Font << {font_resource_entries} >> >> >>"
)
objects[acroform_obj_num - 1] = acroform_dict

pdf_header = "%PDF-1.4\n%âãÏÓ\n"
body_entries = []
for index, content in enumerate(objects, start=1):
    body_entries.append(f"{index} 0 obj\n{content}\nendobj\n")

pdf_body_content = "".join(body_entries)
position = len(pdf_header)
offsets = []
for entry in body_entries:
    offsets.append(position)
    position += len(entry)

xref_start = position
xref_lines = [f"xref\n0 {len(objects) + 1}\n0000000000 65535 f \n"]
for offset in offsets:
    xref_lines.append(f"{offset:010d} 00000 n \n")
xref_section = "".join(xref_lines)
trailer = f"trailer\n<< /Size {len(objects) + 1} /Root {catalog_obj_num} 0 R >>\nstartxref\n{xref_start}\n%%EOF\n"

with open("assets/mood-tracker-checkin.pdf", "wb") as pdf_file:
    pdf_file.write(pdf_header.encode("latin-1"))
    pdf_file.write(pdf_body_content.encode("latin-1"))
    pdf_file.write(xref_section.encode("latin-1"))
    pdf_file.write(trailer.encode("latin-1"))
