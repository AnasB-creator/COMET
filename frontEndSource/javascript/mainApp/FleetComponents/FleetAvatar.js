import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const SPACE_STATION_MODELS = [
  '/static/images/space_station_1_gltf/scene.gltf',
  '/static/images/space_station_2_gltf/scene.gltf',
  '/static/images/space_station_3_gltf/scene.gltf',
  '/static/images/space_station_4_gltf/scene.gltf',
  '/static/images/space_station_5_gltf/scene.gltf'
];

const MODEL_ZOOM_CONFIG = {
  1: 10,
  2: 15,
  3: 500,
  4: 8,
  5: 20,
};

const getModelPathForFleet = (fleetId) => {
  if (!fleetId) return SPACE_STATION_MODELS[0];
  const index = Math.abs(hashString(fleetId)) % SPACE_STATION_MODELS.length;
  return SPACE_STATION_MODELS[index];
};

const hashString = (str) => {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};

const getZoomForModel = (modelPath) => {
  try {
    const modelMatch = modelPath.match(/space_station_(\d+)_gltf/);
    if (!modelMatch) {
      console.warn('No model number found in path:', modelPath);
      return 10;
    }

    const modelNumber = parseInt(modelMatch[1], 10);
    const zoomLevel = MODEL_ZOOM_CONFIG[modelNumber];
    
    console.log('Model path:', modelPath);
    console.log('Model number:', modelNumber);
    console.log('Zoom level:', zoomLevel);
    
    return zoomLevel || 10;
  } catch (error) {
    console.error('Error getting zoom level:', error);
    return 10;
  }
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="grey" />
  </mesh>
);

function SpaceStationModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [scene]);

  return <primitive object={scene} scale={0.8} position={[0, 0, 0]} />;
}

const CameraController = ({ zoom }) => {
  const controlsRef = useRef();
  
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.z = zoom;
      controlsRef.current.update();
    }
  }, [zoom]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      autoRotate
      autoRotateSpeed={0.5}
    />
  );
};

const CanvasWrapper = ({ modelPath, cameraZoom, onError }) => {
  const [key, setKey] = useState(0);
  const prevZoomRef = useRef(cameraZoom);

  // Force canvas reset when model or zoom changes
  useEffect(() => {
    if (prevZoomRef.current !== cameraZoom) {
      console.log('Zoom changed from', prevZoomRef.current, 'to', cameraZoom);
      setKey(prev => prev + 1);
      prevZoomRef.current = cameraZoom;
    }
  }, [cameraZoom, modelPath]);

  const handleContextLost = (event) => {
    event.preventDefault();
    console.log('WebGL context lost, attempting to restore...');
    setKey(prev => prev + 1);
  };

  const handleContextRestored = () => {
    console.log('WebGL context restored');
  };

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  return (
    <Canvas
      key={key}
      camera={{ 
        position: [0, 0, cameraZoom],
        fov: 45,
        near: 0.1,
        far: Math.max(1000, cameraZoom * 2)
      }}
      style={{ background: 'transparent' }}
      onError={onError}
      gl={{ 
        powerPreference: 'high-performance',
        antialias: true,
        preserveDrawingBuffer: true
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<LoadingFallback />}>
        <SpaceStationModel modelPath={modelPath} />
      </Suspense>
      <CameraController zoom={cameraZoom} />
    </Canvas>
  );
};

const FleetAvatar = ({ fleet }) => {
  const modelPath = getModelPathForFleet(fleet?.id);
  const cameraZoom = getZoomForModel(modelPath);
  const [hasError, setHasError] = useState(false);
  const prevModelRef = useRef(modelPath);

  useEffect(() => {
    if (prevModelRef.current !== modelPath) {
      console.log('Model changed from', prevModelRef.current, 'to', modelPath);
      prevModelRef.current = modelPath;
    }
  }, [modelPath]);

  useEffect(() => {
    SPACE_STATION_MODELS.forEach(path => {
      useGLTF.preload(path);
    });
    
    return () => {
      SPACE_STATION_MODELS.forEach(path => {
        useGLTF.clear(path);
      });
    };
  }, []);

  if (hasError) {
    return (
      <VStack 
        spacing={4} 
        align="center"
        bg="rgba(26, 32, 44, 0.3)"
        backdropFilter="blur(8px)"
        borderRadius="xl"
        p={4}
        border="1px solid"
        borderColor="whiteAlpha.200"
        w="300px"
        h="300px"
      >
        <Text color="white">Unable to load 3D model</Text>
      </VStack>
    );
  }

  return (
    <VStack 
      spacing={4} 
      align="center"
      bg="rgba(26, 32, 44, 0.3)"
      backdropFilter="blur(8px)"
      borderRadius="xl"
      p={4}
      border="1px solid"
      borderColor="whiteAlpha.200"
      w="300px"
      h="300px"
    >
      <Box
        w="100%"
        h="200px"
        position="relative"
        borderRadius="lg"
        overflow="hidden"
      >
        <CanvasWrapper 
          modelPath={modelPath}
          cameraZoom={cameraZoom}
          onError={() => setHasError(true)}
        />
      </Box>

      <VStack spacing={2} w="100%">
        <Text 
          fontSize="xl" 
          fontWeight="bold"
          color="white"
          textAlign="center"
        >
          {fleet?.name || 'Fleet Name'}
        </Text>
        <Text 
          fontSize="md"
          color="whiteAlpha.800"
        >
          {fleet?.companyName || 'Company Name'}
        </Text>
        <Text 
          fontSize="sm"
          color="whiteAlpha.600"
        >
          {`${fleet?.crewCount || 0} Crew Members`}
        </Text>
      </VStack>
    </VStack>
  );
};

export default FleetAvatar;