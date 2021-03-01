import { useAuth } from "providers/AuthProvider";
import { useChatUser } from "providers/ChatUserProvider";
import { Css } from "commons/SharedStyle";
import styled from "styled-components";
import LoginSpace from "views/LoginSpace";
import LoginPanel1 from "views/LoginPanel1";
import LoginPanel2 from "views/LoginPanel2";
import { animated } from "react-spring";
import { useScaleBounce } from "commons/SharedAnim";
import { useEffect, useRef, useState } from "react";

function PopupContainer({reference, children}) {
	const [style, setScale] = useScaleBounce(0);
	
	reference.current = { 
		popup: ()=>setScale(1, { mass: 1, tension: 370, friction: 10 }),  //bounce physics config
		hide: ()=>setScale(0, { mass: 1, tension: 400, friction: 35 })  //no bounce physics config
	};

	return (
		<PopupDiv style={style}>
			{children}
		</PopupDiv>
	);
}

export default function Login() {
	const auth = useAuth();
    const cUser = useChatUser();
	const popupRef = useRef(null);
	const [panelID, setPanelID] = useState(1);

	useEffect(async ()=>{
		if(auth.isInit) {
			if(!auth.user) {
				await popupRef.current.popup();
			}
			else if(!cUser.isReady) {
				await popupRef.current.hide();
				setPanelID(2);
				await new Promise(resolve => setTimeout(resolve, 460));
				popupRef.current.popup();
			}
		}
	},[auth.isInit, auth.user]);

	return (
		<LoginSpace>
			<PopupContainer reference={popupRef}>
				{(panelID===1) && <LoginPanel1/>}
				{(panelID===2) && <LoginPanel2/>}
			</PopupContainer>
		</LoginSpace>
	);
}


//======================= style ==========================
const PopupDiv = styled(animated.div) `
	width: 100%;
	height: 100%;
	overflow: hidden;
	${Css.flex_col.horz.center}
	${Css.flex_col.vert.center}
`;
