# Spa Menu Studio

Spa Menu Studio is a service menu management app designed for spa managers, estheticians, and wellness business owners who need a simple way to keep their service offerings organized, updated, and easy to manage.

The app allows users to view current spa services, add new services, update service details, and remove services that are no longer offered. It supports the type of real workflow a spa may need when adding seasonal treatments, changing pricing, updating categories, or cleaning up an outdated menu.

---

## Purpose

Spa businesses often manage service menus across notes, price sheets, booking systems, and separate documents. Spa Menu Studio helps bring that workflow into one clean application so services can be reviewed and updated more easily.

This app helps spa managers:

* View current spa services
* Add new treatments to the menu
* Update service names, categories, and prices
* Remove outdated or unavailable services
* Keep the service menu clean and organized

---

## Features

* View all spa services
* Add a new spa service
* Edit an existing spa service
* Delete a spa service
* Organized service cards
* Service categories and pricing
* Responsive web interface
* API-connected data
* MongoDB database storage

---

## Tech Stack

This project uses the MERN stack:

* **MongoDB** — database for storing spa services
* **Express** — backend API framework
* **React** — web front end
* **Node.js** — server runtime

Additional tools:

* **Vite** — React development environment
* **Axios** — API requests
* **React Router** — page navigation
* **Render** — API hosting
* **MongoDB Atlas** — cloud database hosting
* **Expo / React Native** — mobile application client

---

## API

The app connects to a deployed Express API.

```js
https://spa-service-menu-manager-api.onrender.com/api/services
```

The API supports full CRUD functionality:

```txt
GET     /api/services
POST    /api/services
PATCH   /api/services/:id
DELETE  /api/services/:id
```

---

## Project Structure

```txt
spa-service-menu-manager/
├── client/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── mobile/
│   ├── app/
│   ├── package.json
│   └── app.json
│
├── models/
├── routes/
├── server.js
├── package.json
└── README.md
```

---

## Running the Web App Locally

From the main project folder, move into the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the localhost link shown in the terminal.

---

## Running the Mobile App Locally

From the main project folder, move into the mobile folder:

```bash
cd mobile
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Then choose one of the Expo options to open the app.

---

## Mobile App Goal

The mobile application will extend the existing MERN project by giving users a native-style client for managing spa services.

The mobile app will allow users to:

* View services
* Add services
* Update services
* Delete services

This creates a connected workflow between the web app, mobile app, Express API, and MongoDB database.

---

## Notes

Sensitive files and folders should not be committed to GitHub.

Do not commit:

* `node_modules`
* `.env`
* Live API keys
* Database connection strings

This project is built for a full-stack CRUD workflow using a web client, a mobile client, a RESTful API, and a MongoDB database.
