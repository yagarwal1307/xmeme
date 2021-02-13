import React from 'react';
import { Header, Icon, Divider } from 'semantic-ui-react'

const header = () => {
  return (
    <div style={{ marginTop: '30px' }}>
      <Header as='h2' icon inverted textAlign='center'>
        <Icon loading name='close' color='red'></Icon><span style={{fontSize:'0.7em', fontFamily:'sans-serif', fontWeight:'bold'}}>XMeme</span>
      <Header.Subheader>
          A simple webpage where you can share your memes with community
      </Header.Subheader>
      </Header>
      <Divider inverted horizontal> Enjoy ;)</Divider>
    </div>
  );
};

export default header;