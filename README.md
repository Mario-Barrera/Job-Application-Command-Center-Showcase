# Job Application Command Center

Job Application Command Center is a full-stack web application designed to help users organize and track job applications throughout the hiring process.

The application provides a centralized dashboard for adding applications, updating application statuses, tracking when status changes occur, searching and filtering records, sorting applications by date, and persisting application data in PostgreSQL.

This repository is a **public portfolio showcase** containing selected code examples, screenshots, and technical documentation from the project.

> The complete application source code is maintained in a private repository. Selected code samples are provided here to demonstrate the architecture, development practices, and technologies used to build the application.

---

## Project Overview

Job Application Command Center was built as a full-stack application using React and TypeScript on the frontend, Node.js and Express on the backend, and PostgreSQL for persistent data storage.

The project demonstrates a complete CRUD-oriented workflow connecting a typed React interface to a REST API and relational database.

Application records maintain the original application date while separately tracking when an application's status changes.

### Core Functionality

- Add new job applications
- Retrieve applications from PostgreSQL
- Update application status
- Track the date an application's status changes
- Preserve the original application date when status changes
- Delete applications
- Search applications
- Filter applications by status
- Sort applications by application date
- Loading-state handling
- API error handling
- Form submission feedback
- PostgreSQL data persistence
- REST API integration
- Responsive application interface

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- PostgreSQL
- `pg` Node.js driver

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm

---

## Application Architecture

The application follows a client-server architecture:

```text
React + TypeScript Frontend
          |
          | HTTP / REST API
          v
Node.js + Express Server
          |
          | SQL Queries
          v
PostgreSQL Database
```

The frontend manages application state and user interactions, while the Express server provides API endpoints for communicating with PostgreSQL.

Sensitive configuration values such as database credentials are stored in environment variables and are not included in this public repository.

---

## Selected Code Examples

This showcase repository contains selected portions of the application rather than the complete application source tree.

### Frontend Examples

Selected React and TypeScript examples will demonstrate:

- Component design
- Typed props and application models
- Form state management
- API requests
- Search, filtering, and sorting
- Loading and error states
- Status updates
- User-interface event handling

### Backend Examples

Selected backend examples will demonstrate:

- Express REST API routes
- PostgreSQL integration
- Request validation
- CRUD operations
- Status-update handling
- HTTP status handling
- Error handling

### Database Examples

Selected database examples will demonstrate:

- PostgreSQL table design
- Primary keys
- Default values
- Application status storage
- Application-date storage
- Status-change date tracking with `status_changed_on`
- Database constraints

---

## Status Tracking

Each application stores both its original application date and the date of its most recent status change.

The original:

```text
date_applied
```

remains unchanged when an application's status is updated.

The separate:

```text
status_changed_on
```

field records the date associated with a status change.

This keeps the original application timeline intact while allowing status progression to be tracked independently.

---

## Screenshots

Application screenshots will be stored in:

[docs/images/](./docs/images/)

### Application Dashboard

<!-- Screenshot will be added here -->

### Add Application

<!-- Screenshot will be added here -->

### Search and Filtering

<!-- Screenshot will be added here -->

### Status Management

<!-- Screenshot will be added here -->

---

## What This Project Demonstrates

Job Application Command Center demonstrates my ability to:

- Build reusable React components
- Use TypeScript for strongly typed frontend development
- Manage React application state
- Perform asynchronous API requests
- Build Express REST endpoints
- Connect Node.js applications to PostgreSQL
- Implement CRUD operations
- Validate API input
- Handle loading and error states
- Search, filter, and sort application data
- Track application-status changes separately from the original application date
- Persist application data in a relational database
- Structure a full-stack application
- Use Git and GitHub for version control

---

## Repository Structure

```text
Job-Application-Command-Center-Showcase/
|
+-- README.md
+-- .gitignore
|
+-- docs/
|   +-- images/
|
+-- frontend-examples/
|
+-- backend-examples/
|
+-- database/
```

---

## Source Code Notice

This repository is intended for **portfolio review and demonstration purposes**.

The complete Job Application Command Center application is maintained privately. Code included in this repository represents selected portions of the project intended to demonstrate development skills and technical implementation.

Unless otherwise stated, permission is not granted to copy, redistribute, sell, or incorporate the source code into another commercial project.

---

## Developer

**Mario Barrera**

Software Developer  
Fullstack Academy Web Development Bootcamp Graduate

GitHub: [Mario-Barrera](https://github.com/Mario-Barrera)