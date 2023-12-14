Title: OfficeBooks booking system

Goal - To be able to create a simple booking system with the following deliverables:
• Users could check availability and perform booking.
• Code using a git repository. Make frequent meaningful commits.
• Provide provisioning scripts to setup on local virtual box or docker image.
• Demonstrate engineering practices used to develop the app. Eg. TDD, CI/CD.


Design process: (cause I forgot to git commit)
- Started with a simple 3 part wireframe consisting of 'login page, forget password pages, and booking page', and created it in html, css and js to simulate experience. Hosted it using live server
- Included calendar within script.js. Code was taken from online and edited to my purpose
- Created rooms options and timeslot generator

- Created an ERD diagram to identify and creation of database
- Converted booking.html and index.html to ejs as pages have to be unique to identify individual users and their bookings within views
- Created relevant folders for better routing and data management, and also event triggers that interacts and gets data from the database
- Created docker compose for dev, prod and testing stages, but for simpler implementation and time constraint, did not set it up properly. 
- At this point, this version for docker runs on ECS with a single task definition 

- Created a confirmation box for better user experience and to slow down requests per click
- Currently it works on docker compose but I'm having trouble with the env file

To implement this:
- Create a new ENV file and fill it up with your relevant data:
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=
POSTGRES_DB_NAME=

- run the following command (docker compose -f docker-compose.yml build)
- then (docker run -p 6565:3000)
- open up your web and look at localhost:6565

Directories:
- controllers - data flow management
- models - business logic
- public - css and initial js script for calendar and event triggers for views
- views - client view management
- routes - site URL management
- db - database connectivity and class management

To improve on / not implemented due to time constraint:
- Authentication of users - cognito implementation?
- To understand how AWS / terraform reads docker images and setup the database, backend and accordingly.
- To understand design process and work using directories, express and js from the start without html
- Not test within school as it has a firewall instead of taking a week to troubleshoot
