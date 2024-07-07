const db = require("../models/")

const Tags = db.tags
const TagMap = db.tagmap

exports.createTag = async (req, res) => {
    try {
      const newTag = Tag.create({
        name: req.body.name
      })
  
      res.send({ message: 'Tag created'})
    }
    catch (error) {
      res.status(500).json({error: error.message, message: "Error occurred creating tag"})
    }
  }

  exports.deleteTag = async (req, res) => {
    try {
        const result = await Tag.destroy({
            where: {
                tag_id: req.body.tag_id
            }
        })

        if (result > 0) {
            res.send({ message: `Tag deleted`})
          } else {
            res.send({ message: `No tag found with tag_id${req.body.tag_id}`});
          }
    }
    catch (error) {
        res.status(500).json({error: error.message, message: "Error occurred deleting user"})
    }
}


exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tags.findAll();
    console.log("Tags retrieved:", tags);
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error retrieving tags:", error);
    res.status(500).json({ error: "An error occurred while retrieving tags" });
  }
};