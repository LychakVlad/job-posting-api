# Job Posting Website API

This project provides a robust Node.js-based API for a job posting website. It employs the Express framework to handle HTTP requests and relies on PostgreSQL as the underlying database.

## Table of Contents

- [Job Posting Website API](#job-posting-website-api)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [API Endpoints](#api-endpoints)
    - [Company Routes](#company-routes)
    - [Job Routes](#job-routes)
    - [Applicant Routes](#applicant-routes)
    - [Job Application Routes](#job-application-routes)
    - [Authentication Routes](#authentication-routes)
  - [Middleware](#middleware)
    - [Authentication Middleware](#authentication-middleware)
    - [Role Middleware](#role-middleware)
  - [Controllers](#controllers)
  - [Contact](#contact)

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the PostgreSQL database:**

   - Create a database named `job_posting`.
   - Execute the SQL script provided in the repository to create the necessary tables and relationships.

## Database Setup

The PostgreSQL database includes the following tables:

- `company`
- `job`
- `applicant`
- `job_application`
- `users`

Refer to the provided SQL script for detailed table creation and relationships.

## API Endpoints

### Company Routes

- **POST** `/company`: Create a new company.
- **GET** `/company/:id`: Get details of a specific company.
- **GET** `/company`: Get a list of all companies.
- **PUT** `/company`: Update company details.
- **DELETE** `/company/:id`: Delete a company.

### Job Routes

- **POST** `/job`: Create a new job.
- **GET** `/job/:id`: Get jobs by company.
- **GET** `/job`: Get a list of all jobs.
- **PUT** `/job`: Update job details.
- **DELETE** `/job/:id`: Delete a job.

### Applicant Routes

- **POST** `/applicant`: Create a new applicant.
- **GET** `/applicant/:id`: Get details of a specific applicant.
- **GET** `/applicant`: Get a list of all applicants.
- **PUT** `/applicant`: Update applicant details.
- **DELETE** `/applicant/:id`: Delete an applicant.

### Job Application Routes

- **POST** `/job-application`: Create a new job application.
- **GET** `/job-application/:id`: Get job applications by job.
- **GET** `/job-application`: Get a list of all job applications.
- **DELETE** `/job-application/:id`: Delete a job application.

### Authentication Routes

- **POST** `/registration`: Register a new user.
- **POST** `/login`: Log in and get an authentication token.
- **GET** `/users`: Get a list of all users (admin only).

<!-- Continue with other route documentation -->

## Middleware

### Authentication Middleware

Verifies the presence and validity of user authentication tokens.

### Role Middleware

Ensures that users have the required role to access specific routes.

## Controllers

- **JobController:** Manages CRUD operations for jobs.
- **JobApplicationController:** Handles job applications.
- **CompanyController:** Manages companies.
- **AuthController:** Handles user registration, login, and user listing.
- **ApplicantController:** Manages CRUD operations for applicants.

## Contact

Vladislav Lychak - [@LinkedIn](https://www.linkedin.com/in/vladislav-lychak/) - lycakvladislav@gmail.com

Project Link: [https://my-food-blog-two.vercel.app/](https://my-food-blog-two.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
