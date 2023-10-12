# HabitTracker_BE

37.78 is a habit motivation app.

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies-used)
3. [User Stories](#user-stories)
4. [API Routes](#api-routes)

## Introduction
This Back-End provides the APIs to handle:
- User authentication.
- Analyse (prime) habits.
- Build (prime) habits.
- Check (prime) habits.

## Technologies
- Node.js
- Express.js
- Mongoose

## User Stories
### Authentication
- As a guest, I want to register for an account so that I can use the app. 
The required information is username, email and password. 
- As a registered user, I want to recover my password so that I can login.
The required information is email.
- As a registered user, I want to login/logout.
The required information is email and password.

### Analyse prime habit
- As a logged in user, I want to view the habits that I'm analysing.
The allowed information is habit's description, their completions for 7 days.
- As a logged in user, I want to create the habits that I want to analyse. 
The required information is description, type (good or bad habit).
- As a logged in user, I want to edit the habits that I'm analysing.
The allowed information is description, type (good or bad habit). 
- As a logged in user, I want to delete the habits that I'm analysing.
- As a logged in user, I want to track the habits that I'm analysing for 7 days.
- As a logged in user, I want to see the instruction text in the below order:
  Day 1:
  "We all have enough will power to build or break one habit at a time.
  - List the 5 habits you want to break or build.
  - Keep track of them for one week starting from today.
  - Know the prime habit on Day 7 and start building it."
  Day 2 - Day 6:
  N/A
  Day 7:
  "Here is the result:"
- As a logged in user, I want to see the motivation text in a random order from Day 2 to Day 6:
  Quote 1:
  "Successful people are simply those with successful habits. – Brian Tracy"
  Quote 2:
  "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle"
  Quote 3:
  "Watch your actions, they become your habits.  Watch your habits, they become your character. – Vince Lombardi"
  Quote 4:
  "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison"
  Quote 5:
  "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning"
- As a logged in user, I want to see my result text on Day 7. 
The result includes prime habit, good dopamines, bad dopamines.
- As a logged in user, I want to start building my prime habit on Day 7 + 1. 

### Build prime habit
- As a logged in user, I want to track the prime habit that I'm building.
- As a logged in user, I want to see the instruction text in the below order:
  Day 1:
  "Please use all the will power you have to build/break this prime habit.
  - Keep track of the prime habit starting from today.
  - You will be successful for building/breaking it for 21 days non-stop.
  - Celebrate for small win when you build/break it for a day.
  - Tolerate when you don't make it for a day."
  Success Day:
  "Here is the result:"
- As a logged in user, I want to see the motivation text in a random order from Day 2 to Day 6:
  Quote 1:
  "Successful people are simply those with successful habits. – Brian Tracy"
  Quote 2:
  "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle"
  Quote 3:
  "Watch your actions, they become your habits.  Watch your habits, they become your character. – Vince Lombardi"
  Quote 4:
  "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison"
  Quote 5:
  "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning"
- As a logged in user, I want to see my result text every day. 
The result includes current streak.
- As a logged in user, I want to start checking my prime habit after successfully building/breaking it for 21 days non-stop.

### Check prime habit
- As a logged in user, I want to track the habits (including prime habit) for 7 days.
- As a logged in user, I want to see the instruction text in the below order:
  Day 1:
  "Please use all the will power you have to build/break this prime habit.
  - Keep track all of your habits again starting from today.
  - You will be successful for building/breaking the prime habit for 7 days non-stop."
  Day 7:
  "Here is the result:"
- As a logged in user, I want to see the motivation text in a random order from Day 2 to Day 6:
  Quote 1:
  "Successful people are simply those with successful habits. – Brian Tracy"
  Quote 2:
  "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle"
  Quote 3:
  "Watch your actions, they become your habits.  Watch your habits, they become your character. – Vince Lombardi"
  Quote 4:
  "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison"
  Quote 5:
  "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning"
- As a logged in user, I want to know my check result on Day 7.
The result includes prime habit, result text.

## Schemas
### User:
- username
- email
- password

### Habit:
- name
- description
- userId

### Completion:
- date
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
- **Route:** `PUT /users/{userId}`
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
- **Route:** `GET /habits`
- **Description:** List all habits belong to the current user
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
- **Description:** Create a new habit for the current user
- **Request Body:**

  ```json
  {
    "name": "string",
    "description": "string",
    "goalValue": "number",
    "goalFrequency": "number",
    "reminderTime": "time",
    "completed": "boolean",
    "userId": "string"
  }
  ```

- **Response:**

  - Status: 200 OK
  - Body:

    ```json

    ```

#### Update a Habit

- **Route:** `PUT /habits/{habitId}`
- **Description:** Update a habit
- **Request Body:**
  ```json
  {
    "name": "string",
    "description": "string",
    "goalValue": "number",
    "goalFrequency": "number",
    "reminderTime": "time",
    "completed": "boolean",
    "userId": "string"
  }
  ```
- **Response:**

  - Status: 200 OK
  - Body:

    ```json

    ```

#### Delete a Habit

- **Route:** `DELETE /habits/{habitId}`
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

- **Route:** `GET /habits/{id}/progress/`
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

- **Route:** `POST /habits/{id}/progresses/`
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
