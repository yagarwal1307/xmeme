import React, { Component } from 'react';
import axios from '../../axios-xmeme';
import IsImageURL from 'is-image-url';
import { Modal, Button, Form } from 'semantic-ui-react';

class EditMeme extends Component {
  state = {
    open: false,
    newData: {
      url: this.props.url,
      caption: this.props.caption
    },
    error: {
      url: null,
      caption: null
    }
  }

  setOpen(value) {
    this.setState({
      open: value,
      newData: {
        url: this.props.url,
        caption: this.props.caption
      },
      error: {
        url: null,
        caption: null
      }
    });
  }

  inputChangeHandler(event, fieldName) {
    const newData = { ...this.state.newData };
    newData[fieldName] = event.target.value;
    this.setState({ newData });

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
    const meme = { ...this.state.newData };
    if (meme.url === '') { meme.url = this.props.url; }
    if (meme.caption === '') { meme.caption = this.props.caption; }
    axios.patch('/memes/'+ this.props.id, meme)
      .then(response => {
        this.props.showToast(response.status);
        this.props.editMeme(meme)
      }).catch(error => {
        this.props.showToast(error.response.status);
      })
    this.setState({ open: false });
  }



  render() {
    return (
      <>
        <Modal
          centered={false}
          open={this.state.open}
          onClose={() => this.setOpen(false)}
          onOpen={() => this.setOpen(true)}
          trigger={<Button content='Edit' icon='edit' labelPosition='left' />}
        >
          <Modal.Header>Add a new meme</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Input
                  required
                  value={this.state.newData.caption}
                  label='New Caption'
                  placeholder='Type a new caption for the meme'
                  onChange={(event) => this.inputChangeHandler(event, 'caption')}
                  error={this.state.error.caption}
                />
                <Form.Input
                  required
                  value={this.state.newData.url}
                  label='New URL'
                  placeholder='Type a new URL for the meme'
                  onChange={(event) => this.inputChangeHandler(event, 'url')}
                  error={this.state.error.url}
                />
                <Button disabled={this.state.error.url || this.state.error.caption} positive onClick={() => this.onSubmitHandler()}>
                  Confirm
              </Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.setOpen(false)}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }

};

export default EditMeme;