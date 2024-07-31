SENIOR DESIGN RISING SERVER 
This project is a website that will store previous and future UCF Computer Science Senior Design projects.


PROJECT DESCRIPTION 
This web-application allows users to look through previous senior design projects. They can download pdfs documents about the projects. All users will have the ability to look up certain projects using keywords and filters. However, to be able to upload, edit, and delete projects, the user must have UCF credentials and sign in. This project is implemented using a MERN stack with the database being MySQL and not MongoDB. 


DEPLOYMENT
Requirements: Node, npm, MySQL, pm2

Backend
cd backend -> npm install -> pm2 start server.js

Frontend
cd frontend -> npm install -> npm run build


API
The documentation for the endpoints is stored in SR Design Local.postman_collection.json
TO utilize it, import it into Postman by pressing import in an empty workspace.


ENV - This is what the ENV format looks like
HOST=localhost
USER=server
PASSWORD=password
NODE_ENV=production
SECRET=anystring


FILES
The files on the deployed server are stored in two places: frontend/build and frontend/public
The persistent files are stored in public where as the static files deleted upon rebuild are in in build.


TEAM
Ryan Latour
Sophia Georgieva
Brandon Lora
George Minor
Calvin Brosch


CONTACT
For future inquiries or questions email Ryan at: ry595376@ucf.edu
He will be a UCF student until December of 2024.