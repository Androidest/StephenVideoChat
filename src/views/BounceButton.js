import { useScaleBounce } from "commons/SharedAnim";
import { Css } from "commons/SharedStyle";
import { animated } from "react-spring";
import styled from "styled-components";

export default function BounceButton({className, children, onMouseDown, onMouseUp, ...rest}) {
    const [style, setScale] = useScaleBounce(1);

    const newOnMouseDown = ()=> {
        setScale(0.9);
        onMouseDown && onMouseDown();
    };

    const newOnMouseUp = ()=> {
        setScale(1);
        onMouseUp && onMouseUp();
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
}


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

    ${Css.hover_blink.forward}
	${Css.hover_blink.backward}

    :focus{
        outline: none;
    }

    
`;