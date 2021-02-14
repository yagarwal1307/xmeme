import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';

import Card from '../../components/memeCard';
import AddMemeButton from '../../components/addMeme';

//Import axios instance from axios-meme file
import axios from '../../axios-xmeme';
import './index.css';


class Memepage extends Component {

  state = {
    memes: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    this.memeList();
  }

  //Pass this handler to Addmeme compononent
  //Saves us from the overhead of requesting database for meme when we know what meme we have sent
  addMemeHandler(meme) {
    let memes = [...this.state.memes];
    if(memes.length >= 100) memes.pop(); //If there are already 100 memes on page. Pop the last page and insert the new meme on the page
    memes.splice(0, 0, meme);
    this.setState({ memes });
  }

  //Pass this handler to editMeme button in addMeme component
  editMemeHandler(id, newData) {
    let memes = [...this.state.memes];

    for(let i=0; i<memes.length; i++) {
      if(memes[i].id === id) {
        //Update the updated meme with the new Data sent
        memes[i].url = newData.url;
        memes[i].caption = newData.caption;
        break;
      }
    }

    this.setState({memes});
  }

  //Request the memes from the server
  memeList() {
    axios.get('/memes')
      .then(response => {
        this.setState({ memes: response.data, loading: false });
        this.props.showToast(response.status);
      }).catch(error => {
        this.setState({ error, loading: false });
        this.props.showToast(error.response.status);
      })
  }

  render() {

    //When the page first load use a loader
    let memes = (
      <Dimmer active>
        <Loader size='large'>loading</Loader>
      </Dimmer>
    )

    //Update the meme with the cards of memes
    if (!this.state.loading) {
      memes = this.state.memes.map(meme => {
        return (
          <Grid.Column key={meme.id} mobile={16} tablet={8} computer={5}>
            <Card url={meme.url} author={meme.name} caption={meme.caption} id={meme.id}  editMeme={(newData) => this.editMemeHandler(meme.id, newData)} showToast={this.props.showToast}/>
          </Grid.Column>
        )
      })
    }

    return (
      <>
        <Grid centered stretched>
          {memes}
        </Grid>
        <AddMemeButton addMeme={(newMeme) => this.addMemeHandler(newMeme)} showToast={this.props.showToast}/>
      </>
    )
  }
}

export default Memepage;