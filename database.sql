

CREATE TABLE company(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255)
);

CREATE TABLE job(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(255),
  company_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES company (id)
);

CREATE TABLE applicant (
    id SERIAL PRIMARY KEY,
    applicant_name VARCHAR(225),
    email VARCHAR(255),
    resume TEXT
);

CREATE TABLE job_application(
  id SERIAL PRIMARY KEY,
  content VARCHAR(225),
  applied_at VARCHAR(255),
  status VARCHAR(255),
  job_id INTEGER,
  FOREIGN KEY (job_id) REFERENCES job (id),
  applicant_id INTEGER,
  FOREIGN KEY (applicant_id) REFERENCES applicant (id)
);

CREATE TABLE users (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
  role VARCHAR( 225 ),
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL
);