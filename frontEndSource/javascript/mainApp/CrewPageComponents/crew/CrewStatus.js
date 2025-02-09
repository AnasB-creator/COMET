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
import { IoChevronBackOutline, IoChevronForwardOutline, IoPersonAddOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from '../../../components/ui/tooltip';
import AddCrewMemberDialog from './AddCrewMemberDialog';

// Create a separate component for the 3D model
function AstronautModel() {
  const { scene } = useGLTF('/static/images/cute_astronaut_gltf/scene.gltf');
  return <primitive object={scene} scale={2.5} position={[0, -0.25, 0]} />;
}

const statusColors = {
  active: 'green.400',
  inactive: 'gray.400',
  critical: 'red.400'
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 200 : -200,
    opacity: 0
  })
};

const CrewStatus = ({ 
  crewMember, 
  opacity = 0.7,
  blurStrength = 8,
  onPrevious,
  onNext,
  totalCrewCount,
  onAddCrewMember,
}) => {
  const [slideDirection, setSlideDirection] = React.useState(0);
  const [canvasKey, setCanvasKey] = React.useState(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const handlePrevious = () => {
    setSlideDirection(-1);
    setCanvasKey(prev => prev + 1);
    onPrevious();
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCanvasKey(prev => prev + 1);
    onNext();
  };

  const handleOpenAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleAddCrewMember = (newCrewMember) => {
    onAddCrewMember(newCrewMember);
  };

  return (
    <>
      <VStack
        bg={`rgba(26, 32, 44, ${opacity})`}
        backdropFilter={`blur(${blurStrength}px)`}
        borderRadius="xl"
        p={6}
        spacing={4}
        align="center"
        position="relative"
        h="100%"
        justify="space-between"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        {/* Fleet Information Section */}
        <Box 
          w="100%" 
          p={4}
          bg={`rgba(26, 32, 44, ${opacity})`}
          backdropFilter={`blur(${blurStrength}px)`}
          borderRadius="md"
        >
          {/* Fleet Name and ID Row */}
          <HStack justify="space-between" mb={0}>
            <HStack spacing={4}>
              <Text 
                fontSize="md" 
                color="whiteAlpha.900"
                fontWeight="bold"
              >
                {crewMember.fleet.name}
              </Text>
              <Text 
                fontSize="sm" 
                color="whiteAlpha.600"
              >
                #{crewMember.fleet.id}
              </Text>
            </HStack>
            <Text
              fontSize="sm"
              color="whiteAlpha.800"
            >
              Total Crew: {totalCrewCount}
            </Text>
          </HStack>

          {/* Captain and Add Button Row */}
          <HStack justify="space-between" align="center">
            <Text 
              fontSize="sm" 
              color="whiteAlpha.700"
            >
              Captain: {crewMember.fleet.captain.name}
            </Text>
            <Tooltip 
              content="Add Crew Member"
              showArrow
              contentProps={{
                bg: 'gray.700',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 'md',
                fontSize: 'sm'
              }}
            >
              <IconButton
                variant="ghost"
                color="whiteAlpha.900"
                size="sm"
                _hover={{
                  bg: 'whiteAlpha.100',
                  color: 'white',
                }}
                onClick={handleOpenAddDialog}
                aria-label="Add crew member"
              >
                <IoPersonAddOutline size={20} />
              </IconButton>
            </Tooltip>
          </HStack>
        </Box>

        {/* Updated 3D Model Section with Navigation */}
        <Box 
          position="relative" 
          width="100%" 
          height={{ base: "200px", lg: "250px" }}
          overflow="visible"
        >
          <IconButton
            position="absolute"
            left="0px"
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            color="whiteAlpha.900"
            onClick={handlePrevious}
            zIndex={2}
            aria-label="Previous crew member"
            _hover={{
              bg: 'whiteAlpha.100',
              color: 'white',
            }}
          >
            <IoChevronBackOutline size={24} />
          </IconButton>

          <IconButton
            position="absolute"
            right="0px"
            top="50%"
            transform="translateY(-50%)"
            variant="ghost"
            color="whiteAlpha.900"
            onClick={handleNext}
            zIndex={2}
            aria-label="Next crew member"
            _hover={{
              bg: 'whiteAlpha.100',
              color: 'white',
            }}
          >
            <IoChevronForwardOutline size={24} />
          </IconButton>

          <Box
            position="relative"
            width="100%"
            height="100%"
            overflow="hidden"
          >
            <AnimatePresence initial={false} custom={slideDirection} mode="wait">
              <motion.div
                key={crewMember.id}
                custom={slideDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%'
                }}
              >
                <Canvas 
                  key={canvasKey}
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
              </motion.div>
            </AnimatePresence>
          </Box>

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

      <AddCrewMemberDialog
        isOpen={isAddDialogOpen}
        onClose={handleCloseAddDialog}
        onSubmit={handleAddCrewMember}
        opacity={opacity}
        blurStrength={blurStrength}
      />
    </>
  );
};

// Preload the 3D model
useGLTF.preload('/static/images/cute_astronaut_gltf/scene.gltf');

export default CrewStatus; 