# Getting Started

## Commands
npm install
npm start

## Environment
- Create a .env file similar to .env-sample to run in local
- Since this app needs Azure Communication Services Access Key, my personal keys are added in the GitHub Secrets and will be used by the Action to generate the .env file at every push to main branch

## Example Usage
http://localhost:3000/?meetingId=427723748645&displayName=Raghu%20Team%20Client%20User

## Parameters
- meetingId : this is a 12 digit number from an existing Teams Meeting. You can find it as Meeting ID
- diaplayName : this is any text describing the name of the attendee



## Issues 
- ### 06-01-2025: Device related unhandled error on load
    - Status: UNRESOLVED
    - A quick screen cast of the same is uploaded in the /doc folder https://github.com/loonyt00n/teams-meeting-client/raw/refs/heads/main/doc/Error%20-%20Teams%20Client%2006-01-2025.mp4
  