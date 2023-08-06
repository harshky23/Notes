const express = require('express')
const router = express.Router()
const {postNote ,getAll,getById,deleteByid,updateByid} = require('../controllers/noteController');
const requireAuth = require('../middleware/requireAuth')

//authentecation
router.use(requireAuth)
// after sucessfull login user can acess below routes

//get all data
router.get( '/',getAll);

//get a data with specific id

router.get( '/:id',getById);

//post
router.post('/' ,postNote);

//delete
router.delete('/:id',deleteByid);

//update
router.patch('/:id',updateByid);

module.exports = router