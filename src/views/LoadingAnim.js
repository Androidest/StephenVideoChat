import LoadingSVG from "assets/loading.svg"; //载入月亮绕地球的SVG
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

export default function LoadingAnim({className}) {
    // 一定的初速度 + 0 阻力，使动画在启动时就开始无限钟摆, 
    // reset=true 是为了重置动画，防止被多次重渲染时导致初速度为0
    const {i} = useSpring({ i:0, reset:true, config:{mass:70, tensor:1.5, friction: 0, velocity:10} }); 

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