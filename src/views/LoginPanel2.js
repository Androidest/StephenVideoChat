import { useChatUser, useMe } from "providers/ChatUserProvider";
import { useRef, useState } from "react";
import styled from "styled-components";
import BounceButton from "./BounceButton";
import { animated } from "react-spring";
import { useScaleAnim, useShakeAnim } from "commons/SharedAnim";
import LoadingAnim from "views/LoadingAnim";
import { useHistory, useLocation } from "react-router-dom";
import { HOME } from "views_router/AppRouter";
import { Css } from "commons/SharedStyle";


function UserPhoto({reference, src, onChange}) {
    const [shakeStyle, triggerShaking] = useShakeAnim(i=>`translate3d(${i*1.5}ch, 0, 0)`); //出错时的抖动动画
    const [scaleStyle, setScale] = useScaleAnim(1); //点击时的缩放动画
    const [animStyle, setStyle] = useState(scaleStyle);  //用于切换抖动和缩放动画
    const id = 'login_user_photo'; //用来关联 label 和 input 组件

    //此组件的引用，用于导出动画触发函数给外部使用
    reference.current = { 
        triggerShaking: ()=>{ 
            setStyle(shakeStyle); //触发动画前先设置成抖动动画
            triggerShaking();
        }
    };

    return (
        <>
            <Label
            htmlFor = {id}
            onMouseDown = {()=>{ setStyle(scaleStyle); setScale(0.85); }}
            onMouseUp = {()=>{ setStyle(scaleStyle); setScale(1); }}
            style = {animStyle}>
                <Img src={src} />
            </Label>

            <FileInput 
            id = {id}
            type = 'file'
            accept = 'image/*'
            onChange = {onChange}
            />
        </>
    );
}

function UserName({reference, ...rest}) {
    const [style, triggerShaking] = useShakeAnim(i=>`translate3d(${i}ch, 0, 0)`); //出错时的抖动动画
    reference.current = { triggerShaking }; //此组件的引用，用于导出动画触发函数给外部使用

    return (
        <Input type = 'text'
        placeholder = 'YOUR USER NAME'
        style = {style}
        {...rest}
        />
    );
}

export default function LoginPanel2() {
    const { setReady } = useChatUser(); //context 数据
    const { me: {name, photoURL}, setName, setPhoto } = useMe(); //context 数据
    const nameRef = useRef(); //用户名输入框的引用
    const photoRef = useRef(); //头像框的引用
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
	const history = useHistory();

	const onClick = async ()=>{
        try {
            setError(null);
            setName(name, true); //true 代表name为最终确定的名字
            // setLoading(true);
            // setLoading(false);
            setReady(true);
            history.replace(location.state? location.state.from : HOME); 
        }
        //setName() 无效时丢出错误
        catch(error) {
            setError(error); //错误信息
            nameRef.current.triggerShaking(); //触发输入框抖动效果
        }
	};

    const onNameChange = (event)=> {
        try {
            setError(null);
            setName( event.target.value, false ); //false 代表目前输入的名字是临时的
        }
        //setName() 无效时丢出错误
        catch(error) {
            setError(error);
            nameRef.current.triggerShaking(); //触发输入框抖动效果
        }
    };

    const onFileChange = (event)=> {
        //用户直没有选择文件，接关闭文件选择窗口时
        if(!event.target.files || !event.target.files[0]) { 
            return;
        } 
        try {
            setError(null);
            setPhoto(event.target.files[0]);
        }
        //setPhoto() 无效时丢出错误
        catch(error) {
            setError(error);
            photoRef.current.triggerShaking(); //触发输入框抖动效果
        }
    }   

	return (
        <>
            <UserPhoto reference={photoRef} src={photoURL}  onChange={onFileChange}/>
            <UserName reference={nameRef} value={name} onChange={onNameChange} />
            { !isLoading && <Button onClick={onClick}> START </Button> }
            { !isLoading && error && <ErrorMsg>{error}</ErrorMsg> }
            { isLoading && <LoadingAnim/> }
        </>
	)
}


//======================= style ==========================
const Label = styled(animated.label) `
    width: 15ch;
    height: 15ch;
    margin: 1.5ch;
    border-radius: 10ch;
    border: none;
    overflow: hidden;
    box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    ${Css.hover_blink.forward}
    ${Css.hover_blink.backward}
    
    ${Css.flex_col.horz.center}
    ${Css.flex_col.vert.center}
    :after {
        border-radius: 0ch;
    }
`;

const ErrorMsg = styled.p `
    color: #fad692;
    text-shadow: 0px 0px 13px rgba(0, 0, 0, 0.5);
`;

const Img = styled.img `
    height: 100%;
	width:  100%;
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

const FileInput = styled.input `
    height: 0;
	width: 0;
    opacity: 0;
    border: none;
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
