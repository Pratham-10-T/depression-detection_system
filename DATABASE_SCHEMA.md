# Database Schema - Quiz Results

## Overview
The database stores quiz/test results for the Mental Health Website. There are two types of tests: **Depression Diary** and **Quiz**.

---

## Database Collection: `quizResults`

### Schema Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userName` | String | ✅ Yes | Name of the user taking the test |
| `userEmail` | String | ❌ No | Email address (optional, can be null) |
| `userId` | ObjectId | ❌ No | Reference to User model (optional, can be null if not logged in) |
| `testType` | String | ✅ Yes | Type of test: `"Depression Diary"` or `"Quiz"` |
| `phq9Score` | Number | ❌ No | PHQ-9 score (0-27) - **Only for Depression Diary** |
| `testScore` | Number | ❌ No | Number of correct answers - **Only for Quiz** |
| `depressionLevel` | String | ✅ Yes | Overall depression level (see valid values below) |
| `createdAt` | Date | Auto | Timestamp when record was created |
| `updatedAt` | Date | Auto | Timestamp when record was last updated |

---

## Depression Diary Test - What Gets Saved

When a user submits 15 days of diary entries, the following data is saved:

### Example Document:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "userId": null,
  "testType": "Depression Diary",
  "phq9Score": 12,
  "testScore": null,
  "depressionLevel": "moderate",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### What is NOT Saved:
- ❌ **Diary entries text** (the actual 15 days of text entries are NOT stored)
- ❌ Daily PHQ-9 scores (only the overall average is saved)
- ❌ Daily depression levels (only the overall level is saved)
- ❌ Detected symptoms list
- ❌ Symptom occurrences detail

### What IS Saved:
- ✅ User identification (name, email, userId if available)
- ✅ Overall PHQ-9 score (average across 15 days, range 0-27)
- ✅ Overall depression level (minimal, mild, moderate, moderately severe, severe)
- ✅ Test type ("Depression Diary")
- ✅ Timestamps

---

## Quiz Test - What Gets Saved

When a user completes a Quiz test:

### Example Document:
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "userName": "Jane Smith",
  "userEmail": "jane@example.com",
  "userId": null,
  "testType": "Quiz",
  "phq9Score": null,
  "testScore": 8,
  "depressionLevel": "mild",
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

---

## Valid Depression Levels

The `depressionLevel` field can only contain one of these values:

1. `"minimal"` - PHQ-9 score 0-4
2. `"mild"` - PHQ-9 score 5-9
3. `"moderate"` - PHQ-9 score 10-14
4. `"moderately severe"` - PHQ-9 score 15-19
5. `"severe"` - PHQ-9 score 20-27
6. `"Depression-Free"` - For Quiz tests
7. `"Medium Depression"` - For Quiz tests
8. `"High Depression"` - For Quiz tests

---

## Data Flow for Depression Diary

1. **Frontend** sends:
   - `userName` (from localStorage or "Guest User")
   - `userEmail` (from localStorage or null)
   - `userId` (null or from JWT token)
   - `diaryEntries` (array of 15 text entries)

2. **Backend Controller** (`quizController.js`):
   - Calls Flask ML service with diary entries
   - Receives prediction data including:
     - `phq9_equivalent_score` or `final_levels.average_score`
     - `prediction` or `final_levels.level`
     - `daily_results` (not saved)
     - `symptom_occurrences_detail` (not saved)

3. **Database** saves only:
   - `userName`
   - `userEmail`
   - `userId`
   - `testType: "Depression Diary"`
   - `phq9Score` (from ML response)
   - `depressionLevel` (from ML response)
   - `createdAt` / `updatedAt` (automatic)

---

## Important Notes

⚠️ **Privacy Consideration**: The actual diary entry text is **NOT stored** in the database. Only the calculated scores and levels are saved.

⚠️ **Data Retention**: All diary entry text is processed by the ML model but discarded after calculation. Only summary statistics are stored.

⚠️ **User Identification**: Users can take tests without logging in (userId will be null), but userName is always required.

---

## API Endpoints

### Save Quiz Result
- **POST** `/api/quiz/save`
- Saves Depression Diary or Quiz results

### Get User Quiz Results
- **GET** `/api/quiz/user-results?userId=xxx` or `?userEmail=xxx`
- Returns all quiz results for a specific user

### Get All Quiz Results (Admin)
- **GET** `/api/quiz/all-results`
- Returns last 100 quiz results (admin function)


