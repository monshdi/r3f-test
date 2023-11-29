'use client'
import fragmentShader from '@/public/dots-fragment.glsl';
import vertexShader from '@/public/dots-vertex.glsl';
import React, { useLayoutEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  Color,
  MathUtils,
  TextureLoader,
  Points,
  BufferGeometry, Vector3, ShaderMaterial,
} from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useControls } from "leva";

interface Props {
  points: Vector3[]
  opacity?: number;
}

const controls = {
  deltaValue: {
    value: 1, min: 1, max: 4.0, step: 0.01,
  },
  distance: {
    value: 1, min: 1, max: 20.0, step: 0.001,
  },
};

const rotation = Math.PI / 2;
export default function Model({points, opacity = 1, ...restProps}: Props): React.FunctionComponentElement<Props> {
  const pointsRef = useRef<Points>(null!)
  const geometryRef = useRef<BufferGeometry>(null!);
  const materialRef = useRef<ShaderMaterial>(null!);
  const texture = useLoader(TextureLoader, 'spark3.png');

  const control = useControls('Distance', controls)

  const {gl} = useThree();
  const scroll = useScroll();

  const dotsSizes = useMemo(() => {
    return {
      min: 0.5 / gl.getPixelRatio(),
      max: 2 / gl.getPixelRatio(),
    }
  }, [gl])

  const shaderAttributes = useMemo(() => ({
    fragmentShader,
    vertexShader,
    uniforms: {
      color: {value: new Color(0xffffff)},
      pointTexture: {value: texture},
      uOpacity: {value: opacity},
      distanceDelta: { value: 0 },
      distanceValue: { value: 0 },
    },
  }), []);

  useFrame(({clock}, delta) => {
    const points = pointsRef.current;
    const geometry = geometryRef.current;
    points.rotation.z += delta / 50;
    const sizes = geometry.attributes.size.array;
    const sizesChanges = geometry.attributes.sizeChange.array;
    const amount = geometry.attributes.position.count;

    materialRef.current.uniforms.uOpacity.value = Math.abs(opacity - scroll.offset);
    materialRef.current.uniforms.distanceDelta.value = control.deltaValue;
    materialRef.current.uniforms.distanceValue.value = control.distance;

    const {min, max} = dotsSizes;

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


  useLayoutEffect(() => {
    const geometry = geometryRef.current;
    const pointsAmount = points.length;
    if (geometry) {
      geometry.setFromPoints(points);
      const colors = new Float32Array(pointsAmount * 3);
      const alpha = new Float32Array(pointsAmount * 2);
      const sizes = new Float32Array(pointsAmount);
      const sizesChange = new Int8Array(pointsAmount);
      const {min, max} = dotsSizes;

      for (let i = 0; i < pointsAmount; i++) {
        const color = new Color(0xffffff);
        color.toArray(colors, i * 3);
        alpha[i] = Math.random();
        sizes[i] = MathUtils.randFloat(min, max);
        sizesChange[i] = Math.random() > 0.5 ? 1 : -1;
      }

      geometry.setAttribute('customAlpha', new BufferAttribute(alpha, 1));
      geometry.setAttribute('customColor', new BufferAttribute(colors, 3));
      geometry.setAttribute('size', new BufferAttribute(sizes, 1));
      geometry.setAttribute('sizeChange', new BufferAttribute(sizesChange, 3));
    }
  }, [])

  return (
    <points
      ref={pointsRef}
      {...restProps}
    >
      <bufferGeometry
        ref={geometryRef}
      >
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        blending={AdditiveBlending}
        args={[shaderAttributes]}
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