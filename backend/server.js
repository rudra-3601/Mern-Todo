import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/tasks", taskRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Set up static file serving for React build
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Serve React index.html for any other routes (client-side routing)
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
