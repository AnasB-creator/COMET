import React from 'react';
import { Box } from '@chakra-ui/react';
import QuadrantLayout from './layout/QuadrantLayout';
import CrewStatus from './crew/CrewStatus';
import HealthMetricsQuadrant from './health/HealthMetricsQuadrant';
import HealthProblems from './health/HealthProblems';
import { mockCrewMember } from './services/mockData';

function CrewMemberPage() {
  return (
    <QuadrantLayout>
      <CrewStatus crewMember={mockCrewMember} />
      <HealthMetricsQuadrant crewMember={mockCrewMember} />
      <HealthProblems crewMember={mockCrewMember} />    
      <Box>Health Reports (Coming Soon)</Box>
    </QuadrantLayout>
  );
}

export default CrewMemberPage; 