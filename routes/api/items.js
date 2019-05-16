const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

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
// @access Private
router.post('/', auth, (req, res) => {
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
// @access Private
router.delete('/:id', auth, (req, res) => {
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