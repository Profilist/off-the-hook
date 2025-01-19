from generate.client import OpenAIClient
from typing import Tuple

def generate_victim_story(name: str, amount: int) -> Tuple[str, int]:
    client = OpenAIClient()
    
    prompt = f"""Create a sad story (4 sentences max) about a student named {name} struggling with money that was just lost ${amount} through phishing. Make it sad and impactful, possibilities include:
- What they dreamt of buying since they were a child
- Family being poor and dependent on them
- Unable to pay rent/tuition and took out loans
Make it creative. Remember, 4 sentences at most."""

    try:
        response = client.generate_text(
            prompt=prompt,
            max_tokens=150,
            temperature=0.8
        )
        
        return response['text'].strip(), response['usage']
        
    except Exception as e:
        print(f"[ERROR] Failed to generate victim story: {str(e)}")
        fallback = f"{name} lost ${amount} to a phishing scam, devastating their hopes of paying this semester's tuition."
        return fallback, 0


def respond_chatbot(question: str) -> Tuple[str, int]:
    client = OpenAIClient()
    prompt = f"""You are a cybersecurity and phishing prevention expert with extensive knowledge in identifying, analyzing, and mitigating cybersecurity threats. Your expertise covers a wide range of cybersecurity topics, including social engineering, malware, ransomware, phishing attacks (email, SMS, voice, and spear-phishing), penetration testing, threat modeling, and incident response. You stay updated with the latest cybersecurity trends, tools, and best practices. Your role is to provide detailed, accurate, and actionable advice on securing systems, identifying phishing attempts, and implementing cybersecurity strategies to protect individuals and organizations. Use clear, professional language and provide examples or step-by-step guidance when necessary. 
    Please respond to the user's following question: {question}. Please respond within only 3 sentences"""

    try:
        response = client.generate_text(
            prompt=prompt,
            max_tokens=150,
            temperature=0.8
        )
        
        return response['text'].strip(), response['usage']
        
    except Exception as e:
        print(f"[ERROR] Failed to generate chatbot response: {str(e)}")
        fallback = "I'm sorry, but I am currently unable to provide a detailed response to your question. Please try again later or consult a cybersecurity expert."
        return fallback, 0
