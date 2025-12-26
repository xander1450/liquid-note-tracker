import "dotenv/config";
import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notes.js";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/notes", notesRoutes);

app.listen(5000, () =>
  console.log("Backend running on http://localhost:5000")
);