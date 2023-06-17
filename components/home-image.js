import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import styles from './home-image.module.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from 'next/image';

const CanvasContent = ({ imageUrl, imageRect }) => {

  /* const texture = new THREE.TextureLoader().load(imageUrl); 
  texture.colorSpace = THREE.SRGBColorSpace; */
 /*  const textureRef = useRef(); */
  const mesh = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });

  const fragmentShader = `
  uniform sampler2D u_texture;

  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(u_texture, vUv);
    gl_FragColor = color;
  }
  `;
  const vertexShader = `

  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_mouse;

vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;

  vec3 pos = position;
  float noiseFreq = 0.5;
  float noiseAmp = 0.2; 
  vec3 noisePos = vec3(pos.x * noiseFreq + (u_time / 3.), pos.y, pos.z);
  pos.z += snoise(noisePos) * (noiseAmp * sin((u_mouse.x - u_mouse.y) / 200.) * 3.);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
  `;

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_texture: { value: null },
      u_noiseScale: { value: 10. },
      u_noiseStrength: { value: 0.01 },
      u_animationSpeed: { value: 0.00001 },
    }), []
  );

  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new THREE.Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );
  });

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      mesh.current.material.uniforms.u_texture.value = texture;
      texture.needsUpdate = true;
    });
  }, [imageUrl]);
  
  return <>
  <ambientLight intensity={1} />
      <mesh 
        ref={mesh}
        position={new THREE.Vector3(0, 0, 0)}
        geometry={new THREE.PlaneGeometry(10, 10, 100, 100)}
        material={new THREE.ShaderMaterial( { 
          fragmentShader: fragmentShader,
          uniforms: uniforms,
          vertexShader: vertexShader,
        } )}
      />
  </>
};

const HomeImage = (({ imageUrl }) => {

  const [loaded, setLoaded] = useState(false);
  const [loadedImg, setLoadedImg] = useState(null);
  
  return <div className={styles.scene}>
    {!loaded ? <div className={styles.loading}>
    <Image
      src={imageUrl}
      width={500}
      height={500}
      alt="Picture of the author"
      placeholder="blur"
      blurDataURL="https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-superJumbo.jpg"
      onLoadingComplete={(img) => {setLoaded(true); setLoadedImg(img);}}
    />
      </div> : <Canvas
      className={styles.canvas}
      camera={{
        position: [0, 0, 10],
        fov: 60,
      }}
    >
      <CanvasContent imageUrl={loadedImg.getAttribute('src')}></CanvasContent>
    </Canvas>}
  </div>;
})

export default HomeImage;
