import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputArea from './components/InputArea';
import ViewArea from './components/ViewArea';

function App() {

  const [info, setInfo] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="App">      
      <Header />
      <div className='contents'>
        <InputArea add = {setInfo} controlVis = {setIsVisible}/>
        <ViewArea info = {info} showVis = {isVisible}/>
      </div>
      <Footer />
    </div>
  );
}

export default App;