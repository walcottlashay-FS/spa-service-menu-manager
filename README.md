# Spa Service Menu Manager

Spa Service Menu Manager is a full-stack CRUD application built to manage spa services, categories, and pricing. The project includes a backend API, a web client, and a React Native mobile app built with Expo.

This project was created as a real-world spa menu management tool. A spa manager can view current services, add new services, update existing service details, and remove outdated services from the menu.

## Project Features

* View all spa services
* Add a new spa service
* Edit an existing spa service
* Delete a spa service
* Store service data through a connected API
* Mobile-friendly React Native interface
* Organized frontend architecture with reusable components

## Tech Stack

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* REST API

### Web Frontend

* React
* Vite
* CSS

### Mobile Frontend

* React Native
* Expo
* Expo Router
* TypeScript

## Mobile App Screens

The mobile app includes three main screens:

* Home screen
* Spa Services screen
* Add Service screen

The Spa Services screen connects to the API and allows the user to read, edit, and delete service records. The Add Service screen allows the user to create a new spa service and save it through the API.

## API Functionality

The API supports full CRUD functionality for spa services.

* GET services
* POST new service
* PATCH existing service
* DELETE service

The mobile app uses these API methods through a service file located in:

mobile/src/services/api.ts

## Project Structure

```text
spa-service-menu-manager
├── client
│   └── React web frontend
├── mobile
│   └── Expo React Native mobile app
├── models
│   └── Mongoose models
├── routes
│   └── Express routes
├── server.js
└── README.md
```

## How to Run the Mobile App

From the main project folder, move into the mobile app folder:

```bash
cd mobile
```

Install dependencies if needed:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start -c
```

Press `w` to open the mobile app in the browser.

## How to Run the Web Client

From the main project folder, move into the client folder:

```bash
cd client
```

Install dependencies if needed:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production Branch

This project uses a GitHub branch named `production` for assignment submission.

## Notes

This repository does not include `node_modules` or environment variable files. Dependencies should be installed locally using `npm install`.
