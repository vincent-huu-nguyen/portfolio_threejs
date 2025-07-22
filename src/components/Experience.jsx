import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useSpring, a } from "@react-spring/three";
import { TextureLoader } from "three";

import gradientImage from "../assets/gradient.png";
import walk1 from "../assets/TrainerFrame1.png";
import walk2 from "../assets/TrainerFrame2.png";
import walk3 from "../assets/TrainerFrame3.png";
import walk4 from "../assets/TrainerFrame4.png";
import side1 from "../assets/TrainerSide1.png";
import side2 from "../assets/TrainerSide2.png";
import side3 from "../assets/TrainerSide3.png";
import side4 from "../assets/TrainerSide4.png";

export const Experience = ({
    position,
    size,
    color,
    isStartZoomedOut = false,
    isContactZoomedOut = false,
    isPortfolioVisible = false,
}) => {
    const sphereRef = useRef();
    const spriteRef = useRef();
    const scrollDelta = useRef(0);
    const elapsedRef = useRef(0);
    const frameDuration = 0.15;
    const lastScrollTime = useRef(0);
    const scrollCooldown = 0.1;
    const originalCameraPosition = useRef(null);


    const { gl, camera } = useThree();

    const texture = useTexture(gradientImage);
    const walkFrames = useLoader(TextureLoader, [walk1, walk2, walk3, walk4]);
    const sideFrames = useLoader(TextureLoader, [side1, side2, side3, side4]);

    const activeFrames = isPortfolioVisible ? sideFrames : walkFrames;
    const [frameIndex, setFrameIndex] = useState(0);
    const spriteRotation = isPortfolioVisible
        ? [0, Math.PI / 2, 0] // rotate 90° around Y to face side
        : [0, 0, 0]; // default forward


    const spring = useSpring({
        from: {
            scale: [1, 1, 1],
            position: [0, -30, 0],
            sphereY: -30,
        },
        to: {
            scale: isContactZoomedOut
                ? [0.11, 0.11, 0.11]
                : isStartZoomedOut
                    ? [0.9, 0.9, 0.9]
                    : [1, 1, 1],
            position: isContactZoomedOut
                ? [0, -2.8, 0]
                : isStartZoomedOut
                    ? [0, -2.3, 0]
                    : [0, -1.5, 0],
            sphereY: isContactZoomedOut ? -0.2 : -17,
        },
        config: { tension: 120, friction: 18 },
    });

    const spriteSpring = useSpring({
        from: {
            scale: [1, 1, 1],
            position: [0, -30, 0],
        },
        to: {
            position: isPortfolioVisible
                ? [1, -3.1, 0] // 👈 position for Portfolio view
                : isContactZoomedOut
                    ? [0, 0.9, 2]
                    : isStartZoomedOut
                        ? [0, -2.25, 0]
                        : [0, -1.5, 0],
            scale: isPortfolioVisible
                ? [1, 1, 1] // 👈 optionally tweak scale too
                : isContactZoomedOut
                    ? [0.2, 0.2, 0.2]
                    : isStartZoomedOut
                        ? [0.7, 0.7, 0.7]
                        : [1, 1, 1],
        },
        config: { tension: 150, friction: 21 },
    });

    // Log camera position after user interaction
    useEffect(() => {
        const handleCameraChange = () => {
            console.log("📸 Camera Position:", {
                x: camera.position.x.toFixed(2),
                y: camera.position.y.toFixed(2),
                z: camera.position.z.toFixed(2),
            });
            console.log("🎯 Camera Rotation:", {
                x: camera.rotation.x.toFixed(2),
                y: camera.rotation.y.toFixed(2),
                z: camera.rotation.z.toFixed(2),
            });
        };

        gl.domElement.addEventListener("pointerup", handleCameraChange);
        return () => gl.domElement.removeEventListener("pointerup", handleCameraChange);
    }, [camera, gl]);

    useEffect(() => {
        if (!originalCameraPosition.current) {
            originalCameraPosition.current = camera.position.clone();
        }
    }, [camera]);


    useEffect(() => {
        const handleScroll = (e) => {
            scrollDelta.current += e.deltaY * 0.001;
        };
        const canvas = gl.domElement;
        canvas.addEventListener("wheel", handleScroll);
        return () => canvas.removeEventListener("wheel", handleScroll);
    }, [gl]);

    useEffect(() => {
        if (!originalCameraPosition.current) return;

        const targetPosition = isPortfolioVisible
            ? { x: 7, y: -3, z: 0 } // 👈 Portfolio view
            : originalCameraPosition.current; // 👈 Return to default

        const duration = 1000;
        const start = performance.now();
        const from = { ...camera.position };

        const animate = (now) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);

            camera.position.x = from.x + (targetPosition.x - from.x) * t;
            camera.position.y = from.y + (targetPosition.y - from.y) * t;
            camera.position.z = from.z + (targetPosition.z - from.z) * t;
            camera.lookAt(0, 0, 0);

            if (t < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [isPortfolioVisible, camera]);



    useFrame((state, delta) => {
        if (sphereRef.current) sphereRef.current.rotation.x -= delta * 0.1;

        // Animate sprite
        elapsedRef.current += delta;
        if (elapsedRef.current >= frameDuration) {
            elapsedRef.current = 0;
            setFrameIndex((prev) => (prev + 1) % walkFrames.length);
        }

        // Scroll interaction
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
            {/* ✅ Orbit Controls must be present as JSX */}
            <OrbitControls enableZoom={true} enableRotate={true} />

            {/* ✅ On-screen camera position display */}
            <Html position={[0, 5, 0]} center>
                <div
                    style={{
                        background: "rgba(0, 0, 0, 0.6)",
                        color: "white",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        opacity: "0%" //make it invisible
                    }}
                >
                    {`📷 Camera: (${camera.position.x.toFixed(2)}, ${camera.position.y.toFixed(2)}, ${camera.position.z.toFixed(2)})`}
                </div>
            </Html>

            {/* ✅ Sprite character */}
            <a.mesh
                ref={spriteRef}
                position={spriteSpring.position}
                scale={spriteSpring.scale}
                rotation={spriteRotation} // 👈 add this
            >
                <planeGeometry args={[1.25, 1.25]} />
                <meshBasicMaterial map={activeFrames[frameIndex]} transparent />
            </a.mesh>

            {/* ✅ Sphere & rotating scene */}
            <a.group
                ref={sphereRef}
                position-y={spring.sphereY}
                scale={spring.scale}
                rotation={[0, 0, Math.PI / 2]}
            >
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
