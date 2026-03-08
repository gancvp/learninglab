export const sqlPresetQueries = [
  {
    label: "Top students by average score",
    query: `SELECT s.name, ROUND(AVG(g.score), 2) AS avg_score
FROM students s
JOIN grades g ON s.id = g.student_id
GROUP BY s.name
ORDER BY avg_score DESC
LIMIT 5;`,
  },
  {
    label: "Course-wise pass count",
    query: `SELECT c.title, COUNT(*) FILTER (WHERE g.score >= 60) AS passed_students
FROM courses c
LEFT JOIN grades g ON c.id = g.course_id
GROUP BY c.title
ORDER BY passed_students DESC;`,
  },
  {
    label: "Window rank by score",
    query: `SELECT
  s.name,
  c.title,
  g.score,
  DENSE_RANK() OVER (PARTITION BY c.title ORDER BY g.score DESC) AS course_rank
FROM grades g
JOIN students s ON s.id = g.student_id
JOIN courses c ON c.id = g.course_id
ORDER BY c.title, course_rank, s.name;`,
  },
];
