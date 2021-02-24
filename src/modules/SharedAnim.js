import { useSpring } from 'react-spring';

export function useScaleBounce(initScale) {
	const [style, set] = useSpring(()=>({ 
		scale: initScale, 
		config: { mass: 1, tension: 370, friction: 10 } 
	}));

	style.transform = style.scale.interpolate(v=>`scale(${v})`);

	const setScale = (newScale)=>{
		set({ scale: newScale });
	}

	return [style, setScale];
}