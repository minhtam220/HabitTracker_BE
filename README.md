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

## API Routes

### Server: https://habittracker-be.onrender.com/

### Authentication
#### Register a New User
- **Route:** `POST /auth/register`
- **Description:** Register a new user.
- **Request Body:**
  ```json

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

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Habit
#### Get a List of Habits
- **Route:** `GET /habits/users/{userId}`
- **Description:** Get a list of habits belong to a user.
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

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Delete a Habit
- **Route:** `DELETE /habits/{id}`
- **Description:** Delete a habit.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
    
### Progress

#### Get a list of Progresses of a Habit
- **Route:** `GET /habits/progresses/{habitId}`
- **Description:** Get a list of progresses of a habit.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
    
#### Create a New Progress of a Habit
- **Route:** `POST /habits/progresses/`
- **Description:** Create a new habit.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
    
#### Update a Progress
- **Route:** `PUT /habits/progresses/{progressId}`
- **Description:** Update a progress.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```

### Goal
#### List all Goals
- **Route:** `GET /goals/users/{userId}`
- **Description:** List all goals belong to a user.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Create a New Goal
- **Route:** `POST /goals`
- **Description:** Create a new goal.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Update a Goal
- **Route:** `PUT /goals/{id}`
- **Description:** Update a goal.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```
#### Delete a Goal
- **Route:** `DELETE /goals/{id}`
- **Description:** Delete a goal.
- **Request Body:**
  ```json

  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json

    ```












    


  

  



