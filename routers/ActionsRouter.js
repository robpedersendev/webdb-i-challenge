const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async(req, res) => {
 
 try{
  // Shows the actual query made to the db
  // const query =db.select('*').from('posts')
  // console.log(query)
  const posts = await db('posts');
  res.status(200).json(posts)
 }catch (error){
  res.status(500).json({message: "error retrieving posts", error:error})
 }

});


module.exports = router;