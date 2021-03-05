import { Css } from "commons/SharedStyle";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { peerServerID } from 'commons/constants';

export default function GroupChat() {
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("Waiting for connection...");
	const [id, setId] = useState('');
	const peer = useRef(null);
	const connection = useRef(null);
	 
	useEffect(() => {
		peer.current = new Peer(null, {debug: 2});
		peer.current.on("open", (id) => {
			setId(id);
		});
	}, []);

	const onClick = ()=> {
		connection.current = peer.current.connect(peerServerID, { reliable: true });

		connection.current.on("open", () => {
			setStatus("Connected");
			connection.current.send("Hello!");
		});
	
		connection.current.on("data", (data) => {
			setMessage(data);
		});
	};

	return (
		<Div>
			<p>Status: {status}</p>
			<p>message: {message}</p>
			<p>id: {id}</p>
			<button onClick={onClick}>connect</button>
		</Div>
	)
}

const Div = styled.div `
	height: 400px;
	width: 100%;
	background-color: lightcyan;
	${Css.flex_col.vert.center}
	${Css.flex_col.horz.center}
	user-select: text;
`