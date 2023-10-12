# HabitTracker_BE

37.78 is a habit motivation app.

## Table of Contents
1. [Introduction](#introduction)
2. [Technologies](#technologies)
3. [User Stories](#user-stories)
4. [Schemas](#schemas)
5. [Sample Data](#sample-data)
6. [API Routes](#api-routes)

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
  - Day 1:
    - We all have enough will power to build or break one habit at a time.
      - List the 5 habits you want to break or build.
      - Keep track of them for one week starting from today.
      - Know the prime habit on Day 7 and start building it.
  - Day 2 - Day 6:
  N/A
  - Day 7:
    - Here is the result:
- As a logged in user, I want to see the motivation text in a random order from Day 2 to Day 6:
  - Quote 1:
    > "Successful people are simply those with successful habits. – Brian Tracy"
  - Quote 2:
    > "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle"
  - Quote 3:
    > "Watch your actions, they become your habits.  Watch your habits, they become your character. – Vince Lombardi"
  - Quote 4:
    > "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison"
  - Quote 5:
    > "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning"
- As a logged in user, I want to see my result text on Day 7. 
The result includes prime habit, good dopamines, bad dopamines.
- As a logged in user, I want to start building my prime habit on Day 7 + 1. 

### Build prime habit
- As a logged in user, I want to track the prime habit that I'm building.
- As a logged in user, I want to see the instruction text in the below order:
  - Day 1:
    - Please use all the will power you have to build/break this prime habit.
      - Keep track of the prime habit starting from today.
      - You will be successful for building/breaking it for 21 days non-stop.
      - Celebrate for small win when you build/break it for a day.
      - Tolerate when you don't make it for a day.
  - Success Day:
    - Here is the result:
- As a logged in user, I want to see the motivation text in a random order from Day 2 to Day 6:
  - Quote 1:
    > "Successful people are simply those with successful habits. – Brian Tracy"
  - Quote 2:
    > "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle"
  - Quote 3:
    > "Watch your actions, they become your habits.  Watch your habits, they become your character. – Vince Lombardi"
  - Quote 4:
    > "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison"
  - Quote 5:
    > "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning"
- As a logged in user, I want to see my result text every day. 
The result includes current streak.
- As a logged in user, I want to start checking my prime habit after successfully building/breaking it for 21 days non-stop.

### Check prime habit
- As a logged in user, I want to track the habits (including prime habit) for 7 days.
- As a logged in user, I want to see the instruction text in the below order:
  - Day 1:
    - Please use all the will power you have to build/break this prime habit.
      - Keep track all of your habits again starting from today.
      - You will be successful for building/breaking the prime habit for 7 days non-stop.
  - Day 7:
    - Here is the result:
- As a logged in user, I want to see the motivation text in a random order from Day 2 to Day 6:
  - Quote 1:
    > "Successful people are simply those with successful habits. – Brian Tracy"
  - Quote 2:
    > "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle"
  - Quote 3:
    > "Watch your actions, they become your habits.  Watch your habits, they become your character. – Vince Lombardi"
  - Quote 4:
    > "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison"
  - Quote 5:
    > "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning"
- As a logged in user, I want to know my check result on Day 7.
The result includes prime habit, result text.

## Schemas
### User Schema
This schema represents a user in 37.78.
| Field       | Type     | Description                    |
|------------ |--------- |-------------------------------|
| `_id`  | String   | Auto generated by MongoDB.      |
| `username`  | String   | The username of the user.      |
| `email`     | String   | The email address of the user. |
| `password`   | String    | The encrypted password of the user.|

*Note: `username` and `email` are required fields.*

### Setting Schema:
This schema represents the user setting in 37.78.
| Field       | Type     | Description                    |
|------------ |--------- |-------------------------------|
| `_id`  | String   | Auto generated by MongoDB.      |
| `max_habits`  | Number   | How many habits to analyse.      |
| `analyse_duration`  | Number   | How many to analyse the habits. Default is 7      |
| `build_duration`  | Number   | How many consecutive days to build/break the prime habit. Default is 21      |
| `check_duration`  | Number   | How many to check the prime habit. Default is 7      |
| `analyse_stage_analyse_page`     | Array   | view, create, edit, track |
| `analyse_stage_build_page`     | Array   | N/A |
| `analyse_stage_check_page`     | Array   | view |
| `build_stage_analyse_page`     | Array   | view |
| `build_stage_build_page`     | Array   | view, track |
| `build_stage_check_page`     | Array   | N/A |
| `check_stage_analyse_page`     | Array   | view |
| `check_stage_build_page`     | Array   | view |
| `check_stage_check_page`     | Array   | track |
| `user`  | String   | The id of the user     |

### Instruction Schema:
This schema represents the motivation quotes in 37.78.
| Field       | Type     | Description                    |
|------------ |--------- |-------------------------------|
| `_id`  | String   | Auto generated by MongoDB.      |
| `stage`  | String   | The current stage of the cycle, either analyse/build/check  |
| `day`  | Number   | Auto generated by MongoDB.      |
| `text`  | String   | Text |

### Motivation Schema:
This schema represents the motivation quotes in 37.78.
| Field       | Type     | Description                    |
|------------ |--------- |-------------------------------|
| `_id`  | String   | Auto generated by MongoDB.      |
| `text`  | String   | Text |

### Cycle Schema:
This schema represents a cycle in 37.78.
| Field       | Type     | Description                    |
|------------ |--------- |-------------------------------|
| `_id`  | String   | Auto generated by MongoDB.      |
| `start_date`  | String   | The start date of the cycle, Day 1 of analyse  stage   |
| `end_date`  | String   | The end date of the cycle, Day 7 of check stage      |
| `stage`  | String   | The current stage of the cycle, either analyse/build/check      |
| `analyse_result`  | String   | The id of the prime habit.      |
| `build_duration`  | Number   | How many consecutive days to build/break the prime habit.      |
| `check_result`  | String   | The final result of the prime habit, either success/fail.      |
| `habits`     | Array   | The ids of the habits in the cycle |
| `user`  | String   | The id of the user     |

### Habit Schema:
This schema represents a habit in 37.78.
| Field       | Type     | Description                    |
|------------ |--------- |-------------------------------|
| `_id`  | String   | Auto generated by MongoDB.      |
| `description`  | String   | The username of the user      |
| `type`     | String   | The type of the habit, either good or bad |
| `results`     | Array   | The ids of the results of the habit  |

### Result Schema:
This schema represents a result of a habit on a date.
| Field       | Type     | Description                    |
|------------ |--------- |-------------------------------|
| `_id`  | String   | Auto generated by MongoDB.      |
| `result_date`  | Date   | The date of the result.      |
| `complete`     | Boolean   | The completion of the habit, either true or false |
| `stage`     | String   | The current stage of the cycle, either analyse/build/check      |
| `habit`     | String   | The ids of the habits in the cycle  |
| `totalCompletions`     | Number   | The total complete days of the habit|
| `totalDopamines`     | Number   | The total dopamines of the habit|
| `currentStreak`     | Number   | The current streak of the habit|



## Sample Data
[x] users: 1 record
```json
{
  "_id": {
    "$oid": "65164604273dec1588a68451"
  },
  "username": "tam",
  "email": "tam@gmail.com",
  "password": "$2b$10$1nSReV.qq8.tllX08R5ESeHg7wF.7Tfnqqn0KWpUZWZxfXrTeIxvG",
  "createdAt": {
    "$date": "2023-09-29T03:35:32.894Z"
  },
  "__v": 0
}
```

[x] setting: 1 record
```json
{
  "max_habits": 5,
  "analyse_duration": 7,
  "build_duration": 21,
  "check_duration": 7,
  "analyse_stage_analyse_page": ["view", "create", "edit", "track"]`,
  "analyse_stage_build_page": []`,
  "analyse_stage_check_page": `["view"],
  "build_stage_analyse_page": ["view"],
  "build_stage_build_page": ["view", "track"],
  "build_stage_check_page": [],
  "check_stage_analyse_page": ["view"],
  "check_stage_build_page": ["view"],
  "check_stage_check_page": ["track"],
  "user": "65164604273dec1588a68451" //replace with actual user_id
}
```

[] cycles: 1 record
```json
{
  "start_date": "2023-10-01",
  "end_date": "2023-10-07",
  "stage": "analyse",
  "analyse_result": "609f90f3f5fc66362eac73a2", //replace with actual prime habit_id
  "build_duration": 21,
  "check_result": "success",
  "habits": [
    "609f90f3f5fc66362eac73a3",//replace with actual habit_id
    "609f90f3f5fc66362eac73a4",//replace with actual habit_id
    "609f90f3f5fc66362eac73a5",//replace with actual habit_id
    "609f90f3f5fc66362eac73a4",//replace with actual habit_id
    "609f90f3f5fc66362eac73a5" //replace with actual habit_id
  ],
  "user": "65164604273dec1588a68451" //replace with actual user_id
}
```

[x] motivation: 5 records
```json
db.quotes.insertMany([
    { "text": "Successful people are simply those with successful habits. – Brian Tracy" },
    { "text": "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle" },
    { "text": "Watch your actions, they become your habits. Watch your habits, they become your character. – Vince Lombardi" },
    { "text": "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison" },
    { "text": "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning" }
]);
```

```json

```

[] instructions: 6 records


[] habits: 5 records
```json
db.habits.insertMany([
  {
    "description": "Exercise for 30 minutes daily",
    "type": "good",
    "results": []
  },
  {
    "description": "Read a book for 20 minutes before bedtime",
    "type": "good",
    "results": []
  },
  {
    "description": "Limit screen time to 2 hours per day",
    "type": "good",
    "results": []
  },
  {
    "description": "Avoid sugary snacks and drinks",
    "type": "good",
    "results": []
  },
  {
    "description": "Smoking cessation program",
    "type": "bad",
    "results": []
  }
]);
```

[] results: 35 records


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
