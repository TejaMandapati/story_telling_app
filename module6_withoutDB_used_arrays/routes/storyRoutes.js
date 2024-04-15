const express=require('express');
const controller=require('../controllers/storyController');
const router= express.Router();

//GET: /stories: send all stories to the user
router.get('/', controller.index);

//GET /stories/new: send html form for creating a new story
router.get('/new', controller.new);

//POST /stories: create a new story
router.post('/', controller.create);

//GET /stories/:id: send details of a story identifed by id
router.get('/:id', controller.show);

//GET /stories/:id/edit: send HTML form for editing an existing sstory
router.get('/:id/edit', controller.edit);


//PUT /stories/:id: update the story story identifed by id
router.put('/:id', controller.update);

//DELETE /stories/:id: delete the story identifed by id
router.delete('/:id', controller.delete);

module.exports=router;