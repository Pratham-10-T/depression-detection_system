import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from xgboost import XGBClassifier
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import (
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    multilabel_confusion_matrix,
    accuracy_score
)
import joblib

# --------------------------
# Data Loading and Preprocessing
# --------------------------
# Load training and testing data (update file paths as needed)
train_data = pd.read_csv(r"C:\mental health web\MentalHealthWebsite\backend\ml\multilabel_classification_train.csv")
test_data = pd.read_csv(r"C:\mental health web\MentalHealthWebsite\backend\ml\multilabel_classification _test.csv")

# Drop rows where text or labels are missing
train_data = train_data.dropna()
test_data = test_data.dropna()

# Separate text (column 0) and labels (columns 1 through 9)
X_train_text = train_data.iloc[:, 0]
y_train = train_data.iloc[:, 1:10]  # Assumes 9 label columns; adjust if different

X_test_text = test_data.iloc[:, 0]
y_test = test_data.iloc[:, 1:10]

# Fill NaNs in labels with 0 and convert to integer
y_train = y_train.fillna(0).astype(int)
y_test = y_test.fillna(0).astype(int)

print("Unique values per label column in training data:")
print(y_train.nunique())

# --------------------------
# TF-IDF Vectorization
# --------------------------
vectorizer = TfidfVectorizer(max_features=5000)
X_train = vectorizer.fit_transform(X_train_text)
X_test = vectorizer.transform(X_test_text)

# --------------------------
# XGBoost Model Training
# --------------------------
xgb_model = XGBClassifier(eval_metric='logloss')
multi_label_xgb = MultiOutputClassifier(xgb_model, n_jobs=1)
multi_label_xgb.fit(X_train, y_train)

# --------------------------
# Predictions
# --------------------------
y_pred = multi_label_xgb.predict(X_test)

# --------------------------
# Evaluation Metrics
# --------------------------
# Subset Accuracy (exact match ratio)
subset_accuracy = np.mean(np.all(y_test.values == y_pred, axis=1))

# Macro Precision, Recall, and F1
precision_macro = precision_score(y_test, y_pred, average='macro', zero_division=1)
recall_macro = recall_score(y_test, y_pred, average='macro', zero_division=1)
f1_macro = f1_score(y_test, y_pred, average='macro', zero_division=1)

print("\nXGBoost Model Evaluation Metrics (Macro Averaging):")
print("----------------------------------------")
print(f"Subset Accuracy: {subset_accuracy:.4f}")
print(f"Precision (Macro): {precision_macro:.4f}")
print(f"Recall (Macro):    {recall_macro:.4f}")
print(f"F1-Score (Macro):  {f1_macro:.4f}")
print("----------------------------------------")

# Overall Confusion Matrix (flattened across all labels)
y_test_flat = y_test.values.ravel()
y_pred_flat = y_pred.ravel()
overall_cm = confusion_matrix(y_test_flat, y_pred_flat)
print("\nOverall Confusion Matrix (Flattened):")
print(overall_cm)

# Per-Symptom Metrics and Confusion Matrices
mm_cm = multilabel_confusion_matrix(y_test, y_pred)
for i, label in enumerate(y_test.columns):
    cm = mm_cm[i]
    print(f"\nConfusion Matrix for {label}:")
    print(cm)

    precision_label = precision_score(y_test[label], y_pred[:, i], average='binary', zero_division=1)
    recall_label = recall_score(y_test[label], y_pred[:, i], average='binary', zero_division=1)
    f1_label = f1_score(y_test[label], y_pred[:, i], average='binary', zero_division=1)

    print(f"Metrics for {label}:")
    print(f"  Precision: {precision_label:.4f}")
    print(f"  Recall:    {recall_label:.4f}")
    print(f"  F1-Score:  {f1_label:.4f}")

# Individual Symptom Accuracies
print("\nIndividual Symptom Accuracies:")
for i, label in enumerate(y_test.columns):
    acc = accuracy_score(y_test[label].values, y_pred[:, i])
    print(f"Accuracy for {label}: {acc:.4f}")

# --------------------------
# Save the Model and Vectorizer
# --------------------------
joblib.dump(multi_label_xgb, 'multi_label_xgb_model.pkl')
joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
print("\nModel and vectorizer saved successfully.")