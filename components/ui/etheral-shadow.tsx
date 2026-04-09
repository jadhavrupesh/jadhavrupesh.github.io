'use client';

import React, { useRef, useId, useEffect, CSSProperties, ReactNode } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';

/** Same assets as [21st.dev ethereal-shadow](https://cdn.21st.dev/jatin-yadav05/etheral-shadow/default/bundle.1748341770116.html) — Framer-hosted mask + grain. */
const DEFAULT_MASK_URL =
    'https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png';
const DEFAULT_NOISE_URL =
    'https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png';

interface ResponsiveImage {
    src: string;
    alt?: string;
    srcSet?: string;
}

interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

export interface ShadowOverlayProps {
    type?: 'preset' | 'custom';
    presetIndex?: number;
    customImage?: ResponsiveImage;
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    maskImageUrl?: string;
    noiseImageUrl?: string;
    style?: CSSProperties;
    className?: string;
    children?: ReactNode;
}

export type EtherealShadowProps = ShadowOverlayProps;

function mapRange(
    value: number,
    fromLow: number,
    fromHigh: number,
    toLow: number,
    toHigh: number
): number {
    if (fromLow === fromHigh) {
        return toLow;
    }
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
    const id = useId();
    const cleanId = id.replace(/:/g, '');
    return `shadowoverlay-${cleanId}`;
};

export function Component({
    sizing = 'fill',
    color = 'rgba(128, 128, 128, 1)',
    animation,
    noise,
    style,
    className,
    maskImageUrl = DEFAULT_MASK_URL,
    noiseImageUrl = DEFAULT_NOISE_URL,
    children,
}: ShadowOverlayProps) {
    const id = useInstanceId();
    const animationEnabled = animation && animation.scale > 0;
    const feColorMatrixRef = useRef<SVGFEColorMatrixElement>(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

    const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

    useEffect(() => {
        if (feColorMatrixRef.current && animationEnabled) {
            if (hueRotateAnimation.current) {
                hueRotateAnimation.current.stop();
            }
            hueRotateMotionValue.set(0);
            hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
                duration: animationDuration / 25,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
                ease: 'linear',
                delay: 0,
                onUpdate: (value: number) => {
                    if (feColorMatrixRef.current) {
                        feColorMatrixRef.current.setAttribute('values', String(value));
                    }
                },
            });

            return () => {
                if (hueRotateAnimation.current) {
                    hueRotateAnimation.current.stop();
                }
            };
        }
    }, [animationEnabled, animationDuration, hueRotateMotionValue]);

    return (
        <div
            className={className}
            style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                height: '100%',
                ...style,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: -displacementScale,
                    filter: animationEnabled ? `url(#${id}) blur(4px)` : 'none',
                }}
            >
                {animationEnabled && animation && (
                    <svg style={{ position: 'absolute' }} aria-hidden>
                        <defs>
                            <filter
                                id={id}
                                x="-50%"
                                y="-50%"
                                width="200%"
                                height="200%"
                                colorInterpolationFilters="sRGB"
                            >
                                <feTurbulence
                                    type="turbulence"
                                    numOctaves="2"
                                    seed="0"
                                    baseFrequency={`${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`}
                                    result="undulation"
                                />
                                <feColorMatrix
                                    ref={feColorMatrixRef}
                                    in="undulation"
                                    type="hueRotate"
                                    values="180"
                                    result="undulationHue"
                                />
                                <feColorMatrix
                                    in="undulationHue"
                                    type="matrix"
                                    values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                                    result="circulation"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="circulation"
                                    scale={displacementScale}
                                    result="dist"
                                />
                                <feDisplacementMap
                                    in="dist"
                                    in2="undulation"
                                    scale={displacementScale}
                                    result="output"
                                />
                            </filter>
                        </defs>
                    </svg>
                )}
                <div
                    style={{
                        backgroundColor: color,
                        maskImage: `url('${maskImageUrl}')`,
                        WebkitMaskImage: `url('${maskImageUrl}')`,
                        maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
                        WebkitMaskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </div>

            {children != null && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        zIndex: 10,
                    }}
                >
                    {children}
                </div>
            )}

            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("${noiseImageUrl}")`,
                        backgroundSize: noise.scale * 200,
                        backgroundRepeat: 'repeat',
                        opacity: noise.opacity / 2,
                    }}
                />
            )}
        </div>
    );
}

export const EtherealShadow = Component;
