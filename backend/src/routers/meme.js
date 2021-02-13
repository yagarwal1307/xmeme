const express = require('express');
var ObjectID = require('mongodb').ObjectID;

const Meme = require('../models/meme');

const router = express.Router();

router.post('/memes', async (req, res) => {
  const keys = Object.keys(req.body);
  const allowedKeys = ['url', 'caption', 'name'];
  const isValidPost = keys.every((key) => allowedKeys.includes(key));

  if (!isValidPost) {
    return res.status(400).send()
  }

  try{
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
    await meme.save();
    res.status(201).send({id: meme._id});
  } catch (e) {
    res.status(400).send(e);
  }
})

router.get('/memes', async (req, res) => {
  try {
    const memes = await Meme.find({}).sort('-createdAt').limit(100);
    res.status(200).send(memes)
  } catch(e) {
    res.status(500).send(e)
  }
})

router.get('/memes/:id', async (req, res) => {
  const _id = req.params.id;

  if((!ObjectID.isValid(_id)) && _id) return res.status(422).send();

  try {
    const meme = await Meme.findOne({_id});
    if(!meme) res.status(404).send();
    else res.send(meme);
  } catch (e) {
    res.status(500).send(e);
  }
})

router.patch('/memes/:id', async (req, res) => {

  if((!ObjectID.isValid(req.params.id)) && req.params.id) return res.status(422).send();

  const updates = Object.keys(req.body);
  const allowedUpdates = ['url', 'caption'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation || updates.length == 0) {
    return res.status(400).send()
  }

  try{
    const meme = await Meme.findById(req.params.id);
    if(!meme) { return res.status(404).send()};
    
    const duplicateMeme = await Meme.findOne({
      name: meme.name,
      ...req.body
    })

    if(duplicateMeme) {
      if (duplicateMeme._id.toString() === req.params.id) return res.status(204).send()
      else return res.status(409).send()
    }

    updates.forEach((update) => meme[update] = req.body[update])
    await meme.save()
    res.status(204).send();

  } catch (e) {
    res.status(400).send(e);
  }
})

module.exports = router;