'use client'
import fragmentShader from '@/public/dots-fragment.glsl';
import vertexShader from '@/public/dots-vertex.glsl';
import {useLayoutEffect, useMemo, useRef} from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  MathUtils,
  TextureLoader,
  Points,
  BufferGeometry,
} from 'three';
import {useFrame, useLoader, useThree} from "@react-three/fiber";

export default function Model({ points }) {
    const pointsRef = useRef<Points>(null!)
    const geometryRef = useRef<BufferGeometry>(null!);

    const { gl } = useThree();

    const dotsSizes = useMemo(() => {
        return {
            min: 0.5 / gl.getPixelRatio(),
            max: 2 / gl.getPixelRatio(),
        }
    }, [gl])

    useFrame(({clock}, delta) => {
        const points = pointsRef.current;
        const geometry = geometryRef.current;
        points.rotation.z += delta / 10;
        const sizes = geometry.attributes.size.array;
        const sizesChanges = geometry.attributes.sizeChange.array;
        const amount = geometry.attributes.position.count;
        
        const { min, max } = dotsSizes;

       for (let i = 0; i < amount; i++) {
        sizes[i] += sizesChanges[i] * MathUtils.randFloat(0, 0.075);
        if (sizes[i] >= max) {
          sizesChanges[i] *= -1;
          sizes[i] = max;
        }
        if (sizes[i] <= min) {
          sizesChanges[i] *= -1;
          sizes[i] = min;
        }
      }

      geometry.attributes.size.needsUpdate = true;
    })

    const texture = useLoader(TextureLoader, 'spark3.png');

    useLayoutEffect(() => {
        const geometry = geometryRef.current;
        const pointsAmount = points.length;
        if (geometry) {
            geometry.setFromPoints(points);
            const colors = new Float32Array(pointsAmount * 3);
            const alfa = new Float32Array(pointsAmount * 2);
            const sizes = new Float32Array(pointsAmount);
            const sizesChange = new Int8Array(pointsAmount);
            const { min, max} = dotsSizes;

            for (let i = 0; i < pointsAmount; i++) {
                const color = new Color(0xffff00);
                color.toArray(colors, i * 3);
                alfa[i] = Math.random();
                sizes[i] = MathUtils.randFloat(min, max);
                sizesChange[i] = Math.random() > 0.5 ? 1 : -1;
            }

            geometry.setAttribute('customAlpha', new BufferAttribute(alfa, 1));
            geometry.setAttribute('customColor', new BufferAttribute(colors, 3));
            geometry.setAttribute('size', new BufferAttribute(sizes, 1));
            geometry.setAttribute('sizeChange', new BufferAttribute(sizesChange, 3));
            geometry.dynamic = true;
        }
    }, [])

  return (
      <points ref={pointsRef} rotation-x={1}>
        <bufferGeometry
            ref={geometryRef}
        >
        </bufferGeometry>
        <shaderMaterial
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            uniforms={{
                color: { value: new Color(0xffffff)},
                pointTexture: {value: texture}
            }}
            blending={AdditiveBlending}
            transparent
            depthWrite={false}
        />
      </points>
    // <primitive object={fbx} scale={0.02} position-y={-2} />
    // <mesh ref={ref} scale={3}>
    //   <boxGeometry />
    //   <meshBasicMaterial color="red" />
    // </mesh>
  )
}