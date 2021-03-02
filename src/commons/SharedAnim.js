//通用特定的动画hook
import { useRef, useState } from 'react';
import { useSpring } from 'react-spring';

//===================== useScaleAnim ======================
/**
 * @description useScaleAnim 使用弹动动画
 * @param {number} initScale - 初始scale
 * @param {object} config - （可选）spring 的 config 物理参数  
 * @return {[style:object, setScale:function]} [style, setScale], setScale 为 async 函数, 动画结束时 resolve
 */
export function useScaleAnim(initScale, config) {
	const [props, set] = useSpring(()=>({ 
		scale: initScale, 
		config: config || { mass: 1, tension: 370, friction: 10 }
	}));

	const style = { transform: props.scale.interpolate(v=>`scale(${v})`) };

	const setScale = (newScale, config)=>{
		return new Promise((resolve, reject)=>{
			const props = { 
				scale: newScale, 
				onRest: resolve,    //当spring那边通过onRest调用resolve时，执行此参数的then回调，也可以await
			};

			if(config) {
				props.config = config;
			}
			set(props);
		});
	};

	return [style, setScale];
}

//===================== useHorzShake ======================
/**
 * @description useShakeAnim 弹动动画hook
 * @param {number} transformFunc - 如 i=>`translate3d(${i}px, 0, 0)`, x∈[0,1]
 * @param {object} config - （可选）spring 的 config 物理参数  
 * @return {[style:object, trigger:function]}
 */
export function useShakeAnim(transformFunc, config) {
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
		return new Promise((resolve, reject)=>{
			state.current = !state.current;
			set({ 
				percentage: state.current? 1:0,
				onRest: resolve,    //当spring那边通过onRest调用resolve时，执行此参数的then回调，也可以await
			});
		});
	};

	return [style, trigger];
}