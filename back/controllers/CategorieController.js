const Categorie = require("../models/category.model");

const CreateCatego = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await Categorie.findOne({ name });
    if (category) {
      return res.status(400).json({ message: "this category already exists " });
    }
    const newCategorie = new Categorie({ name });
    await newCategorie.save();
    res.json({ message: "Created a category " + newCategorie.name });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCatego = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Categorie.findById(id).then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Categorie is not found" });
      } else {
        return res.json({ data });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteCatego = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "Categorie deleted " });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateCatego = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Categorie.findByIdAndUpdate({ _id: id }, { name: req.body.name });
    res.json("updated successfully");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  CreateCatego,
  getCatego,
  deleteCatego,
  updateCatego,
};
