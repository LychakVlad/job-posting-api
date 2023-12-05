

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