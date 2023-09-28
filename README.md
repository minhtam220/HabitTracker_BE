# HabitTracker_BE

This project is part of Full Stack Web - ExpressJS with MongoDB module by CoderSchool.

## Table of Contents

1. [Introduction](#introduction)
2. [Technologies Used](#technologies-used)
3. [API Routes](#api-routes)

## Introduction

The Back End provides the API to manage users and tasks.

## Technologies Used

- Node.js
- Express.js
- Mongoose

## Schemas

### User: 
- username
- email
- password

### Habit
- name
- description
- userId
- goalValue
- goalFrequency
- reminderTime
- completed

### Completion
- date
- completed
- habitId

## API Routes

### Server: https://habittracker-be.onrender.com/

### Authentication
#### Register a New User
- **Route:** `POST /auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
  "username": "string",
  "email": "string",
  "password": "string"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

#### Login a User
- **Route:** `POST /auth/login`
- **Description:** Login a user.
- **Request Body:**
  ```json
  {
  "email": "string",
  "password": "string"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Logout a User
- **Route:** `POST /auth/logout`
- **Description:** Logout a user.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
    
### User
#### Update a User
- **Route:** `PUT /users/{id}`
- **Description:** Update a user.
- **Request Body:**
  ```json
  {
  "username": "string",
  "email": "string",
  "password": "string"
  }

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Habit
#### List all Habits
- **Route:** `GET /habits/users/{userId}`
- **Description:** List all habits belong to a user.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Create a New Habit
- **Route:** `POST /habits`
- **Description:** Create a new habit.
- **Request Body:**
  ```json
  {
  "name": "string",
  "description": "string",
  "goalValue": "number",
  "goalFrequency": "number",
  "reminderTime": "time",
  "completed": "boolean",
  "userId": "string",
  }

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Update a Habit
- **Route:** `PUT /habits/{id}`
- **Description:** Update a habit.
- **Request Body:**
  ```json
  {
  "name": "string",
  "description": "string",
  "goalValue": "number",
  "goalFrequency": "number",
  "reminderTime": "time",
  "completed": "boolean",
  "userId": "string",
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Delete a Habit
- **Route:** `DELETE /habits/{id}`
- **Description:** Delete a habit
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
    
### Progress
#### View the Progress of a Habit
- **Route:** `GET /habits/progresses/`
- **Description:** Get a list of completion dates of a habit
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
    
#### Update the Progress of a Habit
- **Route:** `POST /habits/progresses/{id}`
- **Description:** Mark or unmark the completion of a habit on a given date
- **Request Body:**
  ```json
  {
  "date": "string"
  "completed": "boolean"
  }
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    

    ```













    


  

  



