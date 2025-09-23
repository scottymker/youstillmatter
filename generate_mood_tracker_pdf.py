# generate_mood_tracker_pdf.py — fillable, styled mood check-in PDF
import os
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.acroform import AcroForm

OUT_PATH = "assets/mood-tracker-checkin.pdf"

# PDF field flags
FF_MULTILINE = 1 << 12   # 4096

# Optional script title font (drop one of these in assets/fonts/)
SCRIPT_FONT_PATHS = [
    "assets/fonts/GreatVibes-Regular.ttf",
    "assets/fonts/Pacifico-Regular.ttf",
    "assets/fonts/Allura-Regular.ttf",
]
script_font_name = None
for p in SCRIPT_FONT_PATHS:
    if os.path.exists(p):
        pdfmetrics.registerFont(TTFont("ScriptTitle", p))
        script_font_name = "ScriptTitle"
        break

PAGE_W, PAGE_H = letter
M = 0.75 * inch
G = 0.30 * inch
COL_W = (PAGE_W - 2*M - G) / 2.0

INK    = colors.HexColor("#222222")
SUBTLE = colors.HexColor("#F5F7FA")
RULE   = colors.HexColor("#E5E7EB")
ACCENT = colors.HexColor("#0EA5E9")

def draw_title(c):
    title = "Mental health check in"
    if script_font_name:
        c.setFillColor(INK); c.setFont(script_font_name, 38)
        c.drawString(M, PAGE_H - M + 6, title)
    else:
        c.setFillColor(INK); c.setFont("Helvetica-Bold", 26)
        c.drawString(M, PAGE_H - M + 10, title)

def label(c, text, x, y):
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 9.5)
    c.drawString(x, y, text.upper())

def textbox_bg(c, x, y, w, h):
    c.setFillColor(SUBTLE); c.setStrokeColor(RULE); c.setLineWidth(1)
    c.roundRect(x, y, w, h, 6, fill=1, stroke=1)

def rule(c, x1, y, x2):
    c.setStrokeColor(RULE); c.setLineWidth(1); c.line(x1, y, x2, y)

def small_checkbox_column(c, top_y, box_size=16, gaps=18, count=10):
    x = M - 0.4*inch; y = top_y; c.setStrokeColor(RULE)
    for _ in range(count):
        c.rect(x, y - box_size, box_size, box_size, fill=0, stroke=1); y -= gaps

def draw_star(c, cx, cy, size=12, fill=False):
    from math import sin, cos, pi
    pts = []
    for i in range(10):
        angle = pi/2 + i * pi/5
        r = size if i % 2 == 0 else size * 0.45
        pts.append((cx + r * cos(angle), cy + r * sin(angle)))
    p = c.beginPath(); p.moveTo(*pts[0])
    for x, y in pts[1:]: p.lineTo(x, y)
    p.close()
    c.setStrokeColor(INK); c.setLineWidth(1)
    c.drawPath(p, stroke=1, fill=1 if fill else 0)

def make_pdf(path=OUT_PATH):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    c = canvas.Canvas(path, pagesize=letter)
    c.setAuthor("YouStillMatter"); c.setTitle("Mental health check in")
    c.setSubject("Weekly mood check-in")
    form: AcroForm = c.acroForm

    draw_title(c)
    top_y = PAGE_H - M - 18
    small_checkbox_column(c, top_y, count=10)

    # LEFT column
    left_x = M; y = top_y - 18
    label(c, "Date", left_x, y); rule(c, left_x+35, y-2, left_x + COL_W - 6); y -= 26

    label(c, "How are you feeling today?", left_x, y); y -= 6
    h1 = 1.6*inch; textbox_bg(c, left_x, y-h1, COL_W, h1)
    form.textfield(
        name="feel_today",
        x=left_x+8, y=y-h1+8, width=COL_W-16, height=h1-16,
        borderWidth=0, fillColor=None, textColor=INK, forceBorder=False,
        fieldFlags=FF_MULTILINE
    )
    y -= (h1 + 20)

    label(c, "How are you feeling today? (quick)", left_x, y); y -= 14
    rb_y = y; step = 24
    for i in range(5):
        form.radio(
            name="mood_quick", value=str(i+1),
            x=left_x + i*step, y=rb_y,
            buttonStyle="circle", selected=False,
            borderWidth=1, borderColor=INK, fillColor=colors.white, textColor=INK, size=12
        )
        c.setFont("Helvetica", 8); c.setFillColor(INK)
        c.drawCentredString(left_x + i*step + 6, rb_y - 12, str(i+1))
    y -= 28

    label(c, "How can you improve your mental health?", left_x, y); y -= 6
    h2 = 2.0*inch; textbox_bg(c, left_x, y-h2, COL_W, h2)
    form.textfield(
        name="improve",
        x=left_x+8, y=y-h2+8, width=COL_W-16, height=h2-16,
        borderWidth=0, fillColor=None, textColor=INK, forceBorder=False,
        fieldFlags=FF_MULTILINE
    )

    # RIGHT column
    right_x = left_x + COL_W + G; y_r = top_y - 18

    label(c, "What have been your three dominant emotions this week?", right_x, y_r)
    y_r -= 10; line_h = 18
    for i in range(3):
        rule(c, right_x, y_r-4, right_x+COL_W)
        form.textfield(
            name=f"dominant_{i+1}", x=right_x, y=y_r-14, width=COL_W, height=16,
            borderWidth=0, fillColor=None, textColor=INK, forceBorder=False
        )
        y_r -= line_h
    y_r -= 10

    label(c, "What do you feel good about right now?", right_x, y_r); y_r -= 6
    h3 = 1.4*inch; textbox_bg(c, right_x, y_r-h3, COL_W, h3)
    form.textfield(
        name="feel_good",
        x=right_x+8, y=y_r-h3+8, width=COL_W-16, height=h3-16,
        borderWidth=0, fillColor=None, textColor=INK, forceBorder=False,
        fieldFlags=FF_MULTILINE
    )
    y_r -= (h3 + 18)

    label(c, "Things that trigger negative emotions", right_x, y_r); y_r -= 10
    for i in range(4):
        rule(c, right_x, y_r-4, right_x+COL_W)
        form.textfield(
            name=f"trigger_{i+1}", x=right_x, y=y_r-14, width=COL_W, height=16,
            borderWidth=0, fillColor=None, textColor=INK, forceBorder=False
        )
        y_r -= line_h
    y_r -= 8

    label(c, "My ranking of my mental health this week", right_x, y_r); y_r -= 16
    star_cy = y_r
    for i in range(5):
        cx = right_x + 12 + i*28
        draw_star(c, cx, star_cy, size=10, fill=False)
        form.radio(
            name="rating_star", value=str(i+1),
            x=cx-6, y=star_cy-6, buttonStyle="circle", selected=False,
            borderWidth=0.5, borderColor=colors.transparent,
            fillColor=colors.transparent, textColor=INK, size=12
        )

    c.setViewerPreference("HideMenubar", False)
    c.showPage(); c.save()
    print(f"Saved {OUT_PATH}")

if __name__ == "__main__":
    make_pdf()
