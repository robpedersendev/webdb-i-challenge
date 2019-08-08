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


router.get('/:id', async(req, res) => {
 const {id} =req.params
  try{
   // Shows the actual query made to the db
   // const query =db.select('*').from('posts')
   // console.log(query)
   
   const [post] = await db.select('*').from('posts').where({id});
   if (post) {
    res.status(200).json(post);
   } else {
    res.status(400).json({message: `Could not find post with id ${id}`})
   }
   
  }catch (error){
   res.status(500).json({message: "Could not get specific post", error:error})
  }
 
 });
 
 router.post('/', async(req, res) => {
  
  const postData = req.body
  try {
   const post = await db('posts').insert(postData)
   res.status(201).json(post)
  }catch(error){
   res.status(500).json({message: "Failed to create the new post"})
  }
 
 });
 
 router.put('/:id', async(req, res) => {
  const {id} = req.params;
  const changes = req.body;
  
  try{
   const count =await db('posts').where('id', '=', id).update(changes)
   if(count){
    res.status(200).json({updated: count})
   }else {
    res.status(404).json({message: `Could not find post#${id}`})
   }
  }catch(error){
   res.status(500).json({message: "Could not update the post", error: error})
  }
  
  });
  
  
 
module.exports = router;