import React, { Component } from 'react'
import spinner from './spinner.gif'

const Loading = ()=> {
  
    return (
      <div className='text-center' >
        <img src={spinner} alt="spinner image " style={{width: '50px' , height : '50px'}} />
      </div>
    )
  
}

export default Loading
