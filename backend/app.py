from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import tempfile

app = Flask(__name__)
CORS(app)

# ==========================================
# 1. DATABASE CONFIG (Fixed for Vercel)
# ==========================================
# Use the system's temporary folder (/tmp) which is writable on Vercel
db_file = os.path.join(tempfile.gettempdir(), 'hospital.db')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# ==========================================
# 2. DATABASE MODELS
# ==========================================
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    diagnosis = db.Column(db.String(100))
    doctor = db.Column(db.String(100))
    status = db.Column(db.String(20))
    room = db.Column(db.String(20))

# ==========================================
# 3. INITIALIZE DB (Runs on every startup)
# ==========================================
with app.app_context():
    db.create_all()
    # Create Admin if not exists
    if not User.query.filter_by(username='admin').first():
        db.session.add(User(username='admin', password='123'))
        db.session.commit()

# ==========================================
# 4. API ROUTES (Fixed with '/api' prefix)
# ==========================================

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data.get('username'), password=data.get('password')).first()
    if user:
        return jsonify({"msg": "Success", "status": "ok"})
    return jsonify({"msg": "Fail", "status": "error"}), 401

@app.route('/api/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    output = []
    for p in patients:
        output.append({
            "id": f"P-{p.id}",
            "name": p.name,
            "age": p.age,
            "gender": p.gender,
            "diagnosis": p.diagnosis,
            "doctor": p.doctor,
            "status": p.status,
            "roomNumber": p.room
        })
    return jsonify(output)

@app.route('/api/add_patient', methods=['POST'])
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

# This is for local testing only
if __name__ == '__main__':
    app.run(debug=True, port=5000)