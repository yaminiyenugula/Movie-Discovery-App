# 🎬 Movie Discovery App

A full-stack Movie Discovery application built using **React.js, Node.js, Express.js, MongoDB, and the TMDB API**.

The application allows users to discover movies, search for movies, view detailed information, and maintain a persistent wishlist.

---

## 📌 Project Overview

The Movie Discovery App provides a responsive interface for discovering movies through different categories such as:

* Popular Movies
* Top Rated Movies
* Upcoming Movies
* Movie Search
* Movie Details
* Wishlist

The frontend communicates only with the **Node.js/Express backend**. The backend acts as an abstraction layer between the frontend and the external TMDB API.

The wishlist is stored in **MongoDB**, allowing saved movies to persist even after closing and reopening the application.

---

## ✨ Features

### Movie Discovery

* Browse popular movies
* Browse top-rated movies
* Browse upcoming movies
* Load more movies using pagination

### Search

* Search movies by title
* Debounced search to reduce unnecessary API requests
* Minimum two-character search validation
* Loading state while searching
* Empty search results handling
* Error handling

### Movie Details

* Movie poster
* Movie title
* Tagline
* Rating
* Release date
* Runtime
* Genres
* Movie overview

### Wishlist

* Add movies to wishlist
* Remove movies from wishlist
* Prevent duplicate wishlist entries
* Persistent wishlist using MongoDB
* Wishlist remains available after reopening the application

### User Experience

* Responsive design for desktop, tablet, and mobile
* Loading states
* Empty states
* Error handling
* Poster fallback when an image is unavailable
* Lazy loading for movie posters
* Long movie titles handled safely
* Navigation using React Router

### Performance

* Debounced movie search
* Backend API caching
* Pagination / Load More
* Backend abstraction to protect the TMDB API key
* Reduced unnecessary repeated API requests

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* React Router DOM
* Axios
* Context API
* Vite

### Backend

* Node.js
* Express.js
* Axios
* CORS
* dotenv
* Nodemon

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### External API

* TMDB API

---

## 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │                     │
                    │  Home               │
                    │  Search             │
                    │  Movie Details      │
                    │  Wishlist            │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │ Node.js + Express   │
                    │      Backend        │
                    │                     │
                    │ Movie Routes        │
                    │ Wishlist Routes     │
                    │ Controllers         │
                    │ Services            │
                    │ Cache               │
                    └───────┬───────┬─────┘
                            │       │
                    TMDB API│       │MongoDB
                            │       │
                            ▼       ▼
                     ┌─────────┐ ┌─────────┐
                     │  TMDB   │ │ MongoDB │
                     │   API   │ │ Wishlist│
                     └─────────┘ └─────────┘
```

### Request Flow

For movie data:

```text
React
  ↓
Node.js / Express
  ↓
TMDB API
  ↓
Node.js / Express
  ↓
React
```

For wishlist data:

```text
React
  ↓
Node.js / Express
  ↓
MongoDB
  ↓
Node.js / Express
  ↓
React
```

The frontend does **not directly call the TMDB API**.

---

## 📂 Project Structure

```text
movie-discovery-app/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── Loader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   ├── context/
│   │   │   └── WishlistContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── movieController.js
│   │   └── wishlistController.js
│   │
│   ├── models/
│   │   └── Wishlist.js
│   │
│   ├── routes/
│   │   ├── movieRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   ├── services/
│   │   ├── tmdbService.js
│   │   └── cache.js
│   │
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* MongoDB Atlas account
* TMDB API key
* Git

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd movie-discovery-app
```

---

## 🔧 Backend Setup

Go to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
MONGODB_URI=your_mongodb_connection_string
```

Replace:

```text
your_tmdb_api_key
```

with your TMDB API key.

Replace:

```text
your_mongodb_connection_string
```

with your MongoDB Atlas connection string.

### Start the backend

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal.

Go to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Server `.env`

```env
PORT=5000
TMDB_API_KEY=your_tmdb_api_key
MONGODB_URI=your_mongodb_connection_string
```

### Client `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### Important

Environment files containing secrets should **not be committed to GitHub**.

The project uses `.gitignore` to prevent `.env` files from being uploaded.

Example environment files are provided:

```text
server/.env.example
client/.env.example
```

---

## 🌐 API Endpoints

### Movie APIs

| Method | Endpoint                          | Description          |
| ------ | --------------------------------- | -------------------- |
| GET    | `/api/movies/popular`             | Get popular movies   |
| GET    | `/api/movies/top-rated`           | Get top-rated movies |
| GET    | `/api/movies/upcoming`            | Get upcoming movies  |
| GET    | `/api/movies/search?query=batman` | Search movies        |
| GET    | `/api/movies/:id`                 | Get movie details    |

### Wishlist APIs

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/api/wishlist`          | Get wishlist               |
| POST   | `/api/wishlist`          | Add movie to wishlist      |
| DELETE | `/api/wishlist/:movieId` | Remove movie from wishlist |

---

## 🗄️ Database Schema

The application uses MongoDB with Mongoose.

### Wishlist Schema

```text
Wishlist
│
├── movieId
│   └── Number
│
├── title
│   └── String
│
├── posterPath
│   └── String
│
├── releaseDate
│   └── String
│
├── rating
│   └── Number
│
├── createdAt
│   └── Date
│
└── updatedAt
    └── Date
```

The `movieId` field is unique to prevent duplicate wishlist entries.

---

## ⚡ Performance & Request Handling

The application was designed to handle repeated requests, rapid searches, slow responses, and external API limitations.

### Debounced Search

Search requests are delayed briefly after the user stops typing.

This prevents a request from being sent for every individual keystroke.

For example:

```text
User types:

B
Ba
Bat
Batm
Batman

Instead of sending 6 API requests,
the application waits and sends the search request after typing stops.
```

### API Caching

A simple in-memory cache is implemented on the backend.

Cached responses are reused for a limited period to reduce repeated requests to TMDB.

```text
First request
     ↓
Backend
     ↓
TMDB API
     ↓
Store response in cache
     ↓
Return response


Repeated request
     ↓
Backend
     ↓
Check cache
     ↓
Return cached response
```

### Pagination

Movie results are loaded page by page instead of requesting a very large number of movies at once.

The **Load More** functionality allows users to request additional results.

---

## 🛡️ Error & Empty State Handling

The application handles common failure cases such as:

* Empty search
* Search query shorter than two characters
* No search results
* Movie poster unavailable
* Movie data unavailable
* Backend request failure
* TMDB API failure
* MongoDB connection failure
* Slow API responses

The UI displays appropriate loading, empty, and error states instead of leaving the user with a blank screen.

---

## 📱 Responsive Design

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The movie grid adapts based on screen width.

Movie cards also handle:

* Different poster sizes
* Missing posters
* Long movie titles
* Different screen dimensions

---

## 🔐 Security Considerations

The TMDB API key is stored on the backend using environment variables.

The frontend does not directly access the TMDB API key.

```text
Frontend
   ↓
Backend
   ↓
TMDB API + API Key
```

This keeps the API key outside the client-side application code.

---

## 🧠 Technical Decisions

### Why React?

React was selected because it provides:

* Component-based development
* Reusable UI components
* Efficient state management
* Easy integration with REST APIs

### Why Node.js + Express?

Node.js and Express provide a lightweight backend layer for:

* API abstraction
* Request handling
* Error handling
* TMDB integration
* Wishlist APIs

### Why MongoDB?

MongoDB was selected because the wishlist data is simple and document-oriented.

It also provides persistent storage instead of relying only on browser local storage.

### Why Context API?

The Wishlist Context allows wishlist state and operations to be shared between components without passing props through multiple levels.

### Why Axios?

Axios provides a simple way to make HTTP requests from both the frontend and backend.

---

## 📋 Assumptions

* The application uses TMDB as the external movie data provider.
* A user does not need to create an account to use the application.
* Wishlist functionality is implemented without user authentication.
* Movie information depends on the data returned by TMDB.
* Internet access is required for retrieving movie information.

---

## ⚠️ Limitations

* User authentication is not currently implemented.
* The wishlist is not associated with individual user accounts.
* Backend caching is in-memory, so cached data is lost when the server restarts.
* TMDB API availability and rate limits can affect movie discovery.
* The application depends on an external movie API for movie information.
* The application is currently configured for local development.

---

## 🤖 AI Usage

AI tools were used during development as a development assistant for:

* Understanding technical requirements
* Generating initial code structures
* Debugging errors
* Improving component structure
* Reviewing API integration
* Improving error handling
* Creating documentation

The generated code was reviewed, tested, modified, and integrated manually.

I also verified the application behavior locally and made changes based on the actual project requirements.

AI was used as an assistance tool rather than as a replacement for understanding the implementation.

---

## 🔮 Future Improvements

The following features could be added in future versions:

* User authentication
* User-specific wishlists
* Advanced movie filtering
* Genre-based browsing
* Sorting options
* Infinite scrolling
* More advanced caching
* Redis-based caching
* API retry and rate-limit handling
* Automated tests
* Backend API documentation
* Production deployment
* Improved accessibility
* Progressive Web App support

---

## 🧪 Testing Checklist

Before submitting the project, verify:

### Movie Discovery

* [ ] Popular movies load correctly
* [ ] Top-rated movies load correctly
* [ ] Upcoming movies load correctly
* [ ] Load More works correctly

### Search

* [ ] Search works with valid queries
* [ ] Search waits before sending requests
* [ ] Short queries show validation
* [ ] Empty results are handled
* [ ] Search errors are displayed

### Movie Details

* [ ] Movie details load correctly
* [ ] Poster displays correctly
* [ ] Missing poster shows fallback
* [ ] Back navigation works

### Wishlist

* [ ] Movie can be added
* [ ] Duplicate movie cannot be added
* [ ] Movie can be removed
* [ ] Wishlist persists after restarting the application

### Responsive UI

* [ ] Desktop layout works
* [ ] Tablet layout works
* [ ] Mobile layout works
* [ ] Long movie titles do not break the layout

### Backend

* [ ] Node.js server starts successfully
* [ ] MongoDB connects successfully
* [ ] TMDB API works
* [ ] API errors are handled
* [ ] Environment variables are configured correctly

---

## 📦 Git & Submission

Before pushing the project to GitHub, verify that sensitive files are not included.

Run:

```bash
git status
```

Make sure the following are **not** committed:

```text
.env
node_modules/
dist/
```

Then:

```bash
git add .
git commit -m "Build full-stack movie discovery app"
git push
```

---

## 👩‍💻 Developer

**Yamini Yenugula**

Full Stack Developer

Skills include:

* Java
* Spring Boot
* JavaScript
* React.js
* Python
* Django
* SQL
* Node.js
* MongoDB
* Flutter
* Dart
* REST APIs
* Git

---

## 📄 License

This project was created as a technical assignment/project demonstration.

Movie data and images are provided through the TMDB API.
