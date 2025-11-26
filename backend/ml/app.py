from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so requests from different ports (e.g., React on 3001) are allowed

# Load the saved multi-label model and TF-IDF vectorizer
model = joblib.load('multi_label_xgb_model.pkl')
vectorizer = joblib.load('tfidf_vectorizer.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    # Expect JSON data with an array of diary entries under the key "symptoms"
    data = request.get_json(force=True)
    diary_entries = data.get('symptoms', [])
    
    if not diary_entries or not any(entry.strip() for entry in diary_entries):
        return jsonify({'error': 'No diary entries provided.'}), 400

    # Combine all diary entries into one text
    combined_text = " ".join(diary_entries)

    # Transform the text into features using the TF-IDF vectorizer
    features = vectorizer.transform([combined_text])
    
    # Predict using the multi-label XGBoost model
    predictions = model.predict(features)[0]  # Array of binary values
    
    # Calculate depression level based on the sum of predicted symptoms
    total_symptoms = sum(predictions)
    
    if total_symptoms == 4:
        depression_level = "minimal"
    elif total_symptoms <= 9:
        depression_level = "mild"
    elif total_symptoms <= 14:
        depression_level = "moderate"
    elif total_symptoms <= 19:
        depression_level = "moderately severe"
    else:
        depression_level = "severe"
    
    # Return the predicted depression level as JSON
    return jsonify({'prediction': depression_level})

if __name__ == '__main__':
    app.run(debug=True)
