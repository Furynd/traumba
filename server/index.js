import express from 'express';
const app = express();
const PORT = 5000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Traumba server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
