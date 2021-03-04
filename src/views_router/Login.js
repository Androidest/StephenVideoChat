import { useAuth } from "providers/AuthProvider";
import { Css } from "commons/SharedStyle";
import styled from "styled-components";
import LoginSpace from "views/LoginSpace";
import LoginPanel1 from "views/LoginPanel1";
import LoginPanel2 from "views/LoginPanel2";
import { useEffect, useRef, useState } from "react";
import PopupContainer from "views/PopupContainer";

//分割出来的动态组件，防止状态刷新时重渲染LoginSpace组件
function PanelSwitcher() {
	const auth = useAuth();
	const popupRef = useRef(null);  //PopupContainer的引用
	const [panelID, setPanelID] = useState(1); //面板ID

	useEffect(async ()=>{
		if(auth.isInit) {
			//若发生自动登录，则无需弹出第一个面板
			if(!auth.user) {
				popupRef.current.popup(300); //延时 300ms 再弹出
			}
			
			else {
				await popupRef.current.hide(); //等待缩回动画结束
				setPanelID(2); //切换到第二个面板
				popupRef.current.popup(400); //延时 400ms 再弹出
			}
		}
	},[auth.isInit, auth.user]);

	return (
		<Popup reference={popupRef} isShownAtStart={false}>
			{(panelID===1) && <LoginPanel1/>}
			{(panelID===2) && <LoginPanel2/>}
		</Popup>
	);
}

//静态组件，不受PanelSwitcher重渲染的影响
export default function Login() {
	return (
		<LoginSpace>
			<PanelSwitcher/>
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
