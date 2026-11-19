# PREVIEW COPY of build_2026-11-10_common.py (2026-11-18). Adds an optional one-line PROJECTS section.
# The original Job Assistant file is untouched.
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, HRFlowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors
from reportlab.lib.units import inch
F='Helvetica'; FB='Helvetica-Bold'
nm=ParagraphStyle('nm',fontName=FB,fontSize=18,leading=21,alignment=TA_CENTER)
tl=ParagraphStyle('tl',fontName=FB,fontSize=9,leading=11,alignment=TA_CENTER,textColor=colors.HexColor('#333333'))
ct=ParagraphStyle('ct',fontName=F,fontSize=8.8,leading=11,alignment=TA_CENTER)
h=ParagraphStyle('h',fontName=FB,fontSize=10,leading=12,spaceBefore=7,spaceAfter=1)
b=ParagraphStyle('b',fontName=F,fontSize=9.2,leading=11.6)
bl=ParagraphStyle('bl',parent=b,leftIndent=11,bulletIndent=1,spaceAfter=1.2)
jt=ParagraphStyle('jt',fontName=FB,fontSize=9.4,leading=11.5)
sub=ParagraphStyle('sub',fontName='Helvetica-Oblique',fontSize=8.8,leading=11)
def sec(t): return [Paragraph(t,h),HRFlowable(width='100%',thickness=0.7,color=colors.black,spaceAfter=3)]
def job(l,r,extra=None):
    t=Table([[Paragraph(l,jt),Paragraph(r,ParagraphStyle('r',parent=jt,alignment=2))]],colWidths=[5.35*inch,1.65*inch])
    t.setStyle(TableStyle([('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),1)]))
    return [t]+([Paragraph(extra,sub)] if extra else [])
def bul(items): return [Paragraph(i,bl,bulletText='\u2022') for i in items]
def build(out, title_line, summary, selling, systems, shb, sug, para=None, languages='English', projects=None):
    for s in [title_line,summary,selling,systems,languages]+shb+sug+([projects] if projects else []): assert '\u2014' not in s and '\u2013' not in s, 'dash found'
    S=[Paragraph('JEREMY RODRIGUEZ',nm),Paragraph(title_line,tl),
       Paragraph('Rutherford, NJ | 914-308-6037 | jeremyrod147@yahoo.com | <link href="https://www.linkedin.com/in/jeremy-rodriguez-713a13124">linkedin.com/in/jeremy-rodriguez-713a13124</link>',ct),
       Paragraph('Operations Portfolio: <link href="https://jeremyrodriguezoperations.com" color="#1a4f8b"><u>jeremyrodriguezoperations.com</u></link>',ParagraphStyle('pf',parent=ct,spaceBefore=1))]
    S+=sec('PROFESSIONAL SUMMARY')+[Paragraph(summary,b)]
    S+=sec('RELEVANT SKILLS')+[Paragraph('<b>SELLING:</b> '+selling,b),Paragraph('<b>SYSTEMS:</b> '+systems,b),
       Paragraph('<b>LANGUAGES:</b> '+languages+' &nbsp;&nbsp; <b>TOOLS:</b> Microsoft Excel \u2022 Square \u2022 Proprietary CRM \u2022 Claude Code \u2022 Claude',b)]
    S+=sec('PROFESSIONAL EXPERIENCE')
    S+=job('Owner &amp; Operations Manager | Simplistic Handyman LLC \u2022 New York, NY','Aug 2024 - Present')+bul(shb)
    S+=job('Manager, Business Operations | Sugar Hill Hardware \u2022 Harlem, New York, NY','Oct 2020 - Present','Previous tenure: Jan 2014 - Jun 2017')+bul(sug)
    S+=job('Paralegal Assistant | McCabe, Weisberg &amp; Conway, LLC \u2022 New Rochelle, NY','Apr 2018 - Oct 2020')
    S+=bul(para or ['Served as liaison between clients and internal staff, coordinating cross-department work to meet client deadlines and keeping status information accurate.',
       'Used Microsoft Excel and client systems for data analysis, reporting, file management, and operational tracking; trained new staff on systems and procedures.'])
    if projects: S+=sec('PROJECTS')+[Paragraph(projects,b)]
    S+=sec('EDUCATION')+[Paragraph('<b>HVAC/R Studies | TCI College of Technology \u2022 New York, NY</b> &nbsp;&nbsp;&nbsp; 2014 - 2016',b),
       Paragraph('GPA: 3.8 | Coursework ended when the institution closed and discontinued the program. No degree awarded.',b)]
    d=SimpleDocTemplate(out,pagesize=letter,leftMargin=.75*inch,rightMargin=.75*inch,topMargin=.55*inch,bottomMargin=.5*inch,title='Jeremy Rodriguez - Resume (PREVIEW)',author='Jeremy Rodriguez')
    d.build(S); print('wrote',out)
REV='Generated approximately $54K in first-year business revenue while establishing the company\u2019s operating model, pricing structure, customer workflow, and subcontractor network.'
