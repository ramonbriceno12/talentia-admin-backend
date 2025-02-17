const express = require('express');
const router = express.Router();

const { getAllLinks, getLinkById, createLink, updateLink, deleteLink, getClicksByLinkId, trackClick } = require('../controllers/linksController');


router.get('/', getAllLinks);
router.get('/:id', getLinkById);
router.post('/', createLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);
router.get('/:id/clicks', getClicksByLinkId);
router.post('/track-click', trackClick);

module.exports = router;