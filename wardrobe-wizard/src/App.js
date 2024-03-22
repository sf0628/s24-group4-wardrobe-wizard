//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
// App.js or your routing file
// import { Switch } from 'react-router-dom';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import MyWardrobe from './components/MyWardrobe/MyWardrobe';
import Home from './components/Home';
import LoginSignup from './components/LoginSignup/LoginSignup';
import GenerateOutfit from './components/GenerateOutfit/GenerateOutfit'
import NavBar from './components/NavBar/NavBar';

// import Navbar from './NavBar';

function App() {
  const [wardrobeItems, setwardrobeItems] = useState([]);

  const handleAddItem = (newItem) => {
    setwardrobeItems((prevItems) => [...prevItems, newItem]);
    console.log('New Item:', newItem);
  };


  return(  <Router>
           <NavBar/> 
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/myWardrobe" element={<MyWardrobe onAddItem={handleAddItem}/>} />

              <Route path="/login" element={<LoginSignup/>}/>

              <Route path="/generateOutfit" element={<GenerateOutfit wardrobeItems={wardrobeItems}/>}/>
              {/* <Route path="/home" component={Home} /> */}
              
              </Routes>
           </Router>
  )
}

export default App;
