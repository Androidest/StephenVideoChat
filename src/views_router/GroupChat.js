import { Css } from "commons/SharedStyle";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export default function GroupChat() {
	

	return (
		<Div>
			
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