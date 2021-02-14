const express = require('express');

//ObjectID will be required to verify if the id recieved is valid mongodb objectid or not
var ObjectID = require('mongodb').ObjectID;

const Meme = require('../models/meme');

//Create a new router for memes
const router = express.Router();

router.post('/memes', async (req, res) => {
  //Access all the object properties in the payload
  const keys = Object.keys(req.body);

  //URL, Caption and name are the only allowed properties for POST request
  const allowedKeys = ['url', 'caption', 'name'];

  //If some invalid property is sent in the payload send a 400 error.
  const isValidPost = keys.every((key) => allowedKeys.includes(key));
  if (!isValidPost) {
    return res.status(400).send()
  }

  try{
    //If a meme with same payload already exists send a 409(Conflict) error
    const duplicateMeme = await Meme.findOne({
      name: req.body.name,
      caption: req.body.caption,
      url: req.body.url
    });
    if(duplicateMeme) {return res.status(409).send();}
  } catch (e) {
    return res.status(400).send();
  }
  
  const meme = new Meme(req.body);
  try {
    //Save the new Meme in database
    await meme.save();
    //Send id of the new meme in response body and a 201(Created status code)
    res.status(201).send({id: meme._id});
  } catch (e) {
    res.status(400).send(e);
  }
})

router.get('/memes', async (req, res) => {
  try {
    //Query database for latest 100 memes
    const memes = await Meme.find({}).sort('-createdAt').limit(100);  //Sorted according to createdAt in descending order
    res.status(200).send(memes)
  } catch(e) {
    //If error occurs. Send 500(Internal server error)
    res.status(500).send(e)
  }
})

router.get('/memes/:id', async (req, res) => {
  //Access meme ID via: req.params.id
  const _id = req.params.id;

  //Check if id is a valid mongodb object id. If not send a 422(Unprocessable Identity) status code
  if((!ObjectID.isValid(_id)) && _id) return res.status(422).send();

  try {
    //Find meme with the received id
    const meme = await Meme.findOne({_id});
    //If no meme with the id exists send a 404(not found error)
    if(!meme) res.status(404).send();
    else res.send(meme);
  } catch (e) {
    res.status(500).send(e);
  }
})

router.patch('/memes/:id', async (req, res) => {

  //Access the id of meme to update via req.params.id and check if its a valid mongodbobject id.
  //If ID doesn't exist we will send a 404 instead of a 422
  if((!ObjectID.isValid(req.params.id)) && req.params.id) return res.status(422).send(); // If not a valid id send 422

  //Access the meme properties user wants to update
  const updates = Object.keys(req.body);

  //Only url or caption are allowed to be updated and 
  const allowedUpdates = ['url', 'caption'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  //At least one of them must be updated
  if (!isValidOperation || updates.length == 0) {
    return res.status(400).send()
  }

  try{
    //Find the meme user wants to update via id.
    const meme = await Meme.findById(req.params.id);
    //If meme doesn't exist return 404(not found) and if id was undefined. It will again be 404 here
    if(!meme) { return res.status(404).send()};
    
    //Check if a meme with the new payload already exists in database.
    const duplicateMeme = await Meme.findOne({
      name: meme.name,
      ...req.body
    })

    if(duplicateMeme) {
      //If user is trying to send a PATCH request with the same payload (i.e. without changing) send a 204
      if (duplicateMeme._id.toString() === req.params.id) return res.status(204).send()
      //If a different meme with new payload already exists send  a 409(Conflict) error.
      else return res.status(409).send()
    }

    updates.forEach((update) => meme[update] = req.body[update])
    await meme.save()
    res.status(204).send(); //For successful patch request send a 204(No content) status code

  } catch (e) {
    //For failed validation return a 400 status code
    res.status(400).send(e);
  }
})

module.exports = router;