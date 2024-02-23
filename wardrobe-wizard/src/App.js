//import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
// App.js or your routing file
// import { Switch } from 'react-router-dom';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import SignInForm from './components/SignInForm';
import MyCloset from './components/MyCloset';
import Home from './components/Home';
import FormInput from './components/FormInput';
import LoginSignup from './components/LoginSignup/LoginSignup';

// import Navbar from './NavBar';

function App() {
  const [closetItems, setClosetItems] = useState([]);

  const handleAddItem = (newItem) => {
    setClosetItems([...closetItems, newItem]);
    console.log('New Item:', newItem);
  };

  return(  <Router>
           <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/mycloset" element={<MyCloset onAddItem={handleAddItem}/>} />
            <Route path="/formInput" element={<FormInput />} />
            <Route path="/login" element={<LoginSignup/>}/>
             {/* <Route path="/home" component={Home} /> */}
            
             </Routes>
             {/* <Route path="/navbar" component={NavBar}/> */}
           </Router>
  )
}

export default App;
