from flask import Flask, render_template, request
import csv

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/submit", methods=["POST"])
def submit():
    name = request.form["name"]
    email = request.form["email"]
    with open("rsvps.csv", "a", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([name, email])
    return "Thanks for your RSVP!"

if __name__ == "__main__":
    app.run(debug=True)