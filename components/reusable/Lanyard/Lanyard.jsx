'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import styles from './Lanyard.module.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_MODEL = '/assets/lanyard/card.glb';
const LANYARD_TEXTURE = '/assets/lanyard/lanyard.png';
const PROFILE_IMAGE = '/assets/lanyard/profile.png';
const BACK_IMAGE = '/assets/lanyard/lanyard-back.png';
const CARD_SCALE = 4;
const SIZE_RATIO = CARD_SCALE / 2.25;
const ROPE_LENGTH_RATIO = 0.9;
const ROPE_SEGMENT_LENGTH = SIZE_RATIO * ROPE_LENGTH_RATIO;

function Band({ isMobile }) {
   const band = useRef();
   const fixed = useRef();
   const jointOne = useRef();
   const jointTwo = useRef();
   const jointThree = useRef();
   const card = useRef();
   const [dragged, setDragged] = useState(false);
   const [hovered, setHovered] = useState(false);
   const { nodes, materials } = useGLTF(CARD_MODEL);
   const texture = useTexture(LANYARD_TEXTURE);
   const profileTexture = useTexture(PROFILE_IMAGE);
   const backTexture = useTexture(BACK_IMAGE);
   const curve = useMemo(() => {
      const nextCurve = new THREE.CatmullRomCurve3([
         new THREE.Vector3(),
         new THREE.Vector3(),
         new THREE.Vector3(),
         new THREE.Vector3(),
      ]);
      nextCurve.curveType = 'chordal';
      return nextCurve;
   }, []);
   const vec = useMemo(() => new THREE.Vector3(), []);
   const direction = useMemo(() => new THREE.Vector3(), []);
   const pointerPosition = useMemo(() => new THREE.Vector3(), []);

   useRopeJoint(fixed, jointOne, [[0, 0, 0], [0, 0, 0], ROPE_SEGMENT_LENGTH]);
   useRopeJoint(jointOne, jointTwo, [[0, 0, 0], [0, 0, 0], ROPE_SEGMENT_LENGTH]);
   useRopeJoint(jointTwo, jointThree, [[0, 0, 0], [0, 0, 0], ROPE_SEGMENT_LENGTH]);
   useSphericalJoint(jointThree, card, [[0, 0, 0], [0, 1.5 * ROPE_SEGMENT_LENGTH, 0]]);

   useEffect(() => {
      document.body.style.cursor = hovered ? (dragged ? 'grabbing' : 'grab') : 'auto';
      return () => {
         document.body.style.cursor = 'auto';
      };
   }, [dragged, hovered]);

   const bandTexture = useMemo(() => {
      const nextTexture = texture.clone();
      nextTexture.wrapS = THREE.RepeatWrapping;
      nextTexture.wrapT = THREE.RepeatWrapping;
      nextTexture.needsUpdate = true;
      return nextTexture;
   }, [texture]);

   const cardTexture = useMemo(() => {
      const baseMap = materials.base.map;
      const canvas = document.createElement('canvas');
      canvas.width = baseMap.image.width;
      canvas.height = baseMap.image.height;
      const context = canvas.getContext('2d');

      if (!context) {
         return baseMap;
      }

      context.drawImage(baseMap.image, 0, 0);

      const face = {
         x: 0,
         y: 0,
         width: canvas.width * 0.5,
         height: canvas.height * 0.755,
      };
      const backFace = { ...face, x: canvas.width * 0.5 };

      const drawCover = (image, target) => {
         const scale = Math.max(target.width / image.width, target.height / image.height);
         const width = image.width * scale;
         const height = image.height * scale;

         context.save();
         context.beginPath();
         context.rect(target.x, target.y, target.width, target.height);
         context.clip();
         context.drawImage(image, target.x + (target.width - width) / 2, target.y + (target.height - height) / 2, width, height);
         context.restore();
      };

      drawCover(profileTexture.image, face);
      drawCover(backTexture.image, backFace);

      const nextTexture = new THREE.CanvasTexture(canvas);
      nextTexture.colorSpace = THREE.SRGBColorSpace;
      nextTexture.flipY = baseMap.flipY;
      nextTexture.anisotropy = 16;
      nextTexture.needsUpdate = true;
      return nextTexture;
   }, [materials.base.map, profileTexture, backTexture]);

   useFrame((state, delta) => {
      if (!card.current || !fixed.current) {
         return;
      }

      if (dragged) {
         pointerPosition.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
         direction.copy(pointerPosition).sub(state.camera.position).normalize();
         pointerPosition.add(direction.multiplyScalar(state.camera.position.length()));
         [card, jointOne, jointTwo, jointThree, fixed].forEach((body) => body.current?.wakeUp());
         card.current.setNextKinematicTranslation({
            x: pointerPosition.x - dragged.x,
            y: pointerPosition.y - dragged.y,
            z: pointerPosition.z - dragged.z,
         });
      } else {
         [card, jointOne, jointTwo, jointThree].forEach((body) => body.current?.wakeUp());
      }

      [jointOne, jointTwo].forEach((body) => {
         if (!body.current.lerped) {
            body.current.lerped = new THREE.Vector3().copy(body.current.translation());
         }
         const distance = Math.max(0.1, Math.min(1, body.current.lerped.distanceTo(body.current.translation())));
         body.current.lerped.lerp(body.current.translation(), delta * (1 + distance * 49));
      });

      curve.points[0].copy(jointThree.current.translation());
      curve.points[1].copy(jointTwo.current.lerped);
      curve.points[2].copy(jointOne.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      const angularVelocity = card.current.angvel();
      const rotation = card.current.rotation();
      const idleTime = state.clock.elapsedTime;
      const idleAngularVelocity = dragged
         ? angularVelocity
         : {
            x: Math.sin(idleTime * 0.8) * 0.18,
            y: Math.sin(idleTime * 0.55) * 0.24,
            z: Math.cos(idleTime * 0.7) * 0.18,
         };

      card.current.setAngvel({
         x: idleAngularVelocity.x,
         y: idleAngularVelocity.y - rotation.y * 0.25,
         z: idleAngularVelocity.z,
      });
   });

   return (
      <>
         <group position={[5, 7, 0]}>
            <RigidBody ref={fixed} type="fixed" colliders={false} />
            <RigidBody ref={jointOne} position={[0.5 * ROPE_SEGMENT_LENGTH, 0, 0]} colliders={false} angularDamping={4} linearDamping={4}>
               <BallCollider args={[0.1 * SIZE_RATIO]} />
            </RigidBody>
            <RigidBody ref={jointTwo} position={[1 * ROPE_SEGMENT_LENGTH, 0, 0]} colliders={false} angularDamping={4} linearDamping={4}>
               <BallCollider args={[0.1 * SIZE_RATIO]} />
            </RigidBody>
            <RigidBody ref={jointThree} position={[1.5 * ROPE_SEGMENT_LENGTH, 0, 0]} colliders={false} angularDamping={4} linearDamping={4}>
               <BallCollider args={[0.1 * SIZE_RATIO]} />
            </RigidBody>
            <RigidBody ref={card} position={[2 * ROPE_SEGMENT_LENGTH, 0, 0]} colliders={false} type={dragged ? 'kinematicPosition' : 'dynamic'} angularDamping={4} linearDamping={4}>
               <CuboidCollider args={[0.8 * SIZE_RATIO, 1.125 * SIZE_RATIO, 0.01 * SIZE_RATIO]} />
               <group
                  scale={CARD_SCALE}
                  position={[0, -1.2 * SIZE_RATIO, -0.05 * SIZE_RATIO]}
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  onPointerUp={(event) => {
                     event.target.releasePointerCapture(event.pointerId);
                     setDragged(false);
                  }}
                  onPointerDown={(event) => {
                     event.target.setPointerCapture(event.pointerId);
                     setDragged(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation())));
                  }}
               >
                  <mesh geometry={nodes.card.geometry}>
                     <meshPhysicalMaterial map={cardTexture} map-anisotropy={16} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} />
                  </mesh>
                  <mesh geometry={nodes.clip.geometry} material={materials.metal} roughness={0.3} />
                  <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
               </group>
            </RigidBody>
         </group>
         <mesh ref={band}>
            <meshLineGeometry />
            <meshLineMaterial color="white" depthTest={false} resolution={isMobile ? [1000, 2000] : [1000, 1000]} useMap map={bandTexture} repeat={[-4, 1]} lineWidth={SIZE_RATIO} />
         </mesh>
      </>
   );
}

export default function Lanyard() {
   const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

   useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <div className={styles.wrapper}>
         <Canvas camera={{ position: [0, 0, 30], fov: 20 }} dpr={[1, isMobile ? 1.5 : 2]} gl={{ alpha: true }} onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}>
            <ambientLight intensity={Math.PI} />
            <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
               <Band isMobile={isMobile} />
            </Physics>
            <Environment blur={0.75}>
               <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
               <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
               <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
               <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
            </Environment>
         </Canvas>
      </div>
   );
}

useGLTF.preload(CARD_MODEL);
