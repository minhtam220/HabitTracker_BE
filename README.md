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
db.users.insertMany([
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
])
```

[x] setting: 1 record
```json
db.settings.insertMany([
  {
    "_id": {
      "$oid": "6527fc202af98e626d92c4bd"
    },
    "max_habits": 5,
    "analyse_duration": 7,
    "build_duration": 21,
    "check_duration": 7,
    "analyse_stage_analyse_page": [
      "view",
      "create",
      "edit",
      "track"
    ],
    "analyse_stage_build_page": [],
    "analyse_stage_check_page": [
      "view"
    ],
    "build_stage_analyse_page": [
      "view"
    ],
    "build_stage_build_page": [
      "view",
      "track"
    ],
    "build_stage_check_page": [],
    "check_stage_analyse_page": [
      "view"
    ],
    "check_stage_build_page": [
      "view"
    ],
    "check_stage_check_page": [
      "track"
    ],
    "user": {
      "$oid": "65164604273dec1588a68451"
    }
  }
])
```

[x] cycles: 1 record
```json
db.cycles.insertMany([
  {
    "_id": {
      "$oid": "6528cae82af98e626d92c4cb"
    },
    "start_date": "2023-10-09",
    "end_date": "2023-10-15",
    "stage": "analyse",
    "analyse_result": "",
    "build_duration": 21,
    "check_result": "success",
    "habits": [
      { "$oid": "6527ff513bc4769f6b04b3b0" },
      { "$oid": "6527ff513bc4769f6b04b3b2" },
      { "$oid": "6527ff513bc4769f6b04b3b3" },
      { "$oid": "6527ff513bc4769f6b04b3b1" },
      { "$oid": "6527ff513bc4769f6b04b3af" }
    ],
    "user": {
      "$oid": "65164604273dec1588a68451"
    }
  }
])

```

[x] quotes (motivations) : 5 records
```json
db.quotes.insertMany([
  {
    "_id": {
      "$oid": "6527fde73bc4769f6b04b3aa"
    },
    "text": "Successful people are simply those with successful habits. – Brian Tracy"
  },
  {
    "_id": {
      "$oid": "6527fde73bc4769f6b04b3ab"
    },
    "text": "We are what we repeatedly do. Excellence then, is not an act, but a habit. – Aristotle"
  },
  {
    "_id": {
      "$oid": "6527fde73bc4769f6b04b3ac"
    },
    "text": "Watch your actions, they become your habits. Watch your habits, they become your character. – Vince Lombardi"
  },
  {
    "_id": {
      "$oid": "6527fde73bc4769f6b04b3ad"
    },
    "text": "The successful person makes a habit of doing what the failing person doesn’t like to do. – Thomas Edison"
  },
  {
    "_id": {
      "$oid": "6527fde73bc4769f6b04b3ae"
    },
    "text": "The hard must become habit. The habit must become easy. The easy must become beautiful. – Doug Henning"
  }
])
```

[x] instructions: 6 records
```json
db.collectionName.insertMany([
  {
    "_id": {
      "$oid": "6528d36f2af98e626d92c4d0"
    },
    "stage": "analyse",
    "day": 1,
    "text": "We all have enough will power to build or break one habit at a time.\n - List the 5 habits you want to break or build.\n - Keep track of them for one week starting from today.\n - Know the prime habit on Day 7 and start building it.\n"
  },
  {
    "_id": {
      "$oid": "6528d36f2af98e626d92c4d1"
    },
    "stage": "analyse",
    "day": 7,
    "text": "Here is the result:\n"
  },
  {
    "_id": {
      "$oid": "6528d36f2af98e626d92c4d2"
    },
    "stage": "build",
    "day": 1,
    "text": "Please use all the will power you have to build/break this prime habit.\n - Keep track of the prime habit starting from today.\n - You will be successful for building/breaking it for 21 days non-stop.\n - Celebrate for small win when you build/break it for a day.\n - Tolerate when you don't make it for a day.\n"
  },
  {
    "_id": {
      "$oid": "6528d36f2af98e626d92c4d3"
    },
    "stage": "build",
    "day": 7,
    "text": "Here is the result:\n"
  },
  {
    "_id": {
      "$oid": "6528d36f2af98e626d92c4d4"
    },
    "stage": "check",
    "day": 1,
    "text": "Please use all the will power you have to build/break this prime habit.\n - Keep track all of your habits again starting from today.\n - You will be successful for building/breaking the prime habit for 7 days non-stop.\n"
  },
  {
    "_id": {
      "$oid": "6528d36f2af98e626d92c4d5"
    },
    "stage": "check",
    "day": 7,
    "text": "Here is the result:\n"
  }
])
```

[x] habits: 5 records
```json
db.collectionName.insertMany([
  {
    "_id": {
      "$oid": "6527ff513bc4769f6b04b3b0"
    },
    "description": "Read a book for 20 minutes before bedtime",
    "type": "good",
    "results": []
  },
  {
    "_id": {
      "$oid": "6527ff513bc4769f6b04b3b2"
    },
    "description": "Avoid sugary snacks and drinks",
    "type": "good",
    "results": []
  },
  {
    "_id": {
      "$oid": "6527ff513bc4769f6b04b3b3"
    },
    "description": "Smoking cessation program",
    "type": "bad",
    "results": []
  },
  {
    "_id": {
      "$oid": "6527ff513bc4769f6b04b3b1"
    },
    "description": "Limit screen time to 2 hours per day",
    "type": "good",
    "results": []
  },
  {
    "_id": {
      "$oid": "6527ff513bc4769f6b04b3af"
    },
    "description": "Exercise for 30 minutes daily",
    "type": "good",
    "results": []
  }
])
```

[x] results: 35 records
```json
db.results.insertMany(
[{
  "_id": {
    "$oid": "6528dd8c3bc4769f6b04b3d7"
  },
  "result_date": {
    "$date": "2023-10-09T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b0",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd8c3bc4769f6b04b3d8"
  },
  "result_date": {
    "$date": "2023-10-10T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b0",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd8c3bc4769f6b04b3d9"
  },
  "result_date": {
    "$date": "2023-10-11T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b0",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd8c3bc4769f6b04b3da"
  },
  "result_date": {
    "$date": "2023-10-12T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b0",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd8c3bc4769f6b04b3db"
  },
  "result_date": {
    "$date": "2023-10-13T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b0",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd8c3bc4769f6b04b3dc"
  },
  "result_date": {
    "$date": "2023-10-14T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b0",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd8c3bc4769f6b04b3dd"
  },
  "result_date": {
    "$date": "2023-10-15T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b0",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd9f3bc4769f6b04b3de"
  },
  "result_date": {
    "$date": "2023-10-09T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b2",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd9f3bc4769f6b04b3df"
  },
  "result_date": {
    "$date": "2023-10-10T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b2",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd9f3bc4769f6b04b3e0"
  },
  "result_date": {
    "$date": "2023-10-11T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b2",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd9f3bc4769f6b04b3e1"
  },
  "result_date": {
    "$date": "2023-10-12T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b2",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd9f3bc4769f6b04b3e2"
  },
  "result_date": {
    "$date": "2023-10-13T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b2",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd9f3bc4769f6b04b3e3"
  },
  "result_date": {
    "$date": "2023-10-14T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b2",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dd9f3bc4769f6b04b3e4"
  },
  "result_date": {
    "$date": "2023-10-15T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b2",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddb93bc4769f6b04b3e5"
  },
  "result_date": {
    "$date": "2023-10-09T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b3",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddb93bc4769f6b04b3e6"
  },
  "result_date": {
    "$date": "2023-10-10T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b3",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddb93bc4769f6b04b3e7"
  },
  "result_date": {
    "$date": "2023-10-11T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b3",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddb93bc4769f6b04b3e8"
  },
  "result_date": {
    "$date": "2023-10-12T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b3",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddb93bc4769f6b04b3e9"
  },
  "result_date": {
    "$date": "2023-10-13T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b3",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddb93bc4769f6b04b3ea"
  },
  "result_date": {
    "$date": "2023-10-14T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b3",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddb93bc4769f6b04b3eb"
  },
  "result_date": {
    "$date": "2023-10-15T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b3",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddc93bc4769f6b04b3ec"
  },
  "result_date": {
    "$date": "2023-10-09T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b1",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddc93bc4769f6b04b3ed"
  },
  "result_date": {
    "$date": "2023-10-10T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b1",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddc93bc4769f6b04b3ee"
  },
  "result_date": {
    "$date": "2023-10-11T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b1",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddc93bc4769f6b04b3ef"
  },
  "result_date": {
    "$date": "2023-10-12T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b1",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddc93bc4769f6b04b3f0"
  },
  "result_date": {
    "$date": "2023-10-13T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b1",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddc93bc4769f6b04b3f1"
  },
  "result_date": {
    "$date": "2023-10-14T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b1",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528ddc93bc4769f6b04b3f2"
  },
  "result_date": {
    "$date": "2023-10-15T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3b1",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dddb3bc4769f6b04b3f3"
  },
  "result_date": {
    "$date": "2023-10-09T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3af",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dddb3bc4769f6b04b3f4"
  },
  "result_date": {
    "$date": "2023-10-10T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3af",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dddb3bc4769f6b04b3f5"
  },
  "result_date": {
    "$date": "2023-10-11T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3af",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dddb3bc4769f6b04b3f6"
  },
  "result_date": {
    "$date": "2023-10-12T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3af",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dddb3bc4769f6b04b3f7"
  },
  "result_date": {
    "$date": "2023-10-13T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3af",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dddb3bc4769f6b04b3f8"
  },
  "result_date": {
    "$date": "2023-10-14T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3af",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
},
{
  "_id": {
    "$oid": "6528dddb3bc4769f6b04b3f9"
  },
  "result_date": {
    "$date": "2023-10-15T00:00:00.000Z"
  },
  "complete": false,
  "stage": "analyse",
  "habit": "6527ff513bc4769f6b04b3af",
  "totalCompletions": 0,
  "totalDopamines": 0,
  "currentStreak": 0
}]
)
```

## API Routes
- Server: https://habittracker-be.onrender.com/

### Authentication

[] Register a New User
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

[] Login a User
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

[] Logout a User
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
[] Update a User
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
[] List all Habits
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

[] Create a New Habit
- **Route:** `POST /habits`
- **Description:** Create a new habit for the current user
- **Request Body:**
  ```json
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    ```

[] Update a Habit
- **Route:** `PUT /habits/{habitId}`
- **Description:** Update a habit
- **Request Body:**
  ```json
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    ```

[] Delete a Habit
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

[] Track a Habit
- **Route:** `POST /habits/{id}/track/`
- **Description:** Get a list of completion dates of a habit
- **Request Body:**
  ```json
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    ```
    
## Instruction
[] Get instruction quotes
- **Route:** `GET /instructions/`
- **Description:** Get an instruction for a given date
- **Request Body:**
  ```json
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    ```

## Quote
[] Get motivation quotes
- **Route:** `GET /quotes/`
- **Description:** Get a quote for a given date
- **Request Body:**
  ```json
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    ```

    
## Result
[] Get result
- **Route:** `GET /results/`
- **Description:** Get a result for a given date
- **Request Body:**
  ```json
  ```
- **Response:**
  - Status: 200 OK
  - Body:
    ```json
    ```
