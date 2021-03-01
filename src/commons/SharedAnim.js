import { callbacks } from '@tensorflow/tfjs';
import { useCallback, useRef, useState } from 'react';
import { useSpring } from 'react-spring';

//===================== useScaleBounce ======================
/**
 * @description useScaleBounce 弹动动画hook
 * @param {number} initScale - 初始scale
 * @param {object} config - （可选）spring 的 config 物理参数  
 * @return {[style:object, setScale:function, set:function]}
 */
export function useScaleBounce(initScale, config) {
	const [props, set] = useSpring(()=>({ 
		scale: initScale, 
		config: config || { mass: 1, tension: 370, friction: 10 }
	}));

	const style = { transform: props.scale.interpolate(v=>`scale(${v})`) };

	const setScale = (newScale, config)=>{
		return new Promise((resolve, reject)=>{
			set({ 
				scale: newScale, 
				onRest: resolve,    //当spring那边通过onRest调用resolve时，执行此参数的then回调，也可以await
				config: config || { mass: 1, tension: 370, friction: 10 }
			});
		});
	};

	return [style, setScale];
}

//===================== useHorzShake ======================
/**
 * @description useShake 弹动动画hook
 * @param {number} transformFunc - 如 i=>`translate3d(${i}px, 0, 0)`, x∈[0,1]
 * @param {object} config - （可选）spring 的 config 物理参数  
 * @return {[style:object, setScale:function]}
 */
export function useShake(transformFunc, config) {
	const state = useRef(false);
	const [props, set] = useSpring(()=>({ 
		percentage: 0,
		config: config || { mass: 1, tension: 470, friction: 5 }
	}));

	const style = { 
		transform: props.percentage
		.interpolate({ range: [0, 0.5, 1], output: [0, 1, 0] })
		.interpolate(transformFunc)
	};

	const trigger = ()=>{
		state.current = !state.current;
		set({ percentage: state.current? 1:0 });
	};

	return [style, trigger];
}