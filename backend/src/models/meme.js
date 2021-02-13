const mongoose = require('mongoose');
const IsImageURL = require('is-image-url');

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
  timestamps: true
});

memeSchema.methods.toJSON = function () {
  const meme = this;

  return {
    id: meme._id,
    name: meme.name,
    url: meme.url,
    caption: meme.caption
  }
}

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;