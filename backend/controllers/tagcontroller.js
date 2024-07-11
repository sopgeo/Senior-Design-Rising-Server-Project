const db = require("../models/")

const Tags = db.tags
const TagMap = db.tagmap

exports.createTag = async (req, res) => {
    try {
      const newTag = Tags.create({
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
        const result = await Tags.destroy({
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

exports.assignTag = async (req, res) => {
  try {
    const newTag = TagMap.create({
      tag_id: req.body.tag_id,
      project_id: req.body.project_id
    })
    res.status(200).send({ message: `Tag assigned between tag ${req.body.tag_id} and project ${req.body.project_id}`})
  }
  catch (error) {
    res.status(500).json({error: error.message, message: "Error occurred assigning tag"})
  }
}

exports.unassignTag = async (req, res) => {
  try {
    let tag = await TagMap.destroy({
      where: {
        tag_id: req.body.tag_id,
        project_id: req.body.project_id
      }
    })

    if (!tag) throw Error("Tag assignment not found") 
    res.status(200).send({ message: `Tag deleted`})
  }
  catch (error) {
    res.status(500).json({error: error.message, message: "Error occurred unassigning tag"})
  }
}