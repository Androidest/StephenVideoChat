import LoadingSVG from "assets/loading.svg";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

export default function LoadingAnim({className}) {
    const {i} = useSpring({ i:0, config:{mass:70, tensor:1.5, friction: 0, velocity:10} });

    return (
        <LoadingImg 
        className = {className}
        src = {LoadingSVG}
        style = {{ transform: i.interpolate(i=>`rotate(${i*45}deg)`) }}
        />
    );
}


//======================= style ==========================
const LoadingImg = styled(animated.img) `
    width : 10ch;
    -webkit-filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.2));
    filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.2));
`;