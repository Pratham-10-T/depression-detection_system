# Flutter App API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently, user identification is done via:
- `userEmail` (query parameter or in request body)
- `userId` (query parameter or in request body) - optional

---

## 📝 Diary Results API

### 1. Get User's Diary Results
**Endpoint:** `GET /api/quiz/user-diary-results`

**Query Parameters:**
- `userEmail` (required if userId not provided)
- `userId` (required if userEmail not provided)

**Example Request:**
```
GET http://localhost:5000/api/quiz/user-diary-results?userEmail=valmikpalve@gmail.com
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "results": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userName": "valmik",
      "userEmail": "valmikpalve@gmail.com",
      "userId": null,
      "phq9Score": 12,
      "depressionLevel": "moderate",
      "createdAt": "2025-12-07T06:21:17.628Z",
      "updatedAt": "2025-12-07T06:21:17.628Z"
    }
  ]
}
```

**Depression Levels:**
- `"minimal"` - PHQ-9 score 0-4
- `"mild"` - PHQ-9 score 5-9
- `"moderate"` - PHQ-9 score 10-14
- `"moderately severe"` - PHQ-9 score 15-19
- `"severe"` - PHQ-9 score 20-27

---

## 🧪 Quiz Results API

### 2. Get User's Quiz Results
**Endpoint:** `GET /api/quiz/user-results`

**Query Parameters:**
- `userEmail` (required if userId not provided)
- `userId` (required if userEmail not provided)

**Example Request:**
```
GET http://localhost:5000/api/quiz/user-results?userEmail=valmikpalve@gmail.com
```

**Response:**
```json
{
  "success": true,
  "count": 1,
  "results": [
    {
      "_id": "69351cddd651339f72ae4630",
      "userName": "valmik",
      "userEmail": "valmikpalve@gmail.com",
      "userId": null,
      "testScore": 8,
      "depressionLevel": "Depression-Free",
      "createdAt": "2025-12-07T06:21:17.628Z",
      "updatedAt": "2025-12-07T06:21:17.628Z"
    }
  ]
}
```

**Depression Levels:**
- `"Depression-Free"` - Score >= 8
- `"Medium Depression"` - Score 5-7
- `"High Depression"` - Score < 5

---

## 📅 Appointments API

### 3. Get User's Appointments
**Endpoint:** `GET /api/appointments/user`

**Query Parameters:**
- `email` (required if userId not provided)
- `userId` (required if email not provided)

**Example Request:**
```
GET http://localhost:5000/api/appointments/user?email=valmikpalve@gmail.com
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "appointments": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "I need help with anxiety",
      "date": "2025-12-15T00:00:00.000Z",
      "time": "10:00 AM",
      "doctorId": "doc123",
      "doctor": {
        "name": "Dr. Sarah Smith",
        "speciality": "Psychiatrist",
        "image": "/images/doc1.jpg",
        "address": {
          "line1": "123 Medical Center",
          "line2": "Suite 456"
        }
      },
      "createdAt": "2025-12-07T10:30:00.000Z",
      "updatedAt": "2025-12-07T10:30:00.000Z"
    }
  ]
}
```

### 4. Book New Appointment
**Endpoint:** `POST /api/appointments/`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I need help with anxiety",
  "date": "2025-12-15T00:00:00.000Z",
  "time": "10:00 AM",
  "doctorId": "doc123",
  "doctor": {
    "name": "Dr. Sarah Smith",
    "speciality": "Psychiatrist",
    "image": "/images/doc1.jpg",
    "address": {
      "line1": "123 Medical Center",
      "line2": "Suite 456"
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "appointment": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

---

## 🎯 Unified Dashboard API (All Data in One Call)

### 5. Get User Dashboard (All Data)
**Endpoint:** `GET /api/quiz/dashboard`

**Query Parameters:**
- `userEmail` (required if userId not provided)
- `userId` (required if userEmail not provided)

**Example Request:**
```
GET http://localhost:5000/api/quiz/dashboard?userEmail=valmikpalve@gmail.com
```

**Response:**
```json
{
  "success": true,
  "data": {
    "diaryResults": {
      "count": 2,
      "results": [
        {
          "_id": "...",
          "userName": "valmik",
          "userEmail": "valmikpalve@gmail.com",
          "phq9Score": 12,
          "depressionLevel": "moderate",
          "createdAt": "2025-12-07T06:21:17.628Z",
          "updatedAt": "2025-12-07T06:21:17.628Z"
        }
      ]
    },
    "quizResults": {
      "count": 1,
      "results": [
        {
          "_id": "...",
          "userName": "valmik",
          "userEmail": "valmikpalve@gmail.com",
          "testScore": 8,
          "depressionLevel": "Depression-Free",
          "createdAt": "2025-12-07T06:21:17.628Z",
          "updatedAt": "2025-12-07T06:21:17.628Z"
        }
      ]
    },
    "appointments": {
      "count": 2,
      "appointments": [
        {
          "_id": "...",
          "name": "John Doe",
          "email": "john@example.com",
          "date": "2025-12-15T00:00:00.000Z",
          "time": "10:00 AM",
          "doctor": {
            "name": "Dr. Sarah Smith",
            "speciality": "Psychiatrist"
          }
        }
      ]
    }
  }
}
```

---

## 📱 Flutter App Implementation Guide

### Page 1: Diary Results Page
**API Call:**
```dart
GET /api/quiz/user-diary-results?userEmail=valmikpalve@gmail.com
```

**Display:**
- List all diary results
- Show: `phq9Score`, `depressionLevel`, `createdAt`
- Sort by `createdAt` (most recent first)

### Page 2: Quiz Results Page
**API Call:**
```dart
GET /api/quiz/user-results?userEmail=valmikpalve@gmail.com
```

**Display:**
- List all quiz results
- Show: `testScore`, `depressionLevel`, `createdAt`
- Sort by `createdAt` (most recent first)

### Page 3: Appointments Page
**API Call:**
```dart
GET /api/appointments/user?email=valmikpalve@gmail.com
```

**Display:**
- List all appointments
- Show: `doctor.name`, `date`, `time`, `message`
- Sort by `date` (upcoming first)

### Alternative: Single Dashboard Call
**API Call:**
```dart
GET /api/quiz/dashboard?userEmail=valmikpalve@gmail.com
```

**Use this if:**
- You want to load all data at once
- You have a dashboard/home screen showing all three sections

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (missing parameters)
- `500` - Server Error

---

## Example Flutter HTTP Calls

### Using http package:
```dart
import 'package:http/http.dart' as http;
import 'dart:convert';

// Get Diary Results
Future<Map<String, dynamic>> getDiaryResults(String userEmail) async {
  final response = await http.get(
    Uri.parse('http://localhost:5000/api/quiz/user-diary-results?userEmail=$userEmail'),
  );
  
  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load diary results');
  }
}

// Get Quiz Results
Future<Map<String, dynamic>> getQuizResults(String userEmail) async {
  final response = await http.get(
    Uri.parse('http://localhost:5000/api/quiz/user-results?userEmail=$userEmail'),
  );
  
  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load quiz results');
  }
}

// Get Appointments
Future<Map<String, dynamic>> getAppointments(String email) async {
  final response = await http.get(
    Uri.parse('http://localhost:5000/api/appointments/user?email=$email'),
  );
  
  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load appointments');
  }
}

// Get Dashboard (All Data)
Future<Map<String, dynamic>> getDashboard(String userEmail) async {
  final response = await http.get(
    Uri.parse('http://localhost:5000/api/quiz/dashboard?userEmail=$userEmail'),
  );
  
  if (response.statusCode == 200) {
    return json.decode(response.body);
  } else {
    throw Exception('Failed to load dashboard');
  }
}
```

---

## Notes

1. **CORS**: The backend has CORS enabled, so Flutter app can make requests
2. **Date Format**: All dates are in ISO 8601 format (e.g., "2025-12-07T06:21:17.628Z")
3. **Sorting**: All results are sorted by `createdAt` in descending order (newest first)
4. **Empty Results**: If no data found, `count` will be 0 and array will be empty

---

## Testing

You can test these endpoints using:
- Postman
- cURL
- Flutter app
- Browser (for GET requests)

**Example cURL:**
```bash
# Get Diary Results
curl "http://localhost:5000/api/quiz/user-diary-results?userEmail=valmikpalve@gmail.com"

# Get Quiz Results
curl "http://localhost:5000/api/quiz/user-results?userEmail=valmikpalve@gmail.com"

# Get Appointments
curl "http://localhost:5000/api/appointments/user?email=valmikpalve@gmail.com"

# Get Dashboard
curl "http://localhost:5000/api/quiz/dashboard?userEmail=valmikpalve@gmail.com"
```




