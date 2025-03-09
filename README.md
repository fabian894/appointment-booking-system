# appointment-booking-system
The system will allow  users to book available time slots while providing an admin panel for managing and viewing all  reservations. The booking system must prevent scheduling conflicts, ensuring that no two users can  book the same time slot. The interface should be intuitive and user-friendly for both users and administrators. 

**SETUP INSTRUCTIONS**

 **clear instructions on how to set up and run the API locally for the backend, along with any dependencies or configurations needed**
• Install the following dependencies for node.js
npm init -y
npm install express mysql2 dotenv cors body-parser
npm install bcryptjs jsonwebtoken express-validator
npm install moment
npm install validator

**Technologies used**
Backend - node.js
Frontend - Angular.js
Database - MySQL
other tools - PrimeNG

**For the frontend (angular)**
npm install

• Run he following command
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"   **(optional since i have pasted the random character for the JWT_SECRET below)**
node migrations/migrateUser.js

• Create a file in the root/directory of the project and name it .env (github do not permit configuration files containing vital information **##please ignore if the .env file is there when you pull the project**)
## paste the below code inside the .env file
DB_HOST=localhost
DB_USER=root
DB_PASS=###### **(replace with your mysql passsword)**
DB_NAME=booking_system
PORT=5000
JWT_SECRET=e8941220793ef43bf6b5d83f56cd4f47ca4e0790b61a2174cc6663aa194b23da7bb61d9ef8fb15da56ef477d37578012e11376f0a31c36a1cb46eeff23205385

## Run the backend project using
node server.js

## Run the backend project using
ng serve

## Database Dump Script
i have attached my database script. Open and paste it on your sql workbench, and execute it. It will create the tables 


note: i have attached the API documentation on the repository containing all the endpoints created **(file name: appointment booking system api endpoint documentation.postman_collection)**. Kindly open it on postman and run/test the each endpoints provided on it.

Thank you. 

**Application Workflow**

**Register** - Fill in all the credentials
Login either as admin or user, depending on what you selected upon registration.
If Selected User you will be route to the booking page where you book for an appointment
If admin you will be route to the admin dashboard and view all registered users, all booked appointments, create user if necessary

## please note that you must be a registered member to be able to book an appointment as a user or access the booking and user records as admin as this is role-based and you will be authenticated upon login

**Justification for chosen approach **

I chose **Node.js** for the backend and **Angular** for the frontend in the **Booking Appointment** project because of their efficiency, scalability, and real-time capabilities.  

- **Node.js (Backend)**:  
  - Handles asynchronous operations efficiently, making it ideal for real-time booking systems.  
  - Uses **Express.js**, which is lightweight and fast for API development.  
  - Works well with databases like MongoDB or MySQL for storing appointment data.  
  - Supports WebSockets for instant booking updates.  

- **Angular (Frontend)**:  
  - Provides a structured, component-based UI for a smooth user experience.  
  - Built-in **two-way data binding** ensures real-time updates.  
  - Offers **dependency injection** for better maintainability.  
  - Works seamlessly with APIs for dynamic booking management.
 
  Conflict-Handling Logic in the Book Appointment Project
In the Book Appointment project, conflicts arise when multiple users try to book the same time slot. To handle this, i use the following logic:

**Backend Validation (Node.js + Express.js):**

Before confirming a booking, we check the database to see if the slot is already taken.
If unavailable, the user gets an error message; otherwise, the booking is saved.
This ensures no double-booking.
I made sure the user interface calender is presented as a calendar view of one month, allowing users to select available time slots easily based on the date selected.

**Frontend Handling (Angular):**
The booking form disables unavailable slots in real-time using API calls.
Angular’s Reactive Forms provide instant feedback if a user selects a taken slot.
**New Angular Way of Creating a Standalone Project**
Since Angular 14+, projects no longer require app.module.ts. Instead, Angular now supports standalone components. 

**Screenshots**
i have also attached screenshots as requested which showcases the pages
