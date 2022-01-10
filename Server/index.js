require("dotenv").config() //sensitive info hidden from public
const express = require("express"); //framework to build server using node
const cors = require("cors"); //allows only me to make changes to API
const path = require("path"); //library that builds path to files
const app = express(); //invocation of express - allows use of express method - CRUD
////
app.use(cors());
app.use(express.json());
app.use(express.static('client'))
//^^MiddleWare
//////


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'))//send file as a response to navigation
})
//^^route to client file



const {
  getSnacks,
  deleteSnack, 
  createSnack, 
  updateSnack
} = require('./controller');
const res = require("express/lib/response");
//^^controller actions

app.get(`/api/snacks`, getSnacks)
app.delete(`/api/snacks/:id`, deleteSnack)
app.post(`/api/snacks`, createSnack)
app.put(`/api/snacks/:id`, updateSnack)
//^^CRUD routes from CONTROLLER.js
///////////////////////////////////////

const port = process.env.PORT || process.env.SERVER_PORT;
//const { PORT } = process.env.PORT || process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`The app is ready on port ${port}`);
});

