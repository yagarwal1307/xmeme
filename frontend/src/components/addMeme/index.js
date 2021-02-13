import React, { Component } from 'react';
import { Modal, Button, Form, Dimmer, Loader } from 'semantic-ui-react';
import axios from '../../axios-xmeme';
import IsImageURL from 'is-image-url';
import './index.css'


class AddMeme extends Component {
  state = {
    open: false,
    formData: {
      name: '',
      url: '',
      caption: ''
    },
    error: {
      name: null,
      url: null,
      caption: null
    },
    editing: false,
    loading: false
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  inputChangeHandler(event, fieldName) {
    const formData = { ...this.state.formData };
    formData[fieldName] = event.target.value
    this.setState({ formData, editing: true });

    if (fieldName === 'name') {
      const error = { ...this.state.error };
      if (event.target.value === '') {
        error.name = {
          content: 'Name length should be atleast 1',
          pointing: 'below',
        }
      } else {
        error.name = null;
      }

      this.setState({ error })
    }

    if (fieldName === 'caption') {
      const error = { ...this.state.error };
      if (event.target.value === '') {
        error.caption = {
          content: 'Caption length should be atleast 1',
          pointing: 'below',
        }
      } else {
        error.caption = null;
      }

      this.setState({ error })
    }

    if (fieldName === 'url') {
      const error = { ...this.state.error };
      if (!IsImageURL(event.target.value)) {
        error.url = {
          content: 'Type a correct image URL',
          pointing: 'below',
        }
      } else {
        error.url = null;
      }
      this.setState({ error })
    }

  }

  onSubmitHandler() {
    const meme = { ...this.state.formData };
    axios.post('/memes', meme)
      .then(response => {
        this.setState({ loading: false })
        this.props.addMeme({...meme, id: response.data.id});
        this.props.showToast(response.status);
      }).catch(error => {
        this.setState({ loading: false })
        this.props.showToast(error.response.status);
      })
    this.setState({ open: false, loading: true });
  }

  render() {
    let loader = null;

    if (this.state.loading) {
      loader = (
        <Dimmer active>
          <Loader size='huge'>loading</Loader>
        </Dimmer>
      )
    }
    return (
      <>
        {loader}
        <div className='addMeme-button' style={{ zIndex: '99' }}>
          <Modal
            centered={false}
            open={this.state.open}
            onClose={() => this.setOpen(false)}
            onOpen={() => this.setOpen(true)}
            trigger={<Button content='Add meme' icon='add' labelPosition='left' color='red' />}
          >
            <Modal.Header>Add a new meme</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Form.Input
                    required
                    label='Name'
                    placeholder='Type your name'
                    onChange={event => (this.inputChangeHandler(event, 'name'))}
                    error={this.state.error.name}
                  />
                  <Form.Input
                    required
                    label='Caption'
                    placeholder='Type a caption for the meme'
                    onChange={event => (this.inputChangeHandler(event, 'caption'))}
                    error={this.state.error.caption}
                  />
                  <Form.Input
                    required label='URL'
                    placeholder='Type a URL for the meme'
                    onChange={event => (this.inputChangeHandler(event, 'url'))}
                    error={this.state.error.url}
                  />
                  <Button
                    positive
                    onClick={() => (this.onSubmitHandler())}
                    disabled={this.state.error.caption || this.state.error.name || this.state.error.url || !this.state.editing}
                  >
                    Create meme
                </Button>
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={() => this.setOpen(false)}>Cancel</Button>
            </Modal.Actions>
          </Modal>
        </div>
      </>
    );
  }


};

export default AddMeme;