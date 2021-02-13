import './App.css';
import * as tf from '@tensorflow/tfjs'
import * as WebCam from 'react-webcam' 
import { useEffect, useState } from 'react';

function App() {

  	return (
 		<div className="App">
      		<WebCam></WebCam>
    	</div>
	);
}

export default App;
