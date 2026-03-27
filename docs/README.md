# Architecture Notes

## Project Overview

This project is a multi-tenant AI research platform that allows users to
submit research-processing jobs, monitor their status, and review
AI-generated outputs after background processing is complete.

The platform is designed as a multi-service application so that the API,
frontend, and background worker each have a clear responsibility.

---

## Services

### Frontend

The frontend is the user-facing application.

Its responsibilities are:

- allow users to register and log in
- provide a dashboard to submit research jobs
- display a list of a user's jobs
- show job status updates
- display completed job results

The frontend should not contain business logic for job processing.
Its job is to collect user input, send requests to the backend API,
and present returned data clearly.

---

### Backend API

The backend is the main application server.

Its responsibilities are:

- handle authentication and authorization
- expose REST API endpoints
- validate incoming requests
- store and retrieve application data from the database
- create new jobs when users submit them
- place new jobs onto a background processing queue
- return job data to the frontend

The backend should respond quickly and should not perform long-running
AI processing directly inside the request-response cycle.

---

### Worker

The worker is the background processing service.

Its responsibilities are:

- listen for queued jobs
- retrieve job details
- process long-running tasks outside the API request cycle
- call the LLM API to generate summaries or insights
- update the database with job progress and final results
- mark jobs as completed or failed

The worker exists separately from the backend so that expensive work
does not block user-facing API requests.

---

## Data Flow

At a high level, the system works like this:

1. A user signs in through the frontend.
2. The user submits a research job from the frontend.
3. The backend receives the request and validates it.
4. The backend stores the job in the database with a `pending` status.
5. The backend sends the job to the queue.
6. The worker picks up the queued job.
7. The worker processes the job and calls the LLM API.
8. The worker stores the generated result in the database.
9. The worker updates the job status to `completed` or `failed`.
10. The frontend requests updated job data from the backend and displays
    the result to the user.

---

## Responsibility Boundaries

### What the frontend owns

- UI rendering
- forms
- authentication state on the client
- displaying jobs and results
- calling backend endpoints

### What the backend owns

- API routes
- auth logic
- request validation
- database reads and writes
- job creation
- queue publishing

### What the worker owns

- background execution
- long-running processing
- LLM integration
- job status updates
- failure handling during processing

---

## Why the Worker Is Separate

The worker is separated from the backend because AI processing can take
time and should not block HTTP requests.

This separation improves:

- responsiveness of the API
- scalability of background processing
- maintainability of the system
- clarity of service responsibilities

It also reflects a more realistic production architecture for systems
that handle asynchronous jobs.

---

## Multi-Tenant Model

This application is multi-tenant at the user level.

That means:

- multiple users can use the platform
- each user can submit their own jobs
- each user can only view their own jobs and results

In the MVP version, tenant separation is enforced by associating each
job with a specific user and filtering access accordingly.

A more advanced version could later introduce organization-level tenants,
but that is not required for the initial build.

---

## Planned Core Entities

### User

A user represents an authenticated account in the platform.

A user will eventually have:

- an id
- name or email
- hashed password
- created timestamp

### Job

A job represents a research-processing request submitted by a user.

A job will eventually have:

- an id
- user id
- title or label
- input text
- status
- result
- created timestamp
- updated timestamp

---

## Job Status Lifecycle

A job will move through the following states:

- `pending`
- `running`
- `completed`
- `failed`

These statuses will help users monitor progress from the frontend and
will also make the system easier to debug.

---

## Initial Tech Stack

- Frontend: React
- Backend: Node.js with Express
- Worker: Node.js
- Database: PostgreSQL
- Queue: Redis with BullMQ
- Authentication: JWT
- Containers: Docker
- Orchestration: Kubernetes
- CI/CD: GitHub Actions
- Cloud: AWS

---

## Primary User Journey

The main user journey for the MVP is:

1. User registers or logs in.
2. User submits a piece of research text for processing.
3. User sees the job appear in their dashboard with a `pending` status.
4. The background worker processes the job.
5. The system generates an AI summary.
6. The user refreshes or revisits the dashboard and sees the completed
   result.

This is the core workflow that all early development should support.

---

## MVP Scope

The MVP should prove the following ideas:

- authenticated users can create jobs
- jobs are stored per user
- jobs are processed asynchronously
- AI-generated output is saved and displayed
- services can run independently
- the application can be containerized and deployed

Anything that does not support these goals should be considered optional
for the first version.