ADA Compliance Checker
The ADA Compliance Checker is a web application designed to analyze HTML code for accessibility compliance, based on standards such as WCAG and ADA. It features a React frontend for user interaction and a Node.js backend for processing HTML and checking for accessibility issues using tools like axe-core and language-tags.
The project is structured as a monorepo with two workspaces:

client: The React frontend, built with Vite.
server: The Node.js backend, built with Express.

Prerequisites
Before setting up and running the application, ensure you have the following installed:

Node.js: Version 18 or higher (recommended). Download from nodejs.org.
npm: Included with Node.js, used for package management.
Git: For cloning the repository (if hosted on a git platform).
A modern web browser (e.g., Chrome, Firefox) for accessing the frontend.

Installation
Follow these steps to set up the project on your local machine:

Clone the Repository (if applicable):
git clone <repository-url>
cd ada-compliance-checker

Replace <repository-url> with the URL of the git repository hosting the project. If you’re working with a local copy, skip this step.

Install Dependencies:The project uses a monorepo structure, so dependencies for both client and server are installed from the root directory.
npm install

This command installs dependencies listed in the root package.json (axe-core, body-parser, jsdom, language-tags, concurrently) and triggers installation for the client and server workspaces.


Running the Application
The application consists of a backend server and a frontend client. You can run both simultaneously in development mode or start them individually.
Option 1: Run Both Client and Server (Development Mode)
To run both the frontend and backend concurrently in development mode:

From the root directory (ada-compliance-checker):npm run dev


This uses concurrently to run:
The client (npm run dev --prefix client), which starts the Vite development server (typically at http://localhost:5173).
The server (npm run dev --prefix server), which starts the Express server with nodemon (typically at http://localhost:3000).


Open your browser and navigate to http://localhost:5173 to access the frontend.
The frontend will communicate with the backend at http://localhost:3000/adacompliance for accessibility checks.

Option 2: Run Client and Server Separately
If you prefer to start the client and server in separate terminal sessions:
Backend Server

Open a terminal and navigate to the server directory:cd server


Start the server in development mode (with nodemon for auto-restart on changes):npm run dev

Alternatively, start the server in production mode:npm start


The server will run on http://localhost:3000 (default port for Express).

Frontend Client

Open a new terminal and navigate to the client directory:cd client


Start the Vite development server:npm run dev


Open your browser and navigate to http://localhost:5173 (default Vite port).

Building for Production
To build the frontend for production (e.g., to generate static files):

Navigate to the root directory:
cd ada-compliance-checker


Run the build script:
npm run build

This executes vite build in the client directory, generating optimized files in client/dist.

To serve the built frontend, you’ll need a static file server or to configure the backend to serve these files (not covered in the provided package.json).

To start the backend in production mode:
npm start

This runs node src/index.js in the server directory.


Directory Structure

client/: React frontend built with Vite.
src/App.jsx: Main React component with a textarea for HTML input and display areas for input and accessibility issues.
Uses axios to communicate with the backend.


server/: Node.js backend built with Express.
src/index.js: Entry point for the server, likely handling the /adacompliance endpoint.
Uses axe-core for accessibility checks and jsdom for DOM parsing.


package.json (root): Defines monorepo workspaces and scripts to run both client and server.

Testing
To run tests for both client and server:
npm test

This executes the test script in both workspaces. Note: The provided package.json files do not define specific test scripts for client or server, so you may need to add testing frameworks (e.g., Jest, Vitest) if testing is required.
Troubleshooting

Port Conflicts:
If http://localhost:5173 or http://localhost:3000 is in use, check for other running processes and terminate them or configure different ports in client/vite.config.js or server/src/index.js.


CORS Issues:
The server includes the cors package, which should allow cross-origin requests from the frontend. Ensure the backend is configured to allow requests from http://localhost:5173.


Dependency Errors:
If npm install fails, ensure you have Node.js 18+ and try deleting node_modules and package-lock.json, then run npm install again.


Backend Errors:
If the /adacompliance endpoint fails, verify that src/index.js in the server directory is correctly set up to handle POST requests with body-parser and jsdom.



Next Steps

Add test scripts to client and server package.json files for automated testing.
Configure the backend to serve the built frontend files for production deployment.
Enhance the frontend UI with additional styling or accessibility features.
Document the /adacompliance endpoint’s expected input and output formats.

For further assistance, contact the project author or refer to the documentation for dependencies like axe-core and language-tags.