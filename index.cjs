
const express = require("express");
const dotenv=require('dotenv');
const http = require("http");
const connectDb = require('./db.cjs')
const itemModel = require('./models/item.cjs')
const cors = require('cors')

dotenv.config({path:'./.env'})  




const app = express();
const PORT=process.env.PORT || 5000;
connectDb()



app.use(cors())
app.use(express.json())






app.get('/', async (req,res) =>{
    const response = await itemModel.find()
    return res.json({items : response})
})

app.post('/', async (req, res) => {
  try {
   const { name, email, phone, comment } = req.body;
    console.log(" Incoming form data:", req.body);

     if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email and phoe number are required" });
    }

    const newItem = new itemModel({ name, email , phone , comment });
    await newItem.save();
    res.json({ message: "Item added", item: newItem });
  } catch (err) {
    console.error("failed to save data" ,err);
    res.status(500).json({ error: "Failed to save item" });
  }
});

app.delete('/api/record/:id', async (req, res) => {
  try {
    const result = await itemModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});


app.put('/api/record/:id', async (req, res) => {
  try {
    const result = await itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Record updated', item: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});


app.listen(PORT , ()=>{
  console.log(`example app listening at http://localhost:${PORT}`);
})









