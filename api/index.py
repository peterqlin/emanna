from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import imaplib
import email
from email import policy
from email.parser import BytesParser

app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

# Allow CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["http://localhost:3000"],
    allow_headers=["http://localhost:3000"],
)

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.get("/api/py/mostRecentEmail")
def get_most_recent_email():
    return get_emails()

imap_server = "imap.gmail.com"
email_address = ""
password = "" # "IMAP/SMTP" app password

def get_emails():
    mail = imaplib.IMAP4_SSL(imap_server)
    mail.login(email_address, password)

    mail.select('"[Gmail]/All Mail"')

    status, messages = mail.search(None, "ALL")
    email_ids = messages[0].split()

    latest_email_id = email_ids[-1]
    status, msg_data = mail.fetch(latest_email_id, "(RFC822)")
    raw_email = msg_data[0][1]

    msg = BytesParser(policy=policy.default).parsebytes(raw_email)

    print("Delivered-To:", msg["delivered-to"])
    print("Subject:", msg["subject"])
    print("From:", msg["from"])
    print("To:", msg["to"])
    print("Date:", msg["date"])
    print("Message ID:", msg["message-id"])

    mail.logout()

    return msg