import { useAuth } from "providers/AuthProvider";
import { Css } from "commons/SharedStyle";
import styled from "styled-components";

export default function Profile() {
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
	background-color: lightseagreen;
	${Css.flex_col.vert.in_out_space}
	${Css.flex_col.horz.left}
`