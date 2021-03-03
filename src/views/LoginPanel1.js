import { useAuth } from "providers/AuthProvider";
import { useRef, useState } from "react";
import styled from "styled-components";
import BounceButton from "./BounceButton";
import { animated } from "react-spring";
import { useShakeAnim } from "commons/SharedAnim";
import LoadingAnim from "views/LoadingAnim";

//=================== 邀请码输入框 ===========================
function InvitationCode({reference, style, ...rest}) {
    //使用抖动效果，使x方向抖动，幅度为 2ch
    const [animStyle, triggerShaking] = useShakeAnim(i=>`translate3d(${i*2}ch, 0, 0)`); 
    //用于将抖动触发函数通过 reference 传第到组件外部
    reference.current = { triggerShaking };

    return (
        <Input type = 'password'
        placeholder = 'INVITATION CODE'
        style = {{ ...animStyle, ...style }}
        {...rest}
        />
    );
}

export default function LoginPanel1() {
	const auth = useAuth(); //用于获得登录函数 auth.login();
    const inputRef = useRef(); //输入框引用，用于在外部调用输入框内部的抖动函数 inputRef.current.triggerShaking()
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

	const onClick = async ()=>{
        //防止正在登录验证时点击Login按钮
        if(isLoading) 
            return;

        setLoading(true); //开始显示 loading 动画
        const isSuccess = await auth.login('stephen@invited.com', password); //等待登录成功
        setLoading(false);  //结束 loading 动画

        if(!isSuccess) {
            setError('Invalid invitation code!');
            inputRef.current.triggerShaking(); //触发输入框抖动效果
        } 
	};

    //输入的东西显示到输入框
    const onChange = (e)=> {
        setPassword(e.target.value);
        setError(null);
    };

	return (
        <>
            <InvitationCode reference={inputRef} value={password} onChange={onChange} />
            <Button onClick={onClick}> LOGIN </Button>
            { !isLoading && error && <ErrorMsg>{error}</ErrorMsg> }
            { isLoading && <LoadingAnim/> }
        </>
	)
}


//======================= style ==========================
const ErrorMsg = styled.p `
    color: #fad692;
    text-shadow: 0px 0px 13px rgba(0, 0, 0, 0.5);
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
    background-color: #53c6b1;
    border-radius: 4ch;
`;
