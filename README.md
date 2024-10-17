# PatientView: Patient Health Dashboard for Prior Authorization

## Objective
Develop a full-stack application where healthcare providers can view and manage patient health data, focusing on prior authorization workflows. This will involve creating a patient dashboard, integrating health data, and building APIs for submitting and managing prior authorization requests.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Documentation](#api-documentation)
  - [Patient API](#patient-api)
  - [Authorization API](#authorization-api)
  - [Response Examples](#response-examples)
- [Frontend Documentation](#frontend-documentation)
- [Usage](#usage)

## Technologies Used
- **Frontend**: React, Axios, Bootstrap,React-icons
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Development Tools**: Nodemon, dotenv

## Installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/sonineelay/patient-view.git
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Frontend Setup
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the `server` directory with the following content:
```plaintext
MONGO_URI=<your_mongo_connection_string>
PORT=5000
```

## API Documentation

### Patient API

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/patients`        | Retrieve all patients                |
| GET    | `/api/patients/:id`    | Retrieve a patient by ID             |
| POST   | `/api/patients`        | Add a new patient                    |
| PUT    | `/api/patients/:id`    | Update a patient’s details           |
| DELETE | `/api/patients/:id`    | Delete a patient                     |

### Authorization API

| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| GET    | `/api/authorizations`        | Retrieve all authorizations          |
| GET    | `/api/authorizations?patientId=<patient-id>`        | Retrieve all authorizations for a specific patient          |
| GET    | `/api/authorizations/:id`    | Retrieve a authorization request by ID             |
| POST   | `/api/authorizations`        | Add a new authorization request                    |
| PUT    | `/api/authorizations/:id`    | Update a authorization request’s details           |
| DELETE | `/api/authorizations/:id`    | Delete a authorization request                     |

Here’s the updated **Response Examples** section with Indian names and relevant details:

## Response Examples

### Patient Object
The response object for a patient may look like this:

```json
{
  "_id": "67115c6e3336f37d37ceaf78",
  "name": "Rajesh Kumar",
  "age": 45,
  "condition": "Hypertension",
  "treatmentPlan": [
    {
      "treatment": "Blood Pressure Monitoring",
      "medication": "Amlodipine",
      "startDate": "2024-06-01T00:00:00.000Z",
      "_id": "67115e163336f37d37ceaff9"
    },
    {
      "treatment": "Lifestyle Changes",
      "medication": "N/A",
      "startDate": "2022-11-15T00:00:00.000Z",
      "_id": "67115e163336f37d37ceaffa"
    },
    {
      "treatment": "Cholesterol Management",
      "medication": "Atorvastatin",
      "startDate": "2023-01-10T00:00:00.000Z",
      "_id": "6711717c3336f37d37ceb2c2"
    }
  ],
  "medicationHistory": [
    {
      "medication": "Paracetamol",
      "dosage": "500mg",
      "duration": "2 months",
      "_id": "67115c6e3336f37d37ceaf7a"
    }
  ],
  "createdAt": "2024-10-17T18:50:22.179Z",
  "updatedAt": "2024-10-17T20:48:33.979Z",
  "__v": 0
}
```

### Authorization Object
The response object for an authorization request may look like this:

```json
{
  "_id": "671172293336f37d37ceb2d4",
  "patientId": "67115c6e3336f37d37ceaf78",
  "treatment": "Routine Checkup",
  "insurancePlan": "Max Bupa Health Insurance",
  "diagnosisCode": "I10",
  "doctorNotes": "Annual health checkup required.",
  "status": "approved",
  "createdAt": "2024-10-17T20:23:05.688Z",
  "updatedAt": "2024-10-17T20:23:05.688Z",
  "__v": 0
}
```


## Frontend Documentation
The front end is built using React. 

### Key Components
- **Patient Dashboard**
- **Authorization Management**
- **Forms**

### API Integration
The frontend uses Axios for API calls. Here’s an example of fetching patients:

```javascript
import axios from 'axios';

const fetchPatients = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
};
```

## Usage
### Running the Application
1. **Start the Backend Server**:
   In the `server` directory, run:
   ```bash
   npm run dev
   ```

2. **Start the Frontend Client**:
   In the `client` directory, run:
   ```bash
   npm start
   ```

### Accessing the Application

- **Web Application**: 
  - Open your web browser and navigate to `http://localhost:3000` to access the patient health dashboard.

- **API Testing**:
  - To test the API endpoints, open your preferred API testing tool (e.g., Postman, Insomnia) and make requests to `http://localhost:5000/api/{endpoint}`. Replace `{endpoint}` with the specific API endpoint you wish to test.


### Explanation of Sections

- **Objective**: Provides a clear goal for the application.
- **Technologies Used**: Lists the tech stack used in the project.
- **Installation**: Guides users through the process of setting up the server and client.
- **API Documentation**: Clearly outlines the available API endpoints with examples.
- **Frontend Documentation**: Describes the structure of the frontend and how it interacts with the backend APIs.
- **Usage**: Instructions on how to run the application.
- **Contributing**: Encourages collaboration and explains how to contribute to the project.
- **License**: Provides licensing information.

Feel free to modify or expand upon this template to suit your project's needs! Let me know if you need further assistance or any specific changes.
