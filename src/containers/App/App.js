import React from 'react';

import './App.scss';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class App extends React.Component {
  render() {
    return (
      <div className='container-fluid'>
        <Header title='Hello world' />
        <div>
          { this.props.children }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
