import React from 'react';
import Header from '../components/header';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'semantic-ui-react';
import Footer from '../components/footer';
import Memepage from './memePage';
import './App.css';

function App() {

  const showToast = (statusCode) => {
    if(statusCode === 200) toast.success("Success!")
    else if(statusCode === 201) toast.success("Meme Uploaded!");
    else if(statusCode === 204) toast.success("Meme Updated!");
    else if(statusCode === 400) toast.error("Invalid Request!!");
    else if(statusCode === 404) toast.error('Not found!');
    else if(statusCode === 409) toast.error('Meme with same data already exists!');
    else if(statusCode === 422) toast.error('Invalid meme ID');
    else if(statusCode === 500) toast.error('Server error');
    else toast.dark(statusCode);
  };

  return (
    <div className="App">
      <Container fluid>
        <Header />
        <Memepage showToast={(code) => (showToast(code))}/>
      </Container>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
