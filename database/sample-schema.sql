-- Public portfolio example from Job Application Command Center.
-- Stores job applications and tracks status changes independently
-- from the original application date.

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Applied',
  date_applied DATE NOT NULL,
  status_changed_on DATE
);