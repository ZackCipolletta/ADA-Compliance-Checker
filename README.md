ADA Compliance Checker
The ADA Compliance Checker is a web application designed to analyze HTML code for accessibility compliance, based on standards such as WCAG and ADA. It features a React frontend for user interaction and a Node.js backend for processing HTML. The backend uses jsdom to parse HTML and applies custom accessibility checks to validate heading structure, language attributes, page titles, color contrast, image alt text, and link text specificity. The frontend displays the input HTML and any identified issues side by side.
The project is structured as a monorepo with two workspaces:

frontend: The React frontend, built with Vite, where users input HTML and view accessibility issues.
backend: The Node.js backend, built with Express, which processes HTML input via the /adacompliance endpoint and returns accessibility compliance results.

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

Install Dependencies:The project uses a monorepo structure, so dependencies for both frontend and backend are installed from the root directory.
npm install

This command installs dependencies listed in the root package.json (jsdom, language-tags, body-parser) and triggers installation for the frontend (react, react-dom, axios) and backend (express, body-parser, jsdom, cors) workspaces. 


Running the Application
The application consists of a backend server and a frontend client. You can run both simultaneously in development mode or start them individually.
Option 1: Run Both Frontend and Backend (Development Mode)
To run both the frontend and backend concurrently in development mode:

From the root directory (ada-compliance-checker):npm run dev


This uses concurrently to run:
The frontend (npm run dev --prefix frontend), which starts the Vite development server (typically at http://localhost:5173).
The backend (npm run dev --prefix backend), which starts the Express server with nodemon (typically at http://localhost:3000).


Open your browser and navigate to http://localhost:5173 to access the frontend.
The frontend sends HTML input to the backend at http://localhost:3000/adacompliance for accessibility checks.

Option 2: Run Frontend and Backend Separately
If you prefer to start the frontend and backend in separate terminal sessions:
Backend Server

Open a terminal and navigate to the backend directory:cd backend


Start the server in development mode (with nodemon for auto-restart on changes):npm run dev

Alternatively, start the server in production mode:npm start


The server will run on http://localhost:3000 (default port, configurable via PORT environment variable).

Frontend Client

Open a new terminal and navigate to the frontend directory:cd frontend


Start the Vite development server:npm run dev


Open your browser and navigate to http://localhost:5173 (default Vite port).

Building for Production
To build the frontend for production (e.g., to generate static files):

Navigate to the root directory:
cd ada-compliance-checker


Run the build script:
npm run build

This executes vite build in the frontend directory, generating optimized files in frontend/dist.

To serve the built frontend, you’ll need a static file server or to configure the backend to serve these files (not covered in the provided package.json).

To start the backend in production mode:
npm start

This runs node src/index.js in the backend directory.


Directory Structure

frontend/: React frontend built with Vite.
src/App.jsx: Main React component with a textarea for HTML input, displaying the input and accessibility issues side by side.
src/App.css: Styles for the frontend, including a flexbox layout for side-by-side display.
Uses axios to send HTML to the backend’s /adacompliance endpoint.


backend/: Node.js backend built with Express.
src/index.js: Entry point for the server, handling POST requests to /adacompliance by parsing HTML with jsdom and running custom accessibility checks.
src/rules/: Contains custom accessibility check functions:
generalStructure/checkLanguage.js: Validates the lang attribute on the <html> element.
generalStructure/checkTitle.js: Checks for a valid <title> element.
generalStructure/colorContrast.js: Validates color contrast for accessibility.
images.js: Checks for missing or invalid alt text on images.
links.js: Validates link text to avoid generic phrases (e.g., "click here").
headings.js: Ensures proper heading structure (e.g., single <h1>, no skipped levels).




package.json (root): Defines monorepo workspaces (frontend, backend) and scripts to run both.

API Endpoint
The backend exposes a single endpoint for accessibility checks:

POST /adacompliance:
Request Body: JSON object with an html property containing the HTML string to analyze (e.g., { "html": "<html lang='en'><h1>Test</h1></html>" }).
Response: Array of issues (or empty array if none found). Each issue is an object with:
issue: Description of the issue (e.g., "Missing or empty 'lang' attribute").
element: HTML element involved (e.g., <html>).
details: Detailed explanation (e.g., "The  element must have a valid, non-empty lang attribute.").
rule: Rule identifier (e.g., DOC_LANG_MISSING).
If an error occurs, returns [{ error: "Internal server error" }] or [{ error: "No HTML provided" }].


Status Codes:
200: Successful response with array of issues.
400: No HTML provided in request body.
500: Internal server error (e.g., parsing failure).


Port Conflicts:
If http://localhost:5173 or http://localhost:3000 is in use, check for other running processes (lsof -i :5173 or lsof -i :3000 on Unix-based systems, or netstat -a -o on Windows) and terminate them, or configure different ports in frontend/vite.config.js or backend/src/index.js (e.g., set PORT=3001 for the backend).


CORS Issues:
The backend uses the cors package to allow cross-origin requests from http://localhost:5173. If CORS errors occur, verify that backend/src/index.js includes app.use(cors()) and allows requests from the frontend’s origin.


Dependency Errors:
If npm install fails, ensure Node.js 18+ is installed. Try deleting node_modules and package-lock.json, then run npm install again.


Workspace Errors:
If ENOENT errors occur for frontend/package.json or backend/package.json, ensure the workspaces field in the root package.json is set to ["frontend", "backend"]. The provided root package.json should resolve this.


Backend Errors:
If the /adacompliance endpoint returns a 500 error, check the server logs for details (console.error in backend/src/index.js). Common causes include invalid HTML input or issues with jsdom parsing.
Ensure all rule files (checkLanguage.js, checkTitle.js, etc.) exist in backend/src/rules/ and export valid functions.


Frontend Errors:
If the frontend fails to display results, verify that axios requests to http://localhost:3000/adacompliance are successful. Check the browser’s console and network tab for errors.



Next Steps

Enhance accessibility checks by adding more custom validation functions (e.g., for ARIA attributes or form labels).

Improve the frontend UI with additional styling or accessibility features (e.g., keyboard navigation, screen reader support).


For further assistance, contact the project author or refer to the documentation for dependencies like jsdom and language-tags.