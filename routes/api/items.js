const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => {
            return res.json(items);
        })
});

// @route  POST api/items
// @desc   Create An Item
// @access Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save()
        .then(item => {
            return res.json(item)
        })
        .catch(err => console.error(err));
});

// @route  DELETE api/items/:id
// @desc   Delete An Item
// @access Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.remove()
                .then(() => {
                    return res.json({success: true})
                })
        })
        .catch(err => {
            return res.status(404).json({success: false});
        })
})

module.exports = router;