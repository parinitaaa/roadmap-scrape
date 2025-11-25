# W3Schools Roadmap Scraper

A simple web application that fetches and displays a topic roadmap from W3Schools. Built with **Flask** for the backend and **React** for the frontend.

---

## Features

* Enter any topic (e.g., `javascript`, `python`) to fetch its roadmap.
* Ignores irrelevant links like tutorials, quizzes, and certificates.
* Displays sections and links in a clean, user-friendly interface.
* React frontend with Tailwind CSS styling.
* Flask backend with BeautifulSoup scraping logic.

---

## Tech Stack

* **Frontend:** React, Tailwind CSS, Axios
* **Backend:** Python, Flask, Flask-CORS, Requests, BeautifulSoup

---

## Installation

### Backend

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate      # On Linux/Mac
   venv\Scripts\activate         # On Windows
   ```
3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend:

   ```bash
   python main.py
   ```

### Frontend

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the React app:

   ```bash
   npm start
   ```

---

## Usage

1. Open the frontend app in your browser (usually at `http://localhost:3000`).
2. Enter a topic (e.g., `html`, `css`, `javascript`) and click **Fetch Roadmap**.
3. View the roadmap sections and links fetched from W3Schools.

---

## Notes

* The backend scrapes data from W3Schools, so a stable internet connection is required.
* Only relevant links are displayed; keywords like *Tutorial*, *Exercises*, *Quiz*, etc., are ignored.
* Make sure the backend is running before using the frontend.

---

## License

This project is open-source and free to use.
