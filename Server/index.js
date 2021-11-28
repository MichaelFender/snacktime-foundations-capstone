const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.
///////////////////////////////////////
const {
  getSnacks,
  deleteSnack, 
  createSnack, 
  updateSnack
} = require('./controller')

app.get(`/api/snacks`, getSnacks)
app.delete(`/api/snacks/:id`, deleteSnack)
app.post(`/api/snacks`, createSnack)
app.put(`/api/snacks/:id`, updateSnack)


///////////////////////////////////////
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
