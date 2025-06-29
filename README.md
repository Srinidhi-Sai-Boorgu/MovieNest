# MovieNest — Movie Retail Platform

**MovieNest** is a full-stack movie retail web application where users can browse, filter, and purchase movies, while administrators manage the product catalog and view platform analytics. The project was built using the MERN stack with modern authentication and role-based access control.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth
- **API & Data Handling:** RESTful API design, Axios

## Features

### User-Side
- Browse movies and filter by genre.
- Add movies to cart, checkout, and enter delivery address.
- View past orders and manage current cart.
- Google Sign-In and email/password authentication via Firebase.
- Persistent cart and user data using Redux.

### Admin-Side
- Add, update, or delete movie listings.
- View simple stats (number of trending movies, total orders).
- Role-based protection for admin routes and actions.


## Environment Setup

### Frontend Configuration

In the `frontend/` directory, create a file named `.env.local` with your Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend Configuration

In the `backend/` directory, create a file named `.env` with your MongoDB URI and JWT secret:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Note: Make sure to populate the movies collection in your MongoDB database using the schema in `backend/src/movies/movie.model.js`


## Running the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Srinidhi-Sai-Boorgu/MovieNest
   ```

2. **Install dependencies:**
   - **Frontend:**
     ```bash
     cd frontend
     npm install
     ```
   - **Backend:**
     ```bash
     cd ../backend
     npm install
     ```

3. **Set up environment files:**
   - Populate `.env.local` in `frontend/`
   - Populate `.env` in `backend/`

4. **Start development servers:**
   - **Frontend:**
     ```bash
     cd frontend
     npm run dev
     ```
   - **Backend:**
     ```bash
     cd ../backend
     npm start
     ```

5. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
