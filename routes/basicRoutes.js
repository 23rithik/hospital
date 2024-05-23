const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../hospitalData.json');

// Read hospital data from JSON file
function readData() {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
}

// Write hospital data to JSON file
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// GET operation: Retrieve all hospitals
router.get('/hospitals', (req, res) => {
  res.json(readData());
});

// POST operation: Add a new hospital
router.post('/hospitals', (req, res) => {
  const data = readData();
  const newHospital = req.body;
  data.push(newHospital);
  writeData(data);
  //res.status(201).json(newHospital);
  res.send('Post successful');
});

// PUT operation: Update a hospital
router.put('/hospitals/:index', (req, res) => {
  const data = readData();
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < data.length) {
    data[index] = req.body;
    writeData(data);
    // res.json(data[index]);
    res.send('PUT successful');
  } else {
    res.status(404).json({ error: 'Hospital not found' });
  }
});

// DELETE operation: Remove a hospital
router.delete('/hospitals/:index', (req, res) => {
  const data = readData();
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < data.length) {
    const removedHospital = data.splice(index, 1);
    writeData(data);
    // res.json(removedHospital);
    res.send('DELETE successful');
  } else {
    res.status(404).json({ error: 'Hospital not found' });
  }
});

module.exports = router;
