import React from 'react';
import './index.css';
import { Card, Grid } from 'semantic-ui-react';
import EditButtonModal from '../editMeme'
import imagePlaceholder from '../../assets/placeholder.gif';

const card = (props) => {
  return (
    <Card fluid raised centered className='meme-card'>
      <img src={props.url} style={{ maxHeight: '300px', maxWidth: '100%' }} alt='Meme' onError={(e)=>{e.target.onerror = null; e.target.src=imagePlaceholder}}/>
      <Card.Content>
        <Card.Description>
          <b><span style={{fontSize:'1.2em'}}>{props.caption}</span></b>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid>
          <Grid.Column floated='left' width={7} textAlign='left'>
            <Card.Header><b>-</b>{props.author}</Card.Header>
          </Grid.Column>
          <Grid.Column floated='right' width={9} textAlign='right'>
            <EditButtonModal {...props}/>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default card;