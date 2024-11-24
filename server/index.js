import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(process.cwd(), '/.env') });

const app = express();
app.use(cors());
// app.use(compression());
// app.use(express.json());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/create-cv')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const cvSchema = new mongoose.Schema({
    personalInfo: {
        firstName: String,
        lastName: String,
        title: String,
        email: String,
        phone: String,
        address: String,
        photo: String,
        additionalFields: [],
    },
    profile: String,
    education: Array,
    experiences: Array,
    skills: Array,
    languages: Array,
    interests: Array,
    // email: String,
    // message: String,
    createdAt: { type: Date, default: Date.now }
});

const Cv = mongoose.model('Cv', cvSchema);

// API Routes
app.post('/api/cv', async (req, res) => {
  try {
    const user = new Cv(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/cv', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.send('StartX')
//   res.sendFile(join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});