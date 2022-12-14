const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Gets all categories and responds with a json file
router.get('/', async (req, res) => {
  // Try and Catch works similar to .then and .catch
  try {
    // Finds all categories
    const categoryData = await Category.findAll({
      // Adds associated products to the data
      include: [{ model: Product }],
    });
    // Response on Success
    res.status(200).json(categoryData)
  } catch (error) {
    // Response on Error
    res.status(500).json(error);
  }
});

// Gets categories by id in the request parameters and responds with a json file
router.get('/:id', async (req, res) => {
  try {
    // Looks for category based on the id in the request
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error);
  }
});

// Creates a new category and responds with a json file
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Updates a category by its `id` value and responds with a json file
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await
    Category.update(
      // Updatable fields
      {
        category_name: req.body.category_name,
      },
      // Chooses which category to update based on id
      {
        where: {
          id: req.params.id,
        }
      });
      res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Deletes a category by its `id` value and responds with a json file
router.delete('/:id', async (req, res) => {
 try {
  const deletedCategory = await Category.destroy({where:{id: req.params.id,},});
  res.status(200).json(deletedCategory)
} catch (error) {
  res.status(500).json(error)
}
});

module.exports = router;
