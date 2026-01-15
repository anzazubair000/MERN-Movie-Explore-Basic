import movieModel from "../Models/movieModel.js";

//Create
const createNewData = async (req, res) => {
  try {
    // 1. Combine body data and file data into one object
    const movieData = {
      ...req.body, // Spread all text fields (Title, Year, etc.)
      Poster: req.file ? req.file.filename : "" // Add the filename from Multer
    };
    // 2. Pass the combined object to the model
    const newData = new movieModel(movieData);
    if (newData) {
      await newData.save();
      res.status(201).json({
        message: "Data Added Successfuly",
        data: newData,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//Read
const getAllData = async (req, res) => {
  try {
    const result = await movieModel.find();
    if (result.length>0) {
      res.status(200).json({
        message: "All data",
        total: result.length,
        data: result,
      });
    } else {
      res.status(200).json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const getDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await movieModel.findById(id);
    if (result) {
      res.status(200).json({
      message: "Data found",
      data: result,
    });
    } else {
      res.status(200).json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//Update
const updateDataById = async (req, res) => {
  try {
    const id  = req.params.id;
    // Prepare update object
    let updatePayload = { ...req.body };
    // If a new file is uploaded, update the Poster field
    if (req.file) {
      updatePayload.Poster = req.file.filename;
    }
    const updatedData = await movieModel.findByIdAndUpdate(id, updatePayload, { new: true })
    if (updatedData) {
      res.status(200).json({
      message: `Update data of ID : ${id}`,
      data: updatedData,
    });
    } else {
      res.status(200).json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
//Delete
const deleteDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedData=await movieModel.findByIdAndDelete(id)
    if (deletedData) {
      res.status(200).json({
      message: `Data deleted of ID : ${id}`,
      data: deletedData,
    });
    } else {
      res.status(200).json({ message: "No data found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getAllData,
  getDataById,
  createNewData,
  updateDataById,
  deleteDataById,
};
