import { useAuth } from "modules/Auth";
import { useEffect, useState } from "react";
import { Css } from "modules/SharedStyle";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

export default function Login() {
	const auth = useAuth();
    const { state:{from} } = useLocation();
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [isError, setError] = useState(false);

	const login = async ()=>{
		const isSuccess = await auth.login('stephen@invited.com', password);

        if(isSuccess){
            history.replace(from);
        }else {
            setError(true);
        } 
	};

    const onChange = (e)=> {
        setPassword(e.target.value);
        setError(false);
    }

	return (
		<Div>
            <InvitationCode value={password} onChange={onChange} />
            <Button onClick={login}> LOGIN </Button>
			{isError && 'Wrong Invitation Code!'}
		</Div>
	)
}


//======================= style ==========================
const InvitationCode = styled.input.attrs(()=>({
    type:'password',
    placeholder:'PASSWORD'
}))`
    height: 40px;
	width: 200px;
    color: black;
    background-color: white;

    border-radius: 25px;
    border-color: white;
    border-width: 1px;
    border: solid;

    ${Css.flex_col.vert.center}
	${Css.flex_col.horz.center}
`;

const Button = styled.button `
    height: 40px;
	width: 200px;
    color: white;
    background-color: #abaae6;

    border-radius: 25px;
    border-color: white;
    border-width: 1px;
    border: solid;

    ${Css.flex_col.vert.center}
	${Css.flex_col.horz.center}
`;

const Div = styled.div `
	height: 400px;
	width: 100%;
	background-color: lightblue;
	${Css.flex_col.vert.center}
	${Css.flex_col.horz.center}
`;