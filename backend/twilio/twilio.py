from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from settings import Settings
from typing import Dict, Any

class SendGridClient:    
    def __init__(self):
        self.api_key = Settings.twilio_credentials.apiKey
        self.client = SendGridAPIClient(self.api_key)
    
    def send_email(
        self,
        from_email: str,
        to_email: str,
        subject: str,
        html_content: str
    ) -> Dict[str, Any]:
        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=html_content
        )
        try:
            response = self.client.send(message)
            return {
                'status_code': response.status_code,
                'body': response.body,
                'headers': response.headers
            }
        except Exception as e:
            error_msg = getattr(e, 'message', str(e))
            raise Exception(f"Failed to send email: {error_msg}")

