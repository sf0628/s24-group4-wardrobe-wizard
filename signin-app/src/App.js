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
  };

  return(  <Router>
           <Routes>
           <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/mycloset" element={<MyCloset />} />
            <Route path="/formInput" element={<FormInput />} />
            <Route path="/login" element={<LoginSignup/>}/>
             {/* <Route path="/home" component={Home} /> */}
            
             </Routes>
             {/* <Route path="/navbar" component={NavBar}/> */}
           </Router>
  )
  // return (
  //   <div className="App">
  //     <Router>
  //       <Routes>
  //         <Route path="/signin" component={SignInForm} />
  //         <Route path="/" element={MyCloset} />
  //         {/* <Route path="/home" component={Home} /> */}
          
  //         </Routes>
  //         <Route path="/navbar" component={NavBar}/>
  //       </Router>

  //     {/* Which way is better? Above or below: */}
  //     {/* <SignInForm />
  //     <MyCloset onAddItem={handleAddItem} /> */}
      
  //      {/* {closet items} */}
  //     {closetItems.length > 0 && (
  //       <div>
  //         <h2>My Closet</h2>
  //         <ul>
  //           {closetItems.map((item, index) => (
  //             <li key={index}>{`${item.name} - ${item.type}`}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     )}     
  //     </div>
  // );
}

export default App;
