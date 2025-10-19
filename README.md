# 🚀 EventEase

A modern, full-stack event management platform designed to help users seamlessly create, discover, and manage events. Built with a powerful FastAPI backend and a responsive React frontend.

## ✨ Features

- **User Authentication:** Secure user sign-up and login.
- **Event Creation:** An intuitive form for users to create and publish new events.
- **Event Discovery:** Browse and search for upcoming events.
- **Event Registration:** Simple one-click registration for events.
- **User Dashboard:** View and manage created events and registrations.
- **AI Chat Agent:** (Optional) An integrated AI to help users with their queries.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Axios
- **Backend:** FastAPI (Python)
- **Database:** (e.g., PostgreSQL with SQLAlchemy, SQLite)

## ⚙️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or newer)
- [Python](https://www.python.org/downloads/) (v3.10 or newer)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/vk-2828/EventEase.git](https://github.com/vk-2828/EventEase.git)
    cd EventEase
    ```

2.  **Setup the Backend (FastAPI):**
    ```bash
    cd backend
    # Create a virtual environment
    python -m venv venv
    # Activate the virtual environment
    # On Windows:
    .\venv\Scripts\activate
    # On macOS/Linux:
    source venv/bin/activate
    # Install dependencies
    pip install -r requirements.txt
    # Run the server
    uvicorn main:app --reload
    ```
    The backend will be running on `http://127.0.0.1:8000`.

3.  **Setup the Frontend (React):**
    ```bash
    # From the root directory, navigate to the frontend
    cd ../frontend
    # Install dependencies
    npm install
    # Run the development server
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173` (or another port if 5173 is busy).

## 🤝 The Team

* Vamshi Krishna
* Rama Krishna
* Althaf
