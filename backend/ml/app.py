# from flask import Flask, request, jsonify
# import joblib
# from flask_cors import CORS
# import os
# import numpy as np

# app = Flask(__name__)
# CORS(app)  # Enable CORS so requests from different ports (e.g., React on 3001) are allowed

# # Get the directory where this script is located
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# # Define symptom names based on training data columns
# SYMPTOM_NAMES = [
#     "Little interest or pleasure in doing things",
#     "Feeling down, depressed, or hopeless",
#     "Trouble concentrating",
#     "Trouble falling or staying asleep, or sleeping too much",
#     "Poor appetite or overeating",
#     "Feeling bad about self or failure",
#     "Moving or speaking very slowly",
#     "Feeling tired or having little energy",
#     "Thoughts of self-harm or being better off dead"
# ]

# # Load the saved multi-label model and TF-IDF vectorizer using absolute paths
# try:
#     model_path = os.path.join(BASE_DIR, 'multi_label_xgb_model.pkl')
#     vectorizer_path = os.path.join(BASE_DIR, 'tfidf_vectorizer.pkl')
    
#     model = joblib.load(model_path)
#     vectorizer = joblib.load(vectorizer_path)
#     print(f"Model loaded successfully from {model_path}")
#     print(f"Vectorizer loaded successfully from {vectorizer_path}")
# except Exception as e:
#     print(f"Error loading model or vectorizer: {e}")
#     model = None
#     vectorizer = None

# def calculate_depression_level(phq9_score):
#     """Calculate depression level based on PHQ-9 score"""
#     if phq9_score <= 4:
#         return "minimal"
#     elif phq9_score <= 9:
#         return "mild"
#     elif phq9_score <= 14:
#         return "moderate"
#     elif phq9_score <= 19:
#         return "moderately severe"
#     else:
#         return "severe"

# @app.route('/predict', methods=['POST'])
# def predict():
#     if model is None or vectorizer is None:
#         return jsonify({'error': 'Model or vectorizer not loaded. Please check file paths.'}), 500
    
#     # Expect JSON data with an array of diary entries under the key "symptoms"
#     data = request.get_json(force=True)
#     diary_entries = data.get('symptoms', [])
    
#     if not diary_entries or not any(entry.strip() for entry in diary_entries):
#         return jsonify({'error': 'No diary entries provided.'}), 400

#     daily_results = []
#     symptom_occurrences = {name: [] for name in SYMPTOM_NAMES}  # Track which days each symptom appears
    
#     # Process each day separately
#     for day_idx, entry in enumerate(diary_entries):
#         if not entry or not entry.strip():
#             # Skip empty entries
#             daily_results.append({
#                 "day": day_idx + 1,
#                 "symptoms": [],
#                 "phq9_score": 0,
#                 "level": "minimal"
#             })
#             continue
        
#         # Transform the text into features using the TF-IDF vectorizer
#         features = vectorizer.transform([entry])
        
#         # Predict using the multi-label XGBoost model
#         # model.predict() returns a 2D array: [[0,1,0,1,...]] for each symptom
#         predictions = model.predict(features)[0]  # Array of binary values (9 symptoms)
        
#         # Get detected symptom names
#         detected_symptoms = []
#         for idx, pred in enumerate(predictions):
#             if pred == 1:
#                 symptom_name = SYMPTOM_NAMES[idx]
#                 detected_symptoms.append(symptom_name)
#                 symptom_occurrences[symptom_name].append(day_idx + 1)
        
#         # Calculate PHQ-9 score for this day (sum of detected symptoms)
#         phq9_score = int(sum(predictions))
#         level = calculate_depression_level(phq9_score)
        
#         daily_results.append({
#             "day": day_idx + 1,
#             "symptoms": detected_symptoms,
#             "phq9_score": phq9_score,
#             "level": level
#         })
    
#     # Calculate overall depression level (sum of all PHQ-9 scores across 15 days)
#     total_phq9_score = sum(day['phq9_score'] for day in daily_results)
#     # Average PHQ-9 score (since we have 15 days, we average it)
#     average_phq9_score = total_phq9_score / len(diary_entries) if diary_entries else 0
#     overall_level = calculate_depression_level(int(average_phq9_score))
    
#     # Create symptom occurrences detail
#     symptom_occurrences_detail = []
#     for symptom_name, days_list in symptom_occurrences.items():
#         if days_list:  # Only include symptoms that were detected
#             symptom_occurrences_detail.append({
#                 "symptom": symptom_name,
#                 "total_occurrences": len(days_list),
#                 "days_detected": days_list
#             })
    
#     # Return comprehensive results
#     return jsonify({
#         "prediction": overall_level,
#         "phq9_equivalent_score": int(average_phq9_score),
#         "daily_results": daily_results,
#         "final_levels": {
#             "disease": "Depression",
#             "level": overall_level,
#             "total_score": int(total_phq9_score),
#             "average_score": int(average_phq9_score)
#         },
#         "symptom_occurrences_detail": symptom_occurrences_detail
#     })

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)






# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.preprocessing import MultiLabelBinarizer
# from sklearn.model_selection import train_test_split
# from xgboost import XGBClassifier
# import numpy as np

# app = Flask(__name__)
# CORS(app)

# # -----------------------------
# # 1️⃣ Load dataset and train model
# # -----------------------------
# # Example dataset: CSV with columns ["text", "symptoms"]
# # 'symptoms' should be a list of symptom indices like [0, 1, 3]
# data = pd.read_csv("saved_model")  # replace with your dataset path

# # Convert symptom strings to lists if needed
# # e.g., "[0, 1, 3]" -> [0,1,3]
# data['symptoms'] = data['symptoms'].apply(lambda x: eval(x) if isinstance(x, str) else x)

# # MultiLabelBinarizer for multi-label classification
# mlb = MultiLabelBinarizer()
# y = mlb.fit_transform(data['symptoms'])

# # TF-IDF vectorizer for diary text
# vectorizer = TfidfVectorizer(max_features=5000)
# X = vectorizer.fit_transform(data['text'])

# # Train multi-label XGBoost classifier
# # We use One-vs-Rest strategy internally
# model = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
# model.fit(X, y)

# # -----------------------------
# # 2️⃣ API to predict diary entries
# # -----------------------------
# @app.route('/predict', methods=['POST'])
# def predict():
#     data_input = request.get_json(force=True)
#     diary_entries = data_input.get('symptoms', [])
    
#     if not diary_entries or not any(entry.strip() for entry in diary_entries):
#         return jsonify({'error': 'No diary entries provided.'}), 400

#     days = []

#     for i, entry in enumerate(diary_entries):
#         features = vectorizer.transform([entry])
#         prediction_prob = model.predict_proba(features)  # probabilities for each symptom
#         # Convert probabilities to binary 0/1 (threshold=0.5)
#         prediction = (np.array([p[:,1] for p in prediction_prob]).T >= 0.5).astype(int)[0]
#         total_symptoms = int(sum(prediction))

#         # Calculate day-level depression
#         if total_symptoms <= 1:
#             level = "minimal"
#         elif total_symptoms <= 3:
#             level = "mild"
#         elif total_symptoms <= 5:
#             level = "moderate"
#         elif total_symptoms <= 7:
#             level = "moderately severe"
#         else:
#             level = "severe"

#         days.append({
#             "day": i + 1,
#             "symptoms": prediction.tolist(),
#             "score": total_symptoms,
#             "level": level
#         })

#     # Overall depression
#     overall_total = sum(day['score'] for day in days)
#     if overall_total <= 4:
#         overall_level = "minimal"
#     elif overall_total <= 9:
#         overall_level = "mild"
#     elif overall_total <= 14:
#         overall_level = "moderate"
#     elif overall_total <= 19:
#         overall_level = "moderately severe"
#     else:
#         overall_level = "severe"

#     return jsonify({
#         "days": days,
#         "overall": {
#             "score": overall_total,
#             "level": overall_level
#         }
#     })

# if __name__ == '__main__':
#     app.run(debug=True)






from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import os
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS so requests from different ports (e.g., React on 3001) are allowed

# Get the directory where this script is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define symptom names based on training data columns
SYMPTOM_NAMES = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble concentrating",
    "Trouble falling or staying asleep, or sleeping too much",
    "Poor appetite or overeating",
    "Feeling bad about self or failure",
    "Moving or speaking very slowly",
    "Feeling tired or having little energy",
    "Thoughts of self-harm or being better off dead"
]

# Load the saved multi-label model and TF-IDF vectorizer using absolute paths
try:
    model_path = os.path.join(BASE_DIR, 'multi_label_xgb_model.pkl')
    vectorizer_path = os.path.join(BASE_DIR, 'tfidf_vectorizer.pkl')
    
    model = joblib.load(model_path)
    vectorizer = joblib.load(vectorizer_path)
    print(f"Model loaded successfully from {model_path}")
    print(f"Vectorizer loaded successfully from {vectorizer_path}")
except Exception as e:
    print(f"Error loading model or vectorizer: {e}")
    model = None
    vectorizer = None

def calculate_depression_level(phq9_score):
    """Calculate depression level based on PHQ-9 score"""
    if phq9_score <= 4:
        return "minimal"
    elif phq9_score <= 9:
        return "mild"
    elif phq9_score <= 14:
        return "moderate"
    elif phq9_score <= 19:
        return "moderately severe"
    else:
        return "severe"

@app.route('/predict', methods=['POST'])
def predict():
    if model is None or vectorizer is None:
        return jsonify({'error': 'Model or vectorizer not loaded. Please check file paths.'}), 500
    
    # Expect JSON data with an array of diary entries under the key "symptoms"
    data = request.get_json(force=True)
    diary_entries = data.get('symptoms', [])
    
    if not diary_entries or not any(entry.strip() for entry in diary_entries):
        return jsonify({'error': 'No diary entries provided.'}), 400

    daily_results = []
    symptom_occurrences = {name: [] for name in SYMPTOM_NAMES}  # Track which days each symptom appears
    
    # Process each day separately
    for day_idx, entry in enumerate(diary_entries):
        if not entry or not entry.strip():
            # Skip empty entries
            daily_results.append({
                "day": day_idx + 1,
                "symptoms": [],
                "phq9_score": 0,
                "level": "minimal"
            })
            continue
        
        # Transform the text into features using the TF-IDF vectorizer
        features = vectorizer.transform([entry])
        
        # Predict using the multi-label XGBoost model
        # model.predict() returns a 2D array: [[0,1,0,1,...]] for each symptom
        predictions = model.predict(features)[0]  # Array of binary values (9 symptoms)
        
        # Get detected symptom names
        detected_symptoms = []
        for idx, pred in enumerate(predictions):
            if pred == 1:
                symptom_name = SYMPTOM_NAMES[idx]
                detected_symptoms.append(symptom_name)
                symptom_occurrences[symptom_name].append(day_idx + 1)
        
        # Calculate PHQ-9 score for this day (sum of detected symptoms)
        phq9_score = int(sum(predictions))
        level = calculate_depression_level(phq9_score)
        
        daily_results.append({
            "day": day_idx + 1,
            "symptoms": detected_symptoms,
            "phq9_score": phq9_score,
            "level": level
        })
    
    # Calculate overall depression level for 15 days
    # Average PHQ-9 score (since we have 15 days, we average it)
    total_phq9_score = sum(day['phq9_score'] for day in daily_results)
    average_phq9_score = total_phq9_score / len(diary_entries) if diary_entries else 0
    overall_level = calculate_depression_level(int(average_phq9_score))
    
    # Create symptom occurrences detail
    symptom_occurrences_detail = []
    for symptom_name, days_list in symptom_occurrences.items():
        if days_list:  # Only include symptoms that were detected
            symptom_occurrences_detail.append({
                "symptom": symptom_name,
                "total_occurrences": len(days_list),
                "days_detected": days_list
            })
    
    # Return comprehensive results
    return jsonify({
        "prediction": overall_level,
        "phq9_equivalent_score": int(average_phq9_score),
        "daily_results": daily_results,
        "final_levels": {
            "disease": "Depression",
            "level": overall_level,
            "total_score": int(total_phq9_score),
            "average_score": int(average_phq9_score)
        },
        "symptom_occurrences_detail": symptom_occurrences_detail
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 



    