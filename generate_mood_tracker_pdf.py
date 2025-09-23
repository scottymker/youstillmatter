def escape_pdf_text(text: str) -> str:
    return text.replace("\\", r"\\\\").replace("(", r"\\(").replace(")", r"\\)")

objects = []

def add_object(content: str) -> int:
    objects.append(content)
    return len(objects)

# Font object
font_obj_num = add_object("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

# Content stream
content_lines = []
content_lines.append("1 w")

# Draw checkboxes along left margin (10 boxes)
start_y = 680
box_size = 16
for i in range(10):
    y = start_y - i * 40
    content_lines.append(f"50 {y} {box_size} {box_size} re S")

# Title
content_lines.append(f"BT /F1 28 Tf 72 712 Td ({escape_pdf_text('Mental health check in')}) Tj ET")

# Section labels and boxes
# Date label and rectangle
content_lines.append(f"BT /F1 12 Tf 360 670 Td ({escape_pdf_text('Date')}) Tj ET")
content_lines.append("360 640 180 28 re S")

# Left column text areas
content_lines.append(f"BT /F1 12 Tf 72 640 Td ({escape_pdf_text('How are you feeling today?')}) Tj ET")
content_lines.append("72 470 228 160 re S")

content_lines.append(f"BT /F1 12 Tf 72 460 Td ({escape_pdf_text('How are you feeling today? (emoji or words)')}) Tj ET")
content_lines.append("72 400 228 60 re S")

content_lines.append(f"BT /F1 12 Tf 72 390 Td ({escape_pdf_text('How can you improve your mental health?')}) Tj ET")
content_lines.append("72 280 228 110 re S")

# Right column text areas
content_lines.append(f"BT /F1 12 Tf 320 640 Td ({escape_pdf_text('Three dominant emotions this week')}) Tj ET")
content_lines.append("320 500 220 140 re S")

content_lines.append(f"BT /F1 12 Tf 320 490 Td ({escape_pdf_text('What do you feel good about right now?')}) Tj ET")
content_lines.append("320 420 220 70 re S")

content_lines.append(f"BT /F1 12 Tf 320 410 Td ({escape_pdf_text('Things that trigger negative emotions')}) Tj ET")
content_lines.append("320 330 220 80 re S")

content_lines.append(f"BT /F1 12 Tf 320 320 Td ({escape_pdf_text('My ranking of my mental health this week (1-5)')}) Tj ET")
content_lines.append("320 270 220 50 re S")

content_stream = "\n".join(content_lines)
stream_obj = f"<< /Length {len(content_stream)} >>\nstream\n{content_stream}\nendstream"
stream_obj_num = add_object(stream_obj)

# Page object placeholder will reference annotations later
page_annotations = []

# Helper to create text field annotations
annotation_templates = []

# Date field
annotation_templates.append({
    "name": "Date",
    "rect": [360, 640, 540, 668],
    "multiline": False,
})

annotation_templates.append({
    "name": "FeelingSummary",
    "rect": [72, 470, 300, 630],
    "multiline": True,
})

annotation_templates.append({
    "name": "FeelingEmoji",
    "rect": [72, 400, 300, 458],
    "multiline": False,
})

annotation_templates.append({
    "name": "ImproveMentalHealth",
    "rect": [72, 280, 300, 388],
    "multiline": True,
})

annotation_templates.append({
    "name": "DominantEmotions",
    "rect": [320, 500, 540, 628],
    "multiline": True,
})

annotation_templates.append({
    "name": "FeelGood",
    "rect": [320, 420, 540, 488],
    "multiline": True,
})

annotation_templates.append({
    "name": "Triggers",
    "rect": [320, 330, 540, 408],
    "multiline": True,
})

annotation_templates.append({
    "name": "WeeklyRanking",
    "rect": [320, 270, 540, 318],
    "multiline": False,
})

annotation_obj_nums = []
for tmpl in annotation_templates:
    rect = tmpl["rect"]
    name = tmpl["name"]
    multiline = tmpl["multiline"]
    flags = 4096 if multiline else 0
    field_dict = [
        "<<",
        "/Type /Annot",
        "/Subtype /Widget",
        f"/Rect [{rect[0]} {rect[1]} {rect[2]} {rect[3]}]",
        "/FT /Tx",
        f"/T ({escape_pdf_text(name)})",
        "/F 4",
        "/P 0 0 R",  # placeholder, will replace
        "/DA (/F1 11 Tf 0 g)",
        "/MK <<>>",
        f"/Ff {flags}",
        "<< /AP <<>> >>",
        "/V ()",
        ">>"
    ]
    field_str = "\n".join(field_dict)
    obj_num = add_object(field_str)
    annotation_obj_nums.append(obj_num)

# After creating annotations, we know page object index
# But we have placeholder /P 0 0 R to replace later. We'll adjust when assembling final PDF.

# Page object referencing annotations and content
page_obj_num = add_object("<< /Type /Page /Parent 0 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 {} 0 R >> >> /Contents {} 0 R /Annots [] >>".format(font_obj_num, stream_obj_num))

# Pages object referencing page
pages_obj_num = add_object("<< /Type /Pages /Kids [{} 0 R] /Count 1 >>".format(page_obj_num))

# Catalog with AcroForm placeholder
acroform_obj_num = add_object("<< /Fields [] /DA (/F1 11 Tf 0 g) >>")

catalog_obj_num = add_object("<< /Type /Catalog /Pages {} 0 R /AcroForm {} 0 R >>".format(pages_obj_num, acroform_obj_num))

# Now we need to update references (since we now know object numbers)

def build_object(obj_num: int, content: str) -> str:
    return f"{obj_num} 0 obj\n{content}\nendobj\n"

updated_objects = []
for idx, content in enumerate(objects, start=1):
    updated_objects.append((idx, content))

# Build the PDF string with correct references
output_lines = ["%PDF-1.4\n%âãÏÓ"]
offsets = []
current_pos = len(output_lines[0]) + 1  # account for newline later
pdf_body = []

# We need to fix the annotation dictionaries with proper /P reference and remove placeholder AP entry
for i, tmpl in enumerate(annotation_templates):
    obj_num = annotation_obj_nums[i]
    rect = tmpl["rect"]
    multiline = tmpl["multiline"]
    flags = 4096 if multiline else 0
    field_parts = [
        "<<",
        "/Type /Annot",
        "/Subtype /Widget",
        f"/Rect [{rect[0]} {rect[1]} {rect[2]} {rect[3]}]",
        "/FT /Tx",
        f"/T ({escape_pdf_text(tmpl['name'])})",
        "/F 4",
        f"/P {page_obj_num} 0 R",
        "/DA (/F1 11 Tf 0 g)",
        "/MK <<>>",
        f"/Ff {flags}",
        "/V ()",
        ">>"
    ]
    objects[obj_num - 1] = "\n".join(field_parts)

# Update page object with parent and annotations
annots_array = "[" + " ".join(f"{num} 0 R" for num in annotation_obj_nums) + "]"
page_dict = "<< /Type /Page /Parent {} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 {} 0 R >> >> /Contents {} 0 R /Annots {} >>".format(pages_obj_num, font_obj_num, stream_obj_num, annots_array)
objects[page_obj_num - 1] = page_dict

# Update pages object parent reference
pages_dict = "<< /Type /Pages /Kids [{} 0 R] /Count 1 >>".format(page_obj_num)
objects[pages_obj_num - 1] = pages_dict

# Update AcroForm fields list
fields_array = "[" + " ".join(f"{num} 0 R" for num in annotation_obj_nums) + "]"
acroform_dict = (
    "<< /Fields {} /DA (/F1 11 Tf 0 g) /NeedAppearances true "
    "/DR << /Font << /F1 {} 0 R >> >> >>".format(fields_array, font_obj_num)
)
objects[acroform_obj_num - 1] = acroform_dict

# Now build PDF body and xref
body_parts = []
for idx, content in enumerate(objects, start=1):
    offsets.append(sum(len(part) for part in output_lines) + sum(len(part) for part in body_parts))
    body_parts.append(f"{idx} 0 obj\n{content}\nendobj\n")

body_str = "".join(body_parts)

pdf_header = "%PDF-1.4\n%âãÏÓ\n"
current_offset = len(pdf_header)

xref_entries = ["0000000000 65535 f "]
current_offset = len(pdf_header)
body_output = []
for idx, content in enumerate(objects, start=1):
    body_output.append(f"{idx} 0 obj\n{content}\nendobj\n")

pdf_body_content = "".join(body_output)
current_offset = len(pdf_header)
offsets = []
position = len(pdf_header)
for entry in body_output:
    offsets.append(position)
    position += len(entry)

xref_start = position
xref_lines = [f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n"]
for offset in offsets:
    xref_lines.append(f"{offset:010d} 00000 n \n")
xref_section = "".join(xref_lines)

trailer = f"trailer\n<< /Size {len(objects)+1} /Root {catalog_obj_num} 0 R >>\nstartxref\n{xref_start}\n%%EOF\n"

with open("assets/mood-tracker-checkin.pdf", "wb") as f:
    f.write(pdf_header.encode("latin-1"))
    f.write(pdf_body_content.encode("latin-1"))
    f.write(xref_section.encode("latin-1"))
    f.write(trailer.encode("latin-1"))
