
## API Endpoints

### Patient Routes

| Method | Endpoint               | Description                          | Request Body Example                              |
|--------|------------------------|--------------------------------------|---------------------------------------------------|
| GET    | `/patients`            | Retrieve all patients                | N/A                                               |
| GET    | `/patients/:id`        | Retrieve a patient by ID             | N/A                                               |
| POST   | `/patients`            | Add a new patient                    | ```json                                          |
|        |                        |                                      | { "name": "John Doe",                            |
|        |                        |                                      |   "age": 30,                                     |
|        |                        |                                      |   "gender": "male",                              |
|        |                        |                                      |   "email": "johndoe@example.com" }              |
|        |                        |                                      | ```                                              |
| PUT    | `/patients/:id`        | Update a patient’s details          | ```json                                          |
|        |                        |                                      | { "age": 31 }                                    |
|        |                        |                                      | ```                                              |
| DELETE | `/patients/:id`        | Delete a patient                     | N/A                                               |

### Authorization Routes

| Method | Endpoint                 | Description                          | Request Body Example                              |
|--------|--------------------------|--------------------------------------|---------------------------------------------------|
| GET    | `/authorizations`        | Retrieve all authorization requests   | N/A                                               |
| GET    | `/authorizations/:id`    | Retrieve an authorization by ID       | N/A                                               |
| POST   | `/authorizations`        | Create a new authorization request    | ```json                                          |
|        |                        |                                      | { "patientId": "1234567890abcdef12345678",      |
|        |                        |                                      |   "status": "pending",                           |
|        |                        |                                      |   "requestedBy": "Dr. Smith" }                   |
|        |                        |                                      | ```                                              |
| PUT    | `/authorizations/:id`    | Update an authorization request       | ```json                                          |
|        |                        |                                      | { "status": "approved" }                         |
|        |                        |                                      | ```                                              |
| DELETE | `/authorizations/:id`    | Delete an authorization request       | N/A                                               |

---

