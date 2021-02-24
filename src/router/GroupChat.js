import { useAuth } from "modules/Auth";
import { Css } from "modules/SharedStyle";
import { useEffect } from "react";
import styled from "styled-components";

export default function GroupChat() {
	const auth = useAuth();

	return (
		<Div>
			{auth.user && auth.user.email}
		</Div>
	)
}

const Div = styled.div `
	height: 400px;
	width: 100%;
	background-color: lightcyan;
	${Css.flex_col.vert.in_out_space}
	${Css.flex_col.horz.left}
`