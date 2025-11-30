from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
# Allow React (Port 3000) to talk to Python (Port 5000)
CORS(app) 

# NEW CODE (Paste this)
import tempfile

# Use the system's temporary folder (Works on Vercel AND Windows)
db_file = os.path.join(tempfile.gettempdir(), 'hospital.db')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_file
db = SQLAlchemy(app)

# --- MODEL 1: LOGIN TABLE ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

# --- MODEL 2: PATIENTS TABLE ---
class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    diagnosis = db.Column(db.String(100))
    doctor = db.Column(db.String(100))
    status = db.Column(db.String(20)) # Stable, Critical
    room = db.Column(db.String(20))

# --- CREATE DATABASE & ADMIN USER ---
with app.app_context():
    db.create_all() # This creates the .db file automatically!
    
    # Create a default admin if not exists
    if not User.query.filter_by(username='admin').first():
        db.session.add(User(username='admin', password='123'))
        db.session.commit()
        print("Admin user created: admin / 123")

# --- API ROUTES (Connects to React) ---

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if user:
        return jsonify({"msg": "Success", "status": "ok"})
    return jsonify({"msg": "Fail", "status": "error"}), 401

@app.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    output = []
    for p in patients:
        output.append({
            "id": f"P-{p.id}",
            "name": p.name,
            "age": p.age,
            "diagnosis": p.diagnosis,
            "doctor": p.doctor,
            "status": p.status,
            "roomNumber": p.room
        })
    return jsonify(output)

@app.route('/add_patient', methods=['POST'])
def add_patient():
    data = request.json
    new_p = Patient(
        name=data['name'], age=data['age'], gender=data['gender'],
        diagnosis=data['diagnosis'], doctor=data['doctor'],
        status=data['status'], room=data['room']
    )
    db.session.add(new_p)
    db.session.commit()
    return jsonify({"msg": "Patient Added"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)