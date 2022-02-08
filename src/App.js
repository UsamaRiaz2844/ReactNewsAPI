import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';
import { render } from "react-dom";
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// require('dotenv').config()



import React, { useState } from 'react'

// import PropTypes from 'prop-types'

const App = ()=> {
  const [progress , setProgress] = useState(0) 
 
 const pageSize = 15 ;
  const apiKey = 'fa25ff2ee09b4ac68803835271ddcd97'
 


    return (
      
      
      <div>

      
      <Router>
      <LoadingBar
        color='#f11946'
        height={5}
        progress={progress}
       
      />
       <NavBar/>
     
     
      <Routes>
      <Route exact path="/" element={<News apiKey={apiKey}  setProgress={setProgress} key="general" pageSize={pageSize} country='in' category="general"/>} />
        <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country='in' category="health"/>} />
        <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country='in' category="business"/>} />
        <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country='in' category="entertainment"/>} />
        <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country='in' category="general"/>} />
        <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country='in' category="technology"/>} />
        <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country='in' category="science"/>} />
        <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country='in' category="sports"/>} />
        
      
    </Routes>

      </Router>
      
</div>
    )
    
  
}

export default App

