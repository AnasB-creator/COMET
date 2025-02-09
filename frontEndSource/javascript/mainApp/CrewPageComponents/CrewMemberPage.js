import React from 'react';
import { Box } from '@chakra-ui/react';
import QuadrantLayout from './layout/QuadrantLayout';
import CrewStatus from './crew/CrewStatus';
import HealthMetricsQuadrant from './health/HealthMetricsQuadrant';
import mockCrewMember from './services/mockData';

const CrewMemberPage = () => {
  return (
    <QuadrantLayout>
      <CrewStatus crewMember={mockCrewMember} />
      <HealthMetricsQuadrant crewMember={mockCrewMember} />
      <Box>Health Problems (Coming Soon)</Box>
      <Box>Health Reports (Coming Soon)</Box>
    </QuadrantLayout>
  );
};

export default CrewMemberPage; 