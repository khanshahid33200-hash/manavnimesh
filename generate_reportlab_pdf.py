from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.units import inch
import os

def build_native_pdf():
    pdf_filename = "MANAV_NIMESH_RESUME.pdf"
    
    # Setup document with 0.4 inch top/bottom and 0.5 inch left/right margins
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    style_name = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=20,
        leading=22,
        alignment=1, # Center
        textColor=colors.HexColor('#000000'),
        spaceAfter=3
    )

    style_contact = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=11,
        alignment=1, # Center
        textColor=colors.HexColor('#222222'),
        spaceAfter=4
    )

    style_section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=12,
        textColor=colors.HexColor('#000000'),
        spaceBefore=4,
        spaceAfter=2
    )

    style_body = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=12,
        alignment=4, # Justified
        textColor=colors.HexColor('#111111')
    )

    style_bullet = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.3,
        leading=11.5,
        textColor=colors.HexColor('#111111'),
        leftIndent=12
    )

    style_degree = ParagraphStyle(
        'DegreeStyle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.8,
        leading=11.5,
        textColor=colors.HexColor('#000000')
    )

    style_school = ParagraphStyle(
        'SchoolStyle',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=9.2,
        leading=11,
        textColor=colors.HexColor('#333333')
    )

    story = []

    def add_hr():
        story.append(Spacer(1, 2))
        story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#666666'), spaceBefore=2, spaceAfter=4))

    # Name Header
    story.append(Paragraph("MANAV NIMESH", style_name))
    story.append(Paragraph("📍 Jaipur, India &nbsp;&nbsp;&nbsp; 📞 8739997065 &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; ✉️ manavnimesh12@gmail.com", style_contact))
    add_hr()

    # Professional Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", style_section_title))
    summary_text = (
        "Dedicated and student-focused Science Teacher & Private Tutor with a strong academic background in Physics, "
        "Chemistry, and Mathematics. Passionate about creating engaging classroom experiences, 1-on-1 tutoring, and helping "
        "students build strong conceptual understanding. Skilled in classroom management, lesson planning, and effective "
        "communication. Seeking a Science Teacher / Private Tutor position where academic knowledge and teaching skills contribute to student success."
    )
    story.append(Paragraph(summary_text, style_body))
    add_hr()

    # 2-Column Skills Section
    col1_content = [
        Paragraph("TEACHING & TUTORING SKILLS", style_section_title),
        Paragraph("• Private Tutoring & 1-on-1 Mentoring", style_bullet),
        Paragraph("• Science Teaching (Physics, Chemistry, Math)", style_bullet),
        Paragraph("• Lesson Planning & Curriculum Design", style_bullet),
        Paragraph("• Classroom & Batch Management", style_bullet),
        Paragraph("• Student Assessment & Mock Tests", style_bullet),
        Paragraph("• Activity Based Learning", style_bullet),
        Paragraph("• Doubt Solving & Concept Building", style_bullet),
        Spacer(1, 4),
        Paragraph("TECHNICAL SKILLS", style_section_title),
        Paragraph("• MS Word, MS Excel, MS PowerPoint", style_bullet),
        Paragraph("• Basic Computer Knowledge", style_bullet),
        Paragraph("• Data Entry & Documentation", style_bullet),
    ]

    col2_content = [
        Paragraph("SOFT SKILLS", style_section_title),
        Paragraph("• Creative Problem Solving", style_bullet),
        Paragraph("• Time Management", style_bullet),
        Paragraph("• Interpersonal Skills", style_bullet),
        Paragraph("• Verbal and Written Communication", style_bullet),
        Paragraph("• Teamwork", style_bullet),
        Paragraph("• Leadership", style_bullet),
        Spacer(1, 4),
        Paragraph("STRENGTHS", style_section_title),
        Paragraph("• Strong subject knowledge in Science", style_bullet),
        Paragraph("• Positive classroom attitude", style_bullet),
        Paragraph("• Good presentation skills", style_bullet),
        Paragraph("• Quick learner, responsible & disciplined", style_bullet),
    ]

    skills_table = Table([[col1_content, col2_content]], colWidths=[3.75*inch, 3.75*inch])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    add_hr()

    # Education Section
    story.append(Paragraph("EDUCATION", style_section_title))
    story.append(Paragraph("Master of Science (M.Sc.), Chemistry", style_degree))
    story.append(Paragraph("University of Rajasthan, Jaipur — 2025", style_school))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Bachelor of Science & Bachelor of Education (B.Sc. B.Ed.), PCM", style_degree))
    story.append(Paragraph("University of Rajasthan, Jaipur — 2023", style_school))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Bachelor of Computer Applications (BCA)", style_degree))
    story.append(Paragraph("Vardhman Mahaveer Open University, Kota — Expected 2026", style_school))
    add_hr()

    # Courses & Certifications
    story.append(Paragraph("COURSES & CERTIFICATIONS", style_section_title))
    story.append(Paragraph("• Central Teacher Eligibility Test (CTET) — 2024", style_bullet))
    story.append(Paragraph("• Rajasthan Eligibility Examination for Teachers (REET Rajasthan) — 2025", style_bullet))
    story.append(Paragraph("• Rajasthan State Certificate in Information Technology (RSCIT) — 2021", style_bullet))
    story.append(Paragraph("• Information Practices, CBSE Senior Secondary Education — 2018", style_bullet))
    add_hr()

    # Career Objective
    story.append(Paragraph("CAREER OBJECTIVE", style_section_title))
    obj_text = (
        "To work as a Science Teacher or Private Tutor in a reputed school or tutoring setup where I contribute to "
        "students' academic growth through effective teaching methods, practical learning, and continuous professional development."
    )
    story.append(Paragraph(obj_text, style_body))
    add_hr()

    # Languages
    story.append(Paragraph("LANGUAGES", style_section_title))
    story.append(Paragraph("• Hindi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; • English", style_bullet))
    story.append(Spacer(1, 2))

    doc.build(story)
    print("ReportLab PDF successfully generated:", pdf_filename)

if __name__ == "__main__":
    build_native_pdf()
