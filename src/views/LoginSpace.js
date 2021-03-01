import { useSpring, animated } from 'react-spring';
import styled, { css } from "styled-components";
import { Css } from 'commons/SharedStyle';
import { useCallback, useRef } from 'react';

import Blue from "assets/blue_planet.svg";
import Cyan from "assets/cyan_planet.svg";
import Earth from "assets/earth.svg";
import Jupiter from "assets/jupiter.svg";
import Moon from "assets/moon.svg";
import Orange from "assets/orange_planet.svg";
import Red from "assets/red_planet.svg";
import Ring from "assets/ring_planet.svg";
import Star from "assets/star.svg";


function Panel({x, y, slowDown, springProps, children}) {
    const trans = (tx, ty) => `translate3d(${tx/slowDown + x}px, ${ty/slowDown + y}px,0)`;
    const style = { transform: springProps.xy.interpolate(trans) };
    return (
        <PanelDiv style={style}>
            {children}
        </PanelDiv>
    );
}

function Planet({svg, x, y, w, slowDown, springProps}) {
    const trans = (tx, ty) => `translate3d(${tx/slowDown + x}px, ${ty/slowDown + y}px, 0)`;
    const style = { width:`${w}ch`, transform: springProps.xy.interpolate(trans) };
    return (
        <Img src={svg} style={style} />
    );
}

export default function LoginSpace({ children }) {
    const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 600, friction: 100 } }));
    const calc = useCallback( (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2] );

    return (
        <Container onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
            <StarImg src={Star} x={800} y={-200} w={5} />
            <StarImg src={Star} x={-800} y={-100} w={2.5} />
            <StarImg src={Star} x={600} y={300} w={3.5} />
            <StarImg src={Star} x={730} y={-170} w={2} />
            <StarImg src={Star} x={-400} y={200} w={2} />
            <StarImg src={Star} x={-300} y={260} w={4} />
            <StarImg src={Star} x={300} y={-50} w={4} />
            <StarImg src={Star} x={50} y={-350} w={5} />
            <StarImg src={Star} x={150} y={-330} w={2} />

            <Planet svg={Orange} x={550} y={-200} w={14} slowDown={52} springProps={props} />
            <Planet svg={Jupiter} x={400} y={-290} w={30} slowDown={35} springProps={props} />
            <Planet svg={Ring} x={-200} y={-120} w={120} slowDown={23} springProps={props} />
            <Planet svg={Blue} x={570} y={100} w={16} slowDown={18} springProps={props} />
            <Planet svg={Red} x={150} y={150} w={44} slowDown={10} springProps={props} />
            <Planet svg={Cyan} x={-300} y={-220} w={15} slowDown={5} springProps={props} />
            <Planet svg={Earth} x={-330} y={-180} w={20} slowDown={3} springProps={props} />
            <Planet svg={Moon} x={-380} y={-150} w={6} slowDown={2.5} springProps={props} />
            <Panel  x={0} y={0} slowDown={40} springProps={props} >{children}</Panel>
        </Container>
    )
}

//======================= style ==========================
//#212F40, #4f719b
const Container = styled.div `
    height: 100%;
    width: 100%;
	overflow: hidden;
    /* color: #003e3e; */
    background-image: linear-gradient(150deg,  #4f719b,  #583056 , #003e3e);
    ${Css.flex_col.vert.center}
    ${Css.flex_col.horz.center}
`;

const Img = styled(animated.img) `
    position: absolute;
    will-change: transform;
    -webkit-filter: drop-shadow( 0px 0px 6px rgba(255, 255, 255, 0.3));
    filter: drop-shadow( 0px 0px 6px rgba(255, 255, 255, 0.3));
`;

const StarImg = styled.img `
    position: absolute;
    width: ${props=>props.w}ch;
    transform: translate3d( ${props=>props.x}px, ${props=>props.y}px, 0);
    -webkit-filter: drop-shadow( 0px 0px 10px rgba(255, 255, 255, 0.8));
    filter: drop-shadow( 0px 0px 10px rgba(255, 255, 255, 0.8));
`;

const PanelDiv = styled(animated.div) `
    height: 48ch;
    width: 45ch;
	overflow: hidden;
    border-radius: 4ch;
    background-color: rgba(255, 255, 255, 0.2);
    -webkit-backdrop-filter: blur(10px);
    -webkit-filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.6));
    filter: drop-shadow( 0px 0px 10px rgba(0, 0, 0, 0.6));
    backdrop-filter: blur(10px);
    ${Css.flex_col.vert.center}
    ${Css.flex_col.horz.center}
`;
