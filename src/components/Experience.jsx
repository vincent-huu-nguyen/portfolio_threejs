import { OrbitControls } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useSpring, a } from '@react-spring/three';
import { TextureLoader } from "three";
import { useTexture } from "@react-three/drei";

import gradientImage from '../assets/gradient.png';
import walk1 from '../assets/TrainerFrame1.png';
import walk2 from '../assets/TrainerFrame2.png';
import walk3 from '../assets/TrainerFrame3.png';
import walk4 from '../assets/TrainerFrame4.png';

export const Experience = ({ position, size, color, zoomedOut = false }) => {
    const sphereRef = useRef();
    const spriteRef = useRef();
    const scrollDelta = useRef(0);
    const { gl } = useThree();

    const texture = useTexture(gradientImage);
    const walkFrames = useLoader(TextureLoader, [walk1, walk2, walk3, walk4]);
    const [frameIndex, setFrameIndex] = useState(0);
    const elapsedRef = useRef(0);
    const frameDuration = 0.15;
    const lastScrollTime = useRef(0);
    const scrollCooldown = 0.1;

    // Smooth Y spring
    const ySpring = useSpring({
        from: { y: -30 },
        to: { y: -17 },
        config: { tension: 80, friction: 15 },
    });

    const spring = useSpring({
        scale: zoomedOut ? [0.9, 0.9, 0.9] : [1, 1, 1],
        position: zoomedOut ? [0, -2.5, 0] : [0, -1.5, 0],
        config: { tension: 120, friction: 18 },
    });

    useEffect(() => {
        const handleScroll = (e) => {
            scrollDelta.current += e.deltaY * 0.001;
        };
        const canvas = gl.domElement;
        canvas.addEventListener("wheel", handleScroll);
        return () => canvas.removeEventListener("wheel", handleScroll);
    }, [gl]);

    useFrame((state, delta) => {
        if (sphereRef.current) sphereRef.current.rotation.x -= delta * 0.1;

        // Animate sprite only after scroll
        elapsedRef.current += delta;
        if (elapsedRef.current >= frameDuration) {
            elapsedRef.current = 0;
            setFrameIndex((prev) => (prev + 1) % walkFrames.length);
        }

        if (scrollDelta.current !== 0) {
            if (sphereRef.current) sphereRef.current.rotation.x -= scrollDelta.current;
            scrollDelta.current = 0;
            lastScrollTime.current = state.clock.getElapsedTime();
        }

        const timeSinceScroll = state.clock.getElapsedTime() - lastScrollTime.current;
        if (timeSinceScroll < scrollCooldown) {
            elapsedRef.current += delta;
            if (elapsedRef.current >= frameDuration) {
                elapsedRef.current = 0;
                setFrameIndex((prev) => (prev + 1) % walkFrames.length);
            }
        }
    });

    return (
        <>
            <OrbitControls enableZoom={true} enableRotate={true} />

            {/* ✅ Animated sprite */}
            <a.mesh ref={spriteRef} position={spring.position} scale={spring.scale}>
                <planeGeometry args={[1.25, 1.25]} />
                <meshBasicMaterial map={walkFrames[frameIndex]} transparent />
            </a.mesh>


            {/* ✅ Animated group */}
            <a.group ref={sphereRef} position-y={ySpring.y} scale={spring.scale} rotation={[0, 0, Math.PI / 2]}>
                <mesh>
                    <sphereGeometry args={[14.9, 30, 30]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                <mesh>
                    <sphereGeometry args={size} />
                    <meshStandardMaterial map={texture} wireframe />
                </mesh>

                <mesh rotation={[Math.PI / 2, 5, 0]}>
                    <boxGeometry args={[19.9, 19.9, 19.9]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                <mesh rotation={[Math.PI / 2, 5, 0]}>
                    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
                    <meshStandardMaterial map={texture} wireframe />
                </mesh>

                <mesh rotation={[Math.PI / 9, 10, 5]}>
                    <boxGeometry args={[19.9, 19.9, 19.9]} />
                    <meshStandardMaterial color={color} />
                </mesh>

                <mesh rotation={[Math.PI / 9, 10, 5]}>
                    <boxGeometry args={[20, 20, 20, 10, 10, 10]} />
                    <meshStandardMaterial map={texture} wireframe />
                </mesh>
            </a.group>
        </>
    );
};
