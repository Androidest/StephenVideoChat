import { Css } from "commons/SharedStyle";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { peerServerID } from 'commons/constants';


export default function Home() {
	
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("Waiting for connection...");
	const [id, setId] = useState('');
	const peer = useRef(null);
	 
	useEffect(() => {
		peer.current = new Peer(peerServerID, {debug: 2});
		peer.current.on("open", (id) => {
			setId(id);
		});
		
		peer.current.on("connection", (connection) => {
			setStatus("Connected");

			connection.on("data", (data) => {
				setMessage(data);
			});

			connection.on("open", () => {
				connection.send("Hello!");
			});
		});

		peer.current.on('error', function (err) {
			console.log(err);
		});

	}, []);

	return (
		<Div>
			<p>Status: {status}</p>
			<p>message: {message}</p>
			<p>id: {id}</p>
		</Div>
	)
}

const Div = styled.div `
	height: 400px;
	width: 100%;
	background-color: lightcoral;
	${Css.flex_col.vert.center}
	${Css.flex_col.horz.center}
	user-select: text;
`