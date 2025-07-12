import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_feedback_email(name, sender_email, message, recipient_email=None):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 465
    smtp_user = 'vpdaeng@gmail.com'
    smtp_password = 'xnpp zvwn etqc hlxw'
    
    if recipient_email is None:
        recipient_email = smtp_user

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = recipient_email
    msg['Subject'] = f"Pesan dari {name}"

    body = f"""
    Anda menerima pesan dari pengguna website:

    Nama   : {name}
    Email  : {sender_email}

    Pesan  :
    {message}
    """

    msg.attach(MIMEText(body, 'plain'))
    logging.basicConfig(level=logging.DEBUG)

    try:
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
        return "Email berhasil dikirim."
    except Exception as e:
        logging.error("Gagal mengirim email: %s", str(e))
        return f"Gagal mengirim email: {str(e)}"




