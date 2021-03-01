import { useChatUser } from "providers/ChatUserProvider";
import { useRef, useState } from "react";
import styled from "styled-components";
import BounceButton from "./BounceButton";
import { animated } from "react-spring";
import { useShake } from "commons/SharedAnim";
import LoadingAnim from "views/LoadingAnim";
import { useHistory, useLocation } from "react-router-dom";
import { HOME } from "views_router/AppRouter";


function UserName({reference, style, ...rest}) {
    const [animStyle, triggerShaking] = useShake(i=>`translate3d(${i*2}ch, 0, 0)`);
    reference.current = { triggerShaking };

    return (
        <Input type = 'text'
        placeholder = 'YOUR USER NAME'
        style = {{ ...animStyle, ...style }}
        {...rest}
        />
    );
}

export default function LoginPanel2() {
    const cUser = useChatUser();
    const inputRef = useRef();
    const [userName, setUserName] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const location = useLocation();
	const history = useHistory();
    

	const onClick = async ()=>{
        // setLoading(true);
        // setLoading(false);
        cUser.setReady(true);
        history.replace(location.state? location.state.from : HOME); 
	};

    const onChange = (e)=> {
        setUserName(e.target.value);
        setError(false);
    };

	return (
        <>
            <UserName reference={inputRef} value={userName} onChange={onChange} />
            { !isLoading && <Button onClick={onClick}> START </Button> }
            { !isLoading && isError && <ErrorMsg>{'Invalid invitation code!'}</ErrorMsg> }
            { isLoading && <LoadingAnim/> }
        </>
	)
}


//======================= style ==========================
const ErrorMsg = styled.p `
    color: #bb005e;
`;


const Input = styled(animated.input) `
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
const Button = styled(BounceButton) `
    height: 6ch;
	width: 30ch;
    margin: 1.5ch;
    color: white;
    background-color: #d071b4;
    border-radius: 4ch;
`;
