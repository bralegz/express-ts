import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users';

dotenv.config();

const app = express();

app.use('/api/users', usersRouter);

const PORT =  process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}); 