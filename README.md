# 🪝Off the Hook
> An interactive phishing simulation platform that educates users about the dangers of phishing attacks by letting them experience both victim and hacker perspectives.

## Overview

**Off the Hook** is a simulated phishing website designed to educate users about the dangers of phishing attacks through an engaging and interactive experience. This project mimics a banking website (RBC) and allows users to switch perspectives, transforming them into a "hacker" to understand the tactics used in phishing schemes. By sending fake banking emails, the site aims to raise awareness and help individuals avoid falling victim to similar scams.

## Technologies

- **Frontend**: 
  - React
  - Vite
  - Tailwind CSS

- **Backend**: 
  - Flask
  - MongoDB
  - Twilio for email services

## Features

- **Perspective Switch**: Users can switch between being a victim and a hacker, gaining insights into both sides of phishing attacks.
- **Interactive Learning**: The site provides educational content on how to identify and prevent phishing attempts.
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
