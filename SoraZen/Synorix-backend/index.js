const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Contact = require('./models/Contact');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sorazen';

mongoose.set('strictQuery', true);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message || error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, budget, timeline, message, projectType, description } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const contact = new Contact({
      name,
      email,
      phone,
      service: service || projectType || '',
      budget: budget || '',
      timeline: timeline || '',
      message: message || description || '',
      projectType: projectType || '',
      description: description || '',
    });
    await contact.save();
    return res.status(201).json({ message: 'Contact request saved.' });
  } catch (error) {
    console.error('Error saving contact request:', error);
    return res.status(500).json({ error: 'Unable to save contact request.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
