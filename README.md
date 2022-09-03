# Subscription service with Login
---
[![Twitter Follow](https://img.shields.io/twitter/follow/Harpalsingh_11?label=Follow)](https://twitter.com/intent/follow?screen_name=Harpalsingh_11)
[![Linkedin: Harpal Singh](https://img.shields.io/badge/-harpalsingh11-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/harpalsingh11)](https://www.linkedin.com/in/harpalsingh11/)
[![GitHub followers](https://img.shields.io/github/followers/hsk11?label=Follow&style=social)](https://github.com/hsk11)
---

## Features
    1. Can parse Input File With Comments*
    1. Create User
    1. Login User
    1. Get user
    1. Add Subscription
    1. Cancel Subscription
    1. Renew Subscription
    1. Free Trial
    1. TOP UP service

## INPUT Commands

```javascript
// CREATE USER
// USER CREATE "EMAIL" "PASSWORD"
USER CREATE harpal__singh__@email.com 1234567890

// LOGIN
// USER LOGIN "EMAIL" "PASSWORD"
USER LOGIN harpal__singh__@email.com 1234567890

// ADD SUBSCRIPTION 
//SUBSCRIPTION ADD "TYPE" "PLAN"
SUBSCRIPTION ADD MUSIC FREE

// CANCEL SUBSCRIPTION 
//SUBSCRIPTION CANCEL "TYPE" "PLAN"
SUBSCRIPTION CANCEL MUSIC FREE

// CANCEL SUBSCRIPTION 
//SUBSCRIPTION TOPUP "PLAN"
SUBSCRIPTION TOPUP ten_devices

// GET SUBSCRIPTION 
//SUBSCRIPTION GET "TYPE"
SUBSCRIPTION get music


// GET ALL SUBSCRIPTION 
//SUBSCRIPTION GETALL
SUBSCRIPTION GETALL

// GET Reminders for active subscription
SUBSCRIPTION reminders


// CLEAR SCREEN
CLEAR
```

### RUN PROJECT
```javascript
    npm run start
    // or
    node app.js INPUT_FILE_PATH

```

