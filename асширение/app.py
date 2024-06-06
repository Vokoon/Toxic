from flask import Flask, request, jsonify
from flask_cors import CORS
from detoxify import Detoxify

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = Detoxify('multilingual')

@app.route('/analyze', methods=['POST'])
def analyze():
    text = request.json.get('text', '')
    results = model.predict(text)
    
    # Convert results to serializable format
    results_serializable = {key: float(value) for key, value in results.items()}
    
    return jsonify(results_serializable)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
