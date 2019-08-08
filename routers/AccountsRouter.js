const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async(req, res) => {
 
 try{
  // Shows the actual query made to the db
  // const query =db.select('*').from('accounts')
  // console.log(query)
  const accounts = await db('accounts');
  res.status(200).json(accounts)
 }catch (error){
  res.status(500).json({message: "error retrieving accounts", error:error})
 }

});


router.get('/:id', async(req, res) => {
 const {id} =req.params
  try{
   // Shows the actual query made to the db
   // const query =db.select('*').from('accounts')
   // console.log(query)
   
   const [accounts] = await db.select('*').from('accounts').where({id});
   if (accounts) {
    res.status(200).json(accounts);
   } else {
    res.status(400).json({message: `Could not find accounts with id ${id}`})
   }
   
  }catch (error){
   res.status(500).json({message: "Could not get specific accounts", error:error})
  }
 
 });
 
 router.post('/', async(req, res) => {
  
  const accountsData = req.body
  try {
   const accounts = await db('accounts').insert(accountsData)
   res.status(201).json(accounts)
  }catch(error){
   res.status(500).json({message: "Failed to create the new accounts"})
  }
 
 });

 router.put('/:id', async(req, res) => {
  const {id} = req.params;
  const changes = req.body;
  
  try{
   const count =await db('accounts').where('id', '=', id).update(changes)
   if(count){
    res.status(200).json({updated: count})
   }else {
    res.status(404).json({message: `Could not find accounts#${id}`})
   }
  }catch(error){
   res.status(500).json({message: "Could not update the accounts", error: error})
  }
  
  });
    
  router.delete('/:id', async(req, res) => {
   const {id} = req.params;
   
   try{
    const deletedRow = await db('accounts').where({id}).del()
    if(deletedRow){
     res.status(200).json({Deleted: deletedRow})
    }else {
     res.status(404).json({message: `Could not delete accounts#${id}`})
    }
   }catch(error){
    res.status(500).json({message: "Could not delete the accounts", error: error})
   }
  });
 
module.exports = router;