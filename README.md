# 🪝Off the Hook
> An interactive phishing ARG (alternate reality game) that educates users about the dangers of phishing attacks by letting them experience both victim and hacker perspectives.

## Overview

**Off the Hook** is a simulated phishing ARG designed to educate users about the dangers of phishing attacks through an engaging and interactive experience. This project mimics a banking website (RBC) and allows users to switch perspectives, transforming them into a "hacker" to understand the tactics used in phishing schemes. By sending fake banking emails, the site aims to raise awareness and help individuals avoid falling victim to similar scams.

## Privacy Concerns
No user data is ever stored, the input fields are simply to replicate a realistic phishing attack.

## Technologies

- **Frontend**: 
  - [![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
  - [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
  - [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)
  - [![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](#)

- **Backend**: 
  - [![Flask](https://img.shields.io/badge/Flask-000?logo=flask&logoColor=fff)](#)
  - [![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](#)
  - [![OpenAI](https://img.shields.io/badge/ChatGPT-74aa9c?logo=openai&logoColor=white)](#)
  - Twilio for email services

## Features

- **Perspective Switch**: Users can switch between being a victim and a hacker, gaining insights into both sides of phishing attacks.
- **Realistic Attacks**: Send realistic phishing emails to teach others about how to protect themselves. 
- **Interactive Learning**: The site provides educational content on how to identify and prevent phishing attempts.
- **Generative Chatbot**: Ask questions about phishing attacks using the hacker terminal.
- **Smooth Animations**: Utilizes Framer Motion for visually appealing transitions and animations throughout the site.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/off-the-hook.git
   cd off-the-hook
   ```

2. **Install dependencies**:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

   - For the backend:
     ```bash
     cd backend
     pip install -r requirements.txt
     ```

3. **Set up environment variables**:
   Create a `.env` file in the backend directory and add your configuration settings.

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd backend
     flask run
     ```

   - Start the frontend development server:
     ```bash
     cd frontend
     npm run dev
     ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

- **Explore the Hacked Page**: Users are greeted with a message indicating they have been hacked, along with educational content on phishing prevention.
- **Switch Perspectives**: Users can click a button to switch to the hacker's perspective, where they can learn about the dangers of phishing strategies.
- **Interactive Control Panel**: Simulate a terminal interface to educate others about phishing scams.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
