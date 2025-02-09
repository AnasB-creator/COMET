import React from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { MetricCard } from './health/MetricCard';

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
    >
      <Box mb={4}>
        <Heading size="lg" color="gray.100">Health Metrics</Heading>
      </Box>
      <SimpleGrid columns={2} spacing={4}>
        {Object.entries(healthMetrics).map(([key, value]) => (
          <MetricCard 
            key={key}
            label={key}
            value={value.value}
            unit={value.unit}
            status={value.status}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HealthMetricsQuadrant; 