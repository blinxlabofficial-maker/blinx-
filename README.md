# Blinx Lab — Full-Stack Web Application

A polished, responsive, and performance-focused website for **Blinx Lab**, a digital marketing and web development agency that helps small businesses build an online presence, get discovered, and stay relevant.

Built with a modern full-stack architecture featuring a React (Vite) frontend, FastAPI backend, and MongoDB database.

---

## Brand System

- **Ink Black (`#1A1A1A`)**: Dark background base.
- **Studio White (`#F7F5F0`)**: Premium editorial body color.
- **Electric Red (`#FF3C5A`)**: CTA highlights and emphasis.
- **Voltage Yellow (`#FFD600`)**: Subtle underlines, badges, and accents.
- **Headlines**: Syne (Extra bold)
- **Body**: DM Sans
- **Monospace Labels**: DM Mono

---

## Project Structure

- `frontend/` - React application built with Vite and pure CSS modules.
- `backend/` - FastAPI backend application using MongoDB for inquiries storage.

---

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MongoDB (running locally or via Atlas connection string)

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows (PowerShell):
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and fill in your configuration:
   ```bash
   cp .env.example .env
   ```
5. Run the FastAPI development server:
   ```bash
   fastapi dev app/main.py
   ```
   The backend will run on `http://localhost:8000`.

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`. Vite is configured to proxy all `/api/*` traffic automatically to `http://localhost:8000`.

---

## Running Automated Tests
- Test frontend production compilation:
  ```bash
  cd frontend
  npm run build
  ```
- Test backend inquiries POST endpoint:
  ```bash
  # Ensure the backend server is running, then run in a separate terminal:
  curl -X POST http://localhost:8000/api/inquiries \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test@example.com","business_name":"Ambicious Inc","message":"Need a conversion-focused landing page."}'
  ```

---

## Key Features Built

1. **Header/Navigation** - Sticky responsive bar that shrinks on scroll. Features smooth scrolling to sections and a mobile overlay menu drawer.
2. **Hero Section** - Statement heading: *"Small businesses deserve to be seen."* with generated grayscale editorial imagery and floating badges.
3. **Impact/Value Strip** - Highlights agency philosophy (Strategy before noise, Creative to convert, Momentum).
4. **Why Blinx Section** - Explanation of Blinx Lab's simplified, jargon-free digital presence strategies.
5. **Our Approach Section** - Split layout with collaborate image and the 4 lab processes (Find signal → Sharpen story → Build system → Move business forward).
6. **Services Section** - Interactive dark layout displaying 3 main service lines with custom hover arrows and state changes.
7. **Free Growth Audit Section** - Complete 5-step interactive quiz. Performs local scoring via a rules engine to output three actionable digital recommendations.
8. **Contact Section** - Working inquiry form that validates fields/emails and stores entries in MongoDB via the FastAPI server. Exposes loading states and backend connection errors.
9. **Footer** - Interactive wordmark branding with links and a smooth back-to-top button.
