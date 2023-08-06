const note = require("../models/noteModel");
const mongoose = require("mongoose");

// post a note

const postNote = async (req, res) => {
  const { title, subHead, writeUp } = req.body;
  try {
    const user_id = req.user._id
    const addnote = await note.create({ title, subHead, writeUp,user_id });
    res.status(200).json(addnote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all post

const getAll = async (req, res) => {
  const user_id = req.user._id
  const getall = await note.find({user_id}).sort({ createdAt: -1 }); // crated for sorting at top -1 represents a descending sort order
  res.status(200).json(getall);
};
//get specific post using id

const getById = async (req, res) => {
  const { id } = req.params; // take id parameter from the address string destructuring

  if (!mongoose.Types.ObjectId.isValid(id)) {
    //to validate whether id is corret or not
    return res.status(404).json({ error: "wrong message" });
  }
  
  const getid = await note.findById(id);

  if (!getid) {
    return res.status(404).json({ error: "No Data found" });
  } else {
    return res.status(200).json(getid);
  }
};

// delete specific post by id

const deleteByid = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Could not load ID" });
  }

  const deletee = await note.findOneAndDelete({ _id: id });
  if (!deletee) {
    return  res.status(404).json({ msg: "Could not find ID" });
  }
  else {
  return res.status(200).json(deletee);
    }
};

// update specific element with id

const updateByid = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: " Could not load ID checks validity of ID " });
  }
  const updateByid = await note.findOneAndUpdate({_id:id},{...req.body})
                    //   {...req.body}: This is the update object, 
                    // which contains the new data that will be applied to the found document. 
                    //The ... syntax is the object spread operator, used here to copy the properties 
                    //from req.body into a new object.
  if(!updateByid){
   return  res.status(404).json({ msg: "Could not find ID in the db but id is valid" });
  }
  else {
  return res.status(200).json(updateByid);
    }
};

module.exports = { postNote, getAll, getById,deleteByid,updateByid};
