class EmailTemplate:
    def __init__(self):
        self.rbc_disclaimer = """Regular, unencrypted email is not secure. Never include personal or confidential information in a regular email. To discuss your personal information with us safely, send us a message via the RBC Royal Bank Online Banking message centre or one of our other secure message centres, or contact us by phone."""
        
        self.rbc_phishing_warning = """RBC will never send a regular email that asks you to provide, confirm, or verify personal, login, or account information. Also, RBC will never include a link to an online service in a regular email and ask you to sign in using that link. If you receive an email of this type, that appears to be from RBC, please forward it to <a href="mailto:phishing@rbc.com">phishing@rbc.com</a> and then delete it. For more information, please visit <a href="https://www.rbc.com/privacysecurity/ca/en/email-and-website-fraud.html" target="_blank">Email & Website Fraud</a>."""
        
        self.contact_info = """
        <ul>
            <li>Within Canada and the U.S., toll-free, at: <strong>1-800-769-2555</strong></li>
            <li>TTY users: <strong>1-800-661-1275</strong></li>
            <li>Outside Canada and the U.S.: Reach us using our <a href="http://www.rbcroyalbank.com/contact-us/international.html" target="_blank">International Toll-Free Service</a></li>
        </ul>
        """

    def generate_rbc_email(self, name, link):
        return f"""
        <body>
            <p>{name},</p>

            <p>The following RBC Royal Bank eStatement(s) is(are) available:</p>

            <p>Click to view your statement here: <a href="{link}" target="_blank">View Statement</a></p>

            <p>To see your statement, please sign in to RBC Online Banking<sup>^</sup>.</p>

            <p>To review or change your email notification options within RBC Online Banking, select "Profile and Preferences" from the Banking tab under My Accounts.</p>

            <p>{self.rbc_disclaimer}</p>

            <p>{self.rbc_phishing_warning}</p>

            <p>If you need any help, please call us:</p>
            {self.contact_info}

            <p>Please do not reply to this email, as it was sent from an unmonitored account.</p>

            <p><sup>^</sup>RBC Online Banking is offered by Royal Bank of Canada.</p>
        </body>
        """