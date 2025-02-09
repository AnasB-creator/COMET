import React from 'react';
import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { MetricCard } from './MetricCard';

const HealthMetricsQuadrant = ({ crewMember }) => {
  console.log('CrewMember in HealthMetrics:', crewMember);
  console.log('Health Metrics:', crewMember?.healthMetrics);

  if (!crewMember || !crewMember.healthMetrics) {
    return (
      <Box
        height="100%"
        bg="rgba(26, 32, 44, 0.2)"
        backdropFilter="blur(8px)"
        borderRadius="lg"
        p={4}
      >
        <Heading size="lg" color="gray.100">Health Metrics</Heading>
        <Text color="gray.300">No health metrics data available</Text>
      </Box>
    );
  }

  const { healthMetrics } = crewMember;

  return (
    <Box
      height="100%"
      bg="rgba(26, 32, 44, 0.2)"
      backdropFilter="blur(8px)"
      borderRadius="lg"
      p={4}
      position="relative"
      overflow="hidden"
    >
      <Heading size="lg" color="gray.100" mb={4}>
        Health Metrics - {new Date(healthMetrics.date).toLocaleDateString()}
      </Heading>
      <Box
        overflowY="auto"
        height="calc(100% - 60px)"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '4px',
          },
        }}
      >
        <VStack spacing={3} align="stretch">
          {Object.entries(healthMetrics)
            .filter(([key]) => key !== 'date') // Exclude date from metrics display
            .map(([key, value]) => (
              <MetricCard 
                key={key}
                label={key}
                value={value.value}
                unit={value.unit}
                status={value.status}
              />
            ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default HealthMetricsQuadrant; 