let express = require('express');
let app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");


// Connect to db
let dbName = "contact_list";
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true });
global.db = mongoose.connection;
db.on('error', () => console.log('Could not connect to DB'));
db.once('open', () => {
    console.log('Connected to DB');
    startWebServer();
})

// Start webserver
function startWebServer() {
  app.use(express.static('www'));
  app.use(bodyParser.json());

  let Contact = require('./models/Contact');

  app.get('/api/contacts', async (req, res) => {
    let contacts = await Contact.find();
    res.json(contacts);
  })

  app.get('/api/contacts/:id', async (req, res) => {
    let contact = await Contact.findById(req.params.id);
    res.json(contact);
  })

  app.post('/api/contacts/add', async (req, res) => {
    let err, instance = new Contact(req.body);
    let result = await instance.save().catch(
      error => err = error
    )
    res.json(err || result);
  });

  app.put('/api/contacts/update', async (req, res) => {
    let err, instance = Contact.findOneAndReplace({"_id": req.body._id}, {"name": req.body.name, "phoneNumbers": req.body.phoneNumbers, "mails": req.body.mails, "history": req.body.history } );
    let result = await instance.catch(
      error => err = error
    )
    res.json(err || result);
  });

  app.delete('/api/contacts/delete/:id', async (req, res) => {
    let err, instance = await Contact.findByIdAndRemove(req.params.id).catch(
      error => err = error
    );
    res.json(err || instance);
  });
 
  
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './www/index.html'));
  });
  app.listen(3000, () => console.log('listening on port 3000'));
}