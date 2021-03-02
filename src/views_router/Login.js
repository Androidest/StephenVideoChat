import { useAuth } from "providers/AuthProvider";
import { useChatUser } from "providers/ChatUserProvider";
import { Css } from "commons/SharedStyle";
import styled from "styled-components";
import LoginSpace from "views/LoginSpace";
import LoginPanel1 from "views/LoginPanel1";
import LoginPanel2 from "views/LoginPanel2";
import { useEffect, useRef, useState } from "react";
import PopupContainer from "views/PopupContainer";


export default function Login() {
	const auth = useAuth();
    const cUser = useChatUser();
	const popupRef = useRef(null);  //PopupContainer的引用
	const [panelID, setPanelID] = useState(1); //面板ID

	useEffect(async ()=>{
		if(auth.isInit) {
			//若发生自动登录，则无需弹出第一个面板
			if(!auth.user) {
				popupRef.current.popup(300); //延时 300ms 再弹出
			}
			
			else if(!cUser.isReady) {
				await popupRef.current.hide(); //等待缩回动画结束
				setPanelID(2); //切换到第二个面板
				popupRef.current.popup(400); //延时 400ms 再弹出
			}
		}
	},[auth.isInit, auth.user]);

	return (
		<LoginSpace>
			<Popup reference={popupRef} isShownAtStart={false}>
				{(panelID===1) && <LoginPanel1/>}
				{(panelID===2) && <LoginPanel2/>}
			</Popup>
		</LoginSpace>
	);
}

//======================= style ==========================
const Popup = styled(PopupContainer) `
	width: 100%;
	height: 100%;
	overflow: hidden;
	${Css.flex_col.horz.center}
	${Css.flex_col.vert.center}
`;
