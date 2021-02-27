import { useAuth } from "providers/AuthProvider";
import { Css } from "commons/SharedStyle";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import { useChatUser } from "providers/ChatUserProvider";

export default function LoginPanel1() {
	const auth = useAuth();
    const cUser = useChatUser();
    const { state:{from} } = useLocation();
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [isError, setError] = useState(false);

	const onClick = async ()=>{
		const isSuccess = await auth.login('stephen@invited.com', password);

        if(isSuccess){
            cUser.setReady(true);
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
        <>
            <InvitationCode value={password} onChange={onChange} />
            <Button onClick={onClick}> LOGIN </Button>
            {isError && 'Wrong Invitation Code!'}
        </>
	)
}


//======================= style ==========================
const InvitationCode = styled.input.attrs(()=>({
    type:'password',
    placeholder:'INVITATION CODE'
}))`
    height: 6ch;
	width: 30ch;
    margin: 1.5ch;
    color: #2c2c4e;
    background-color: white;
    border-radius: 4ch;
    border: none;
    text-align: center;

    :focus{
        outline: none;
    }
`;

//#53c6b1
const Button = styled.button `
    height: 6ch;
	width: 30ch;
    margin: 1.5ch;
    color: white;
    background-color: #53c6b1;
    border-radius: 4ch;
    border: none;

    ${Css.flex_col.vert.center}
	${Css.flex_col.horz.center}
`;
