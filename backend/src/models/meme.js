const mongoose = require('mongoose');
//Node module to verify the image URL module
const IsImageURL = require('is-image-url');

//Schema for meme model
const memeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  },
  url: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if(!IsImageURL(value)) {
        //If image URL is invalid throws an error and validation fails.
        throw new Error('Image URL is invalid!')
      }
    }
  },
  caption: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
}, {
  //Time stamps for meme creation and update.
  timestamps: true
});

memeSchema.methods.toJSON = function () {
  const meme = this;

  //Change _id to id while sending meme object as response.
  return {
    id: meme._id,
    name: meme.name,
    url: meme.url,
    caption: meme.caption
  }
}

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;