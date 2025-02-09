import React, { Suspense } from 'react';
import { 
  VStack, 
  Box, 
  Text,
  Circle,
  Spinner
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Create a separate component for the 3D model
function AstronautModel() {
  const { scene } = useGLTF('/static/images/cute_astronaut_gltf/scene.gltf');
  return <primitive object={scene} scale={2.5} position={[0, -0.25, 0]} />;
}

const CrewStatus = ({ 
  crewMember, 
  opacity = 0.7,
  blurStrength = 8
}) => {
  const statusColors = {
    active: 'green.400',
    inactive: 'gray.400',
    critical: 'red.400'
  };

  const bgColor = `rgba(26, 32, 44, ${opacity})`;
  const blurEffect = `blur(${blurStrength}px)`;

  return (
    <VStack
      bg={bgColor}
      backdropFilter={blurEffect}
      borderRadius="xl"
      p={6}
      spacing={4}
      align="center"
      position="relative"
      h="100%"
      justify="center"
      border="1px solid"
      borderColor="whiteAlpha.200"
      transition="all 0.3s ease"
    >
      <Box
        position="relative"
        overflow="hidden"
        boxSize={{ base: "200px", lg: "300px" }}
        bg="transparent"
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <AstronautModel />
          </Suspense>
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={4}
          />
        </Canvas>
        
        <Circle
          size="16px"
          bg={statusColors[crewMember.status]}
          position="absolute"
          top={4}
          right={4}
          boxShadow={`0 0 10px ${statusColors[crewMember.status]}`}
        />
      </Box>

      <VStack 
        spacing={2} 
        textAlign="center"
        bg="transparent"
      >
        <Text 
          fontSize="2xl" 
          fontWeight="bold"
          color="white"
          textShadow="0 0 10px rgba(0,0,0,0.5)"
        >
          {crewMember.name}
        </Text>
        <Text 
          fontSize="md"
          color="whiteAlpha.900"
          textShadow="0 0 10px rgba(0,0,0,0.5)"
        >
          {crewMember.role}
        </Text>
      </VStack>
    </VStack>
  );
};

// Preload the 3D model
useGLTF.preload('/static/images/cute_astronaut_gltf/scene.gltf');

export default CrewStatus; 