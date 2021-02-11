import './App.css';
import io from 'socket.io-client';
import Peer from 'peerjs';
import { useEffect, useState } from 'react';

function App() {

	const [response, setResponse] = useState("");

	useEffect(() => {
		const socket = io('39.98.118.62');
		socket.on("FromAPI", data => {
			setResponse(data);
			socket.emit("test", 'FUCK!');
    	});
	}, []);

  	return (
 		<p>
      		It's <time dateTime={response}>{response}</time>
    	</p>
	);
}

export default App;
