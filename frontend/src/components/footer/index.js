import React from 'react';
import { Segment, Container, List, Header, Icon } from 'semantic-ui-react'

//Meme page footer
const footer = () => {
  return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
      <Container textAlign='center'>

        {/* <Image centered size='mini' src='https://react.semantic-ui.com/logo.png' /> */}
        <Header as='h4' inverted>
          Created with <Icon name='like' color='red' />
        </Header>
        <Header as='h5' inverted>
          <List horizontal divided inverted link size='small'>
          <List.Item>
            -By Yash Agarwal
          </List.Item>
          <List.Item>
            All rights reserved 
          </List.Item>
          <Icon name='copyright outline'/>
        </List>
        </Header>
        <List horizontal inverted link size='small'>
          <List.Item as='a' href='https://www.linkedin.com/in/yash-agarwal-5b038a167/'>
            <Icon name='linkedin' size='big' />
          </List.Item>
          <List.Item as='a' href='https://github.com/yagarwal1307'>
            <Icon name='github' size='big' />
          </List.Item>
          <List.Item as='a' href='https://www.instagram.com/yagarwal1307/?hl=en'>
            <Icon name='instagram' size='big' />
          </List.Item>
          <List.Item as='a' href='https://www.facebook.com/profile.php?id=100005043212792'>
            <Icon name='facebook official' size='big' />
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
}

export default footer;