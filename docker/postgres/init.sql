CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT NOT NULL,
  graduation_year INT NOT NULL
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  difficulty TEXT NOT NULL
);

CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL REFERENCES students(id),
  course_id INT NOT NULL REFERENCES courses(id),
  score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
  exam_date DATE NOT NULL
);

INSERT INTO students (name, department, graduation_year) VALUES
  ('Aarav', 'CSE', 2026),
  ('Diya', 'ECE', 2026),
  ('Kabir', 'CSE', 2025),
  ('Meera', 'IT', 2026),
  ('Nisha', 'AI', 2025),
  ('Rohan', 'AI', 2026);

INSERT INTO courses (title, difficulty) VALUES
  ('Machine Learning Basics', 'medium'),
  ('Statistics for AI', 'medium'),
  ('SQL for Data Work', 'easy'),
  ('Deep Learning Intro', 'hard');

INSERT INTO grades (student_id, course_id, score, exam_date) VALUES
  (1, 1, 88, '2026-01-12'),
  (1, 3, 91, '2026-01-15'),
  (2, 2, 79, '2026-01-12'),
  (2, 3, 83, '2026-01-15'),
  (3, 1, 72, '2026-01-12'),
  (3, 4, 68, '2026-01-20'),
  (4, 2, 86, '2026-01-12'),
  (4, 3, 89, '2026-01-15'),
  (5, 1, 94, '2026-01-12'),
  (5, 4, 90, '2026-01-20'),
  (6, 2, 84, '2026-01-12'),
  (6, 4, 87, '2026-01-20');

CREATE TABLE IF NOT EXISTS learner_profiles (
  id SERIAL PRIMARY KEY,
  learner_key TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL DEFAULT 'Local Student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS learning_progress (
  id SERIAL PRIMARY KEY,
  learner_key TEXT NOT NULL,
  item_key TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (learner_key, item_key)
);

CREATE TABLE IF NOT EXISTS coding_attempts (
  id SERIAL PRIMARY KEY,
  learner_key TEXT NOT NULL,
  problem_id TEXT NOT NULL,
  language TEXT NOT NULL,
  execution_mode TEXT NOT NULL,
  source_code TEXT NOT NULL,
  stdin TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL,
  passed_count INT,
  total_count INT,
  stdout TEXT NOT NULL DEFAULT '',
  stderr TEXT NOT NULL DEFAULT '',
  compile_output TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flagship_documents (
  id SERIAL PRIMARY KEY,
  learner_key TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flagship_sessions (
  id SERIAL PRIMARY KEY,
  learner_key TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flagship_messages (
  id SERIAL PRIMARY KEY,
  session_id INT NOT NULL REFERENCES flagship_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  citations JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
