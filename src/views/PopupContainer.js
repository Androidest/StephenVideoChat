import { useScaleAnim } from "commons/SharedAnim";
import styled from "styled-components";
import { animated } from "react-spring";
import { memo } from "react";

export default memo( function PopupContainer({reference, isPopup, isShownAtStart, children, className}) {
	const [style, setScale] = useScaleAnim(isShownAtStart? 1 : 0); //设置初始大小

	const handler = { 
		//弹出
		popup: async (delay)=>{ 
			//若定义delay，则延时弹出
			delay && (await new Promise(resolve => setTimeout(resolve, delay))); //延时
			return setScale(1, { mass: 1, tension: 370, friction: 10 });  //弹动效果的物理参数
		},
		
		//缩回
		hide: async (delay)=>{ 
			//若定义delay，则延时弹出
			delay && (await new Promise(resolve => setTimeout(resolve, delay))); //delay
			return setScale(0, { mass: 1, tension: 400, friction: 35 });  //没有弹动效果的物理参数
		}
	};
	
	//通过reference 或 isPopup 来控制弹出缩回，两种方法
	if(reference) {
		//用于外部调用PopupContainer的 popup() 和 hide()
		reference.current = handler;
	}
	else if(isPopup) {
		//用于通过props控制 popup 的 isPopup 控制弹出
		handler.popup();
	}
	else {
		//用于通过props 的 isPopup 控制隐藏
		handler.hide();
	}
	
	return (
		<PopupDiv style={style} className={className}>
			{children}
		</PopupDiv>
	);
})

//======================= style ==========================
const PopupDiv = styled(animated.div) `
	width: 100%;
	height: 100%;
`;
