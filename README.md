# Tasks

Your To-do list

## Project Overview

This Full-stack project's goal is to create a responsive and user-friendly application where tasks can be created , updated , deleted and viewed in real time. It's a Dynamic application which uses Socket.IO for instant Task Updates. It also contains a visual representation of tasks using charts providing insights into task data.

## Installation and Setup

## 1. Clone the Front-end repository

- git clone <https://github.com/vinayak-gcc/internship-task.git>
- cd internship-task
- use npm install and install the necessary dependencies.
- it will run on <http://localhost:3000/>

## 2. Clone the Back-end repository

- Create a separate Back-end folder
- git clone <https://github.com/vinayak-gcc/internship-task-backend.git>
- cd Back-end
- it will run on <http://localhost:3003/>

## 3. Connecting the Front-end and Back-end

- In the Front-end folder , Go to the Components folder , then Tasks.js and on line 6 , Insert your Deployed Backend URL here or use the default URL <http://localhost:3003/> and connect it with socket.IO

## 4. Running the Application

- Now run the Front-end using npm start and Back-end using node server.js
- Access the Front-end on <http://localhost:3000/>
- Access the Back-end on <http://localhost:3003/>

## Features

Full-stack feature where tasks can be created, updated, and viewed in real-time.

- create button for creating tasks
- update , complete and delete buttons for updating ,completing and deleting tasks.

Dynamic Updates using Socket.IO

- WebSocket endpoints for real-time task broadcasting.
- WebSocket events and updating the task list dynamically.

Visual representation of Tasks using Charts

- A pie chart showing the distribution of completed vs. pending tasks
- A bar chart showing the number of tasks assigned to each user  
- A line-chart to show the updates or creation of tasks  

## Deployment Details

- Front-end - <https://internship-task-omega.vercel.app/>  
- Back-end - <https://internship-task-backend-mfy7.onrender.com>
