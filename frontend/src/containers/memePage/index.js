import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import Card from '../../components/memeCard';
import AddMemeButton from '../../components/addMeme';
import './index.css';
import axios from '../../axios-xmeme';

class Memepage extends Component {

  state = {
    memes: [],
    loading: true,
    error: null
  }

  componentDidMount() {
    this.memeList();
  }

  addMemeHandler(meme) {
    let memes = [...this.state.memes];
    if(memes.length >= 100) memes.pop();
    memes.splice(0, 0, meme);
    this.setState({ memes });
  }

  editMemeHandler(id, newData) {
    let memes = [...this.state.memes];

    for(let i=0; i<memes.length; i++) {
      if(memes[i].id === id) {
        memes[i].url = newData.url;
        memes[i].caption = newData.caption;
        break;
      }
    }

    this.setState({memes});
  }

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
    let memes = (
      <Dimmer active>
        <Loader size='large'>loading</Loader>
      </Dimmer>
    )

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