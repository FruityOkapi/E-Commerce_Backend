const router = require('express').Router();
const { find, findIndex } = require('lodash');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Finds all tags and responds with a json file
router.get('/', async (req, res) => {
  try {
    // Finds all tags
    const tagData = await Tag.findAll({
      // Adds associated products to the data
      include: [{ model: Product }],
    });
    // Response on Success
    res.status(200).json(tagData)
  } catch (error) {
    // Response on Error
    res.status(500).json(error);
  }
});

// Finds one product by ID and responds with a json file
router.get('/:id', async (req, res) => {
  try {
    const findTagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(findTagById);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Creates a new tag and responds with a json file
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    })
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Updates a tag's name by its `id` value and responds with a json file
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Deletes a tag by its `id` value and responds with a json file
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({where:{id:req.params.id}});
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
