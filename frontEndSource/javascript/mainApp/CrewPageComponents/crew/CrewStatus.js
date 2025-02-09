import React, { Suspense } from 'react';
import { 
  VStack, 
  Box, 
  Text,
  Circle,
  Spinner,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

// Create a separate component for the 3D model
function AstronautModel() {
  const { scene } = useGLTF('/static/images/cute_astronaut_gltf/scene.gltf');
  return <primitive object={scene} scale={2.5} position={[0, -0.25, 0]} />;
}

const CrewStatus = ({ 
  crewMember, 
  opacity = 0.7,
  blurStrength = 8,
  onPrevious,
  onNext,
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
      justify="space-between"
      border="1px solid"
      borderColor="whiteAlpha.200"
      transition="all 0.3s ease"
    >
      {/* Top Section with Fleet Info */}
      <VStack 
        spacing={2} 
        w="100%"
        divideY
        divideColor="whiteAlpha.200"
      >
        <HStack justify="space-between" w="100%">
          <Text 
            fontSize="sm" 
            color="whiteAlpha.900"
            fontWeight="bold"
          >
            Fleet: {crewMember.fleet.name}
          </Text>
          <Text 
            fontSize="sm" 
            color="whiteAlpha.700"
          >
            ID: {crewMember.fleet.id}
          </Text>
        </HStack>
        <Text 
          fontSize="sm" 
          color="whiteAlpha.700"
          alignSelf="flex-start"
          pb={2}
        >
          Captain: {crewMember.fleet.captain.name}
        </Text>
      </VStack>

      {/* Middle Section with 3D Model */}
      <Box
        position="relative"
        overflow="visible"
        boxSize={{ base: "200px", lg: "250px" }}
        bg="transparent"
      >
        {/* Left Chevron */}
        <IconButton
          position="absolute"
          left="-20px"
          top="50%"
          transform="translateY(-50%)"
          variant="ghost"
          color="whiteAlpha.900"
          _hover={{
            bg: 'whiteAlpha.100',
            color: 'white',
            transform: 'translateY(-50%) scale(1.1)',
          }}
          _active={{
            transform: 'translateY(-50%) scale(0.95)',
          }}
          onClick={onPrevious}
          zIndex={2}
          aria-label="Previous crew member"
          transition="all 0.2s"
        >
          
            <IoChevronBackOutline size={24} />
          
        </IconButton>

        {/* Right Chevron */}
        <IconButton
          position="absolute"
          right="-20px"
          top="50%"
          transform="translateY(-50%)"
          variant="ghost"
          color="whiteAlpha.900"

          _hover={{
            bg: 'whiteAlpha.100',
            color: 'white',
            transform: 'translateY(-50%) scale(1.1)',
          }}
          _active={{
            transform: 'translateY(-50%) scale(0.95)',
          }}
          onClick={onNext}
          zIndex={2}
          aria-label="Next crew member"
          transition="all 0.2s"
        >
          
            <IoChevronForwardOutline size={24} />
          
        </IconButton>


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

      {/* Bottom Section with Crew Info */}
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
          {`${crewMember.firstName} ${crewMember.lastName}`}
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