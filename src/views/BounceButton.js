import { useScaleAnim } from "commons/SharedAnim";
import { Css } from "commons/SharedStyle";
import { memo } from "react";
import { animated } from "react-spring";
import styled from "styled-components";

export default memo( function BounceButton({className, children, onMouseDown, onMouseUp, ...rest}) {
    const [style, setScale] = useScaleAnim(1); //使用缩放效果，用默认的弹动设置

    const newOnMouseDown = ()=> {
        setScale(0.9); //按下时缩小
        onMouseDown && onMouseDown(); //合并外部传第的onMouseDown()
    };

    const newOnMouseUp = ()=> {
        setScale(1); //放开时回到原来大小
        onMouseUp && onMouseUp(); //合并外部传第的onMouseDown()
    };

    return (
        <Button className = {className} 
        style = {style} 
        onMouseDown = {newOnMouseDown}
        onMouseUp = {newOnMouseUp}
        {...rest} >
            {children}
        </Button>
    );
})


const Button = styled(animated.button) `
    height: 6ch;
	width: 30ch;
    margin: 1.5ch;
    color: white;
    background-color: #ff80c0;
    border-radius: 4ch;
    border: none;
    cursor: pointer;
    overflow: hidden;

    ${Css.flex_col.vert.center}
	${Css.flex_col.horz.center}

    /* 从左往右的闪光效果， css transition 动画 */
    ${Css.hover_blink.forward}
	${Css.hover_blink.backward}

    :focus{
        outline: none;
    }

    
`;