# Full Stack Country Information Application
This is a development challenge from DevelopsToday developed with Next.js (for the frontend), Express (for the backend), and TypeScript. The application allows users to view country information such as population and neighboring countries, using external APIs.

Features
List Available Countries: Endpoint to list available countries.
Country Info: Detailed information about a specific country including borders, population, and flag.
Prerequisites
Node.js (v18 or higher)
npm or yarn
## Installation
1. Clone the Repository and change directory
```
git clone https://github.com/marcelo-ferreira8/country-info-app.git
cd country-info-app
```
2. Install Backend Dependencies
```
cd backend
npm install
```
3. Install Frontend Dependencies
```
cd frontend
npm install --legacy-peer-deps
```
- Used '--legacy-peer-deps' beacuse next.js 15 has a few problems with Chart.js

4. Environment Variables
Create a .env file in the backend directory for storing your environment variables, like so:
```
PORT=
NAGER_API_URL=
COUNTRIES_NOW_API_URL=
```
- Check .env.example in case of doubts.


5. Run Backend Server
```
npm run dev
```
The backend will be available at http://localhost:3001.

6. Run Frontend Server
```
npm run dev
```
The frontend will be available at http://localhost:3000.

7. Verify the Application
Open your browser and navigate to http://localhost:3000 to view the application.
The main page will list available countries, and when clicking on a country, it will display detailed information, including the country’s flag, borders, and population chart.

## API Endpoints
1. Get Available Countries
Endpoint: GET /api/getAvailableCountries
Description: Returns a list of available countries.
2. Get Country Info
Endpoint: GET /api/getCountryInfo/:code
Description: Fetches detailed information about a specific country, including borders, population, and flag.

## Troubleshooting
CORS Issues: Make sure the backend has CORS enabled, especially if the frontend and backend are on different ports.
Install cors in the backend:
npm install cors
Then, configure it in index.ts:
import cors from "cors";
app.use(cors());
Missing Dependencies: If you encounter issues with missing dependencies, run npm install in both the backend and frontend directories.