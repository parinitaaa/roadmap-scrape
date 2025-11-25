from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Keywords to ignore
IGNORE_KEYWORDS = [
    "Tutorial", "Home", "Intro", "Get Started", "Examples", "Compiler",
    "Exercises", "Quiz", "Server", "Syllabus", "Study Plan",
    "Interview Q&A", "Bootcamp", "Certificate", "Training","Interview"
]

@app.route("/api/scrape", methods=["POST"])
def scrape_roadmap():
    data = request.get_json()
    topic = data.get("topic", "").strip().lower()
    if not topic:
        return jsonify({"error": "No topic provided"}), 400

    url = f"https://www.w3schools.com/{topic}/"
    try:
        res = requests.get(url)
        if res.status_code != 200:
            return jsonify({"error": f"Could not fetch {url}"}), 404

        soup = BeautifulSoup(res.text, "html.parser")
        menu = soup.find("div", {"id": "leftmenuinnerinner"})
        if not menu:
            return jsonify({"error": "Could not find roadmap"}), 404

        roadmap = []
        current_section = None

        for child in menu.children:
            if child.name == "h2":
                current_section = {"section": child.get_text(strip=True), "links": []}
                roadmap.append(current_section)
            elif child.name == "a" and current_section:
                title = child.get_text(strip=True)
                # Filter out unwanted links
                if not any(keyword in title for keyword in IGNORE_KEYWORDS):
                    current_section["links"].append({
                        "title": title,
                        "href": child.get("href")
                    })
            elif child.name == "div" and "tut_overview" in child.get("class", []) and current_section:
                for a in child.find_all("a"):
                    title = a.get_text(strip=True)
                    if not any(keyword in title for keyword in IGNORE_KEYWORDS):
                        current_section["links"].append({
                            "title": title,
                            "href": a.get("href")
                        })

        # Remove empty sections
        roadmap = [sec for sec in roadmap if sec["links"]]

        return jsonify({"topic": topic, "roadmap": roadmap})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
