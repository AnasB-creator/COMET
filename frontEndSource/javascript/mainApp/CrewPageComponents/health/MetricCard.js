import React from 'react';
import { Box, Text, Flex, Spacer } from '@chakra-ui/react';

const statusColors = {
  normal: 'green.500',
  warning: 'yellow.500',
  critical: 'red.500'
};

export const MetricCard = ({ label, value, unit, status = 'normal' }) => {
  return (
    <Box
      bg="rgba(26, 32, 44, 0.3)"
      backdropFilter="blur(4px)"
      borderRadius="lg"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.01)' }}
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      <Flex align="center" p={3}>
        <Box flex="1">
          <Text fontSize="sm" fontWeight="medium" color="gray.300" textTransform="capitalize">
            {label.replace(/([A-Z])/g, ' $1').trim()}
          </Text>
        </Box>
        <Spacer />
        <Flex align="baseline" mr={4}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            {value}
          </Text>
          <Text ml={1} fontSize="sm" color="gray.400">
            {unit}
          </Text>
        </Flex>
        <Box
          w="10px"
          h="10px"
          borderRadius="full"
          bg={statusColors[status]}
          boxShadow={`0 0 10px ${statusColors[status]}`}
        />
      </Flex>
    </Box>
  );
}; 