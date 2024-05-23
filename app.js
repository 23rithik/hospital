const express = require('express');
const bodyParser = require('body-parser');
const basicRoutes = require('./routes/basicRoutes');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000; // Use the PORT from .env or default to 3000

app.use(bodyParser.json());
app.use('/api', basicRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
Example inputs in postman(for reference)
----------------------------------------

GET operation:  URL:http://localhost:3000/api/hospitals
POST operation: URL:http://localhost:3000/api/hospitals  
                body:{
                        "name": "name of hospital",
                        "patientCount": count,
                        "location": "place"
                      }
PUT operation:  URL:http://localhost:3000/api/hospitals/2 (given the index position as 2)
                body:{
                        "name": "name of hospital",
                        "patientCount": count,
                        "location": "place"

                      }
DELETE operation:URL:http://localhost:3000/api/hospitals/1 (given the index position as 1)(delete the element at index position 2)


*/
