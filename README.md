# Sort My entertainment

`Sort My entertainment` is a full-stack event booking application built with:

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, React Router
- Authentication: JWT access/refresh tokens, email verification, login/logout
- Booking flow: event listing, seat selection, reservation, booking confirmation

## Project Overview

The application allows users to:

- Browse upcoming events
- View event details and seat availability
- Register and log in
- Reserve available seats for an event
- Confirm reservations into bookings
- See live seat status changes (available, reserved, booked)

The backend serves REST APIs for auth, events, reservations, and bookings. The frontend consumes these APIs and provides an interactive seat map where users can reserve and book seats.

## Folder Structure

- `backend/`
  - `package.json` - backend dependencies and scripts
  - `src/`
    - `server.js` - entry point starts Express server and connects to MongoDB
    - `app.js` - configures middleware and route mounts
    - `config/db.js` - MongoDB connection logic
    - `models/` - Mongoose schemas for events, seats, users, reservations, bookings
    - `routes/` - Express routers for auth, events, reservations, bookings
    - `controllers/` - route handlers with business logic
    - `middleware/auth.middleware.js` - access token validation middleware
    - `utils/` - helpers for password hashing, token creation/verification, email delivery, reservation expiration

- `frontend/`
  - `package.json` - frontend dependencies and scripts
  - `src/`
    - `main.jsx` - app bootstrap
    - `App.jsx` - router and auth provider setup
    - `api/client.js` - API helper methods and auth token handling
    - `context/AuthContext.jsx` - authentication state, login/register/logout, refresh token flow
    - `pages/` - `HomePage` and `EventDetailPage`
    - `components/` - event cards, seat grid, booking panel, auth modal dialogs, layout, alerts, and shared UI

## Backend Details

### Key features

- JWT `accessToken` expires in 30 minutes
- JWT `refreshToken` stored in an HTTP-only cookie and valid for 7 days
- User registration includes email verification
- Password reset via token-based email link
- Reservation system holds seats for a limited time (10 minutes)
- Expired reservations automatically release reserved seats
- Booking converts an active reservation into a confirmed booking

### Data models

- `User`
  - `userName`, `email`, `hashedPass`
  - `isEmailVerified`, password reset token fields
- `Event`
  - `name`, `description`, `dateTime`, `venue`, `totalSeats`
- `Seat`
  - `eventId`, `seatNumber`, `row`, `status` (`available`, `reserved`, `booked`)
- `Reservation`
  - `userId`, `eventId`, `seatIds`, `seatNumbers`, `status`, `expiresAt`
- `Booking`
  - `userId`, `eventId`, `reservationId`, `seatIds`, `seatNumbers`, `totalSeats`, `bookedAt`

### API endpoints

#### Auth

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login user and return access token
- `POST /api/auth/refresh` - refresh access token using cookie refresh token
- `POST /api/auth/logout` - clear refresh cookie
- `GET /api/auth/verify-email?token=...` - verify user email
- `POST /api/auth/forgot-password` - request password reset email
- `POST /api/auth/reset-password` - set new password using reset token

#### Events

- `GET /api/events` - list all events
- `GET /api/events/:id` - get event details and seat availability

#### Reservations

- `POST /api/reserve` - create a reservation for selected seats (authenticated)

#### Bookings

- `POST /api/bookings` - confirm a reservation into a booking (authenticated)

## Frontend Details

### User flow

1. User visits the homepage and sees all upcoming events.
2. User clicks an event card to view event details and seat layout.
3. The seat grid displays seat rows and status:
   - available
   - reserved
   - booked
4. An authenticated user selects seats and clicks `Reserve seats`.
5. The app stores the reservation and starts a temporary hold.
6. The user confirms the reservation to finalize the booking.

### Pages

- `HomePage`
  - loads all events from backend
  - renders `EventList` and `EventCard`
- `EventDetailPage`
  - loads event and seat data
  - refreshes seat availability periodically
  - allows seat selection, reservation, and booking

### Authentication

- `AuthContext` keeps user session in `localStorage`
- `authApi.refresh()` attempts to refresh tokens on page load
- `LoginModal` and `RegisterModal` handle authentication forms
- Logged-in state displays user name and logout option in header

### API client

- `api/client.js` adds `Authorization: Bearer <token>` automatically
- sends requests with `credentials: include` to support refresh cookies

## Environment Setup

### Backend

Create a `.env` file in `backend/` with values like:

```env
SMTP_USER=youremail@example.com
SMTP_PASS=your-email-password
MONGO_URI=mongodb://localhost:27017/sortmyentertainment
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
APP_URL=http://localhost:5000
PORT=5000
```

### Frontend

The frontend uses Vite with default API base path `/api`. If your backend runs on a separate URL, set `VITE_API_URL` in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Run Locally

### Backend

```bash
cd sortmyentertainment/backend
npm install
npm run dev
```

### Frontend

```bash
cd sortmyentertainment/frontend
npm install
npm run dev
```

## Notes

- The backend uses `nodemailer` with Gmail SMTP for email verification and password reset.
- Reservations expire after 10 minutes and release seats back to available.
- The frontend uses React Router and a modal-based auth experience.
- No tests are included in the current codebase.

## Improvements

Potential next steps:

- add event creation/admin interface
- support user booking history
- improve mobile seat layout
- add pagination and search for events
- add unit/integration tests

---

Enjoy exploring the `Sort My entertainment` app and customizing it for a live event booking experience!
