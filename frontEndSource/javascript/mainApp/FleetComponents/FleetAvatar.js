import React, { Suspense } from 'react';
import { Box, Text, VStack, Spinner } from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Create a separate component for the 3D model
function SpaceStationModel() {
  const { scene } = useGLTF('/static/images/space_station_4_gltf/scene.gltf');
  return <primitive object={scene} scale={0.8} position={[0, 0, 0]} />;
}

const FleetAvatar = ({ fleet }) => {
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
      {/* 3D Model Container */}
      <Box h="200px" w="100%">
        <Suspense fallback={<Spinner />}>
          <Canvas camera={{ position: [15, 5, 15], fov: 25 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <SpaceStationModel />
            <OrbitControls 
              autoRotate
              autoRotateSpeed={1}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 2.5}
            />
          </Canvas>
        </Suspense>
      </Box>

      {/* Fleet Info */}
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

// Preload the 3D model
useGLTF.preload('/static/images/space_station_4_gltf/scene.gltf');

export default FleetAvatar; 