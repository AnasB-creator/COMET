import React from 'react';
import { 
  VStack, 
  Box, 
  Image, 
  Text,
  Circle
} from '@chakra-ui/react';

const CrewStatus = ({ 
  crewMember, 
  opacity = 0.7,
  blurStrength = 8  // Default blur strength in pixels
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
      transition="all 0.3s ease"  // Smooth transition for both opacity and blur
    >
      <Box
        position="relative"
        borderRadius="full"
        overflow="hidden"
        boxSize={{ base: "150px", lg: "200px" }}
        border="4px solid"
        borderColor={statusColors[crewMember.status]}
        bg="gray.800"
      >
        <Image
          src={crewMember.avatar || '/static/images/default-avatar.png'}
          alt={crewMember.name}
          fallback={
            <Box
              bg="gray.800"
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="4xl">{crewMember.name[0]}</Text>
            </Box>
          }
        />
        <Circle
          size="16px"
          bg={statusColors[crewMember.status]}
          position="absolute"
          bottom={2}
          right={2}
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

export default CrewStatus; 