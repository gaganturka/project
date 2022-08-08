
# Project Title

Backend Developer Mini Project



## Run Locally

Clone the project-
https://github.com/gaganturka/project.git


Go to the project directory-
https://github.com/gaganturka/project/tree/Wysa/assignment


Install dependencies - 
 npm i


Start the server
 npm start


## Sleep Model
{ nickName: {mandatory}, struggleTime: {mandatory, enum : ['Less than 2 weeks', '2 to 8 weeks', 'More than 8 weeks']}, bedTime: {mandatory}, wakeUpTime: {mandatory}, SleepHours : {mandatory}



## POST /functionup/interns

    Create a document for an user.
    
    Your request body contains the following fields - { nickName, struggleTime, bedTime, wakeUpTime, sleepHours}

    Return HTTP status 201 on a succesful document creation. Also return the status of ypur sleep.



## Lessons Learned

I realized that sleep is very important part of our life and if you feel any problem with your sleep then you should have to take consult like there are also many online platform like wysa sleep app

During project i faced problem in validate to time to solve that problem i used regex
