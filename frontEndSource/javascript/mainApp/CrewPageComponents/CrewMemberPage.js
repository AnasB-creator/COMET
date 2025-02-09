import React from 'react';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import QuadrantLayout from './layout/QuadrantLayout';
import CrewStatus from './crew/CrewStatus';
import HealthMetricsQuadrant from './health/HealthMetricsQuadrant';
import HealthProblems from './health/HealthProblems';
import HealthReportsQuadrant from './reports/HealthReportsQuadrant';
import { getCrewMembersData } from '../customApiCalls/apiCalls';

function CrewMemberPage({ crewMemberId }) {
  const { data: crewMembers, isLoading, error } = useQuery({
    queryKey: ['crewMembers'],
    queryFn: getCrewMembersData,
  });
  console.log(crewMembers);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Failed to fetch crew member data</Text>
      </Center>
    );
  }

  const crewMember = crewMembers?.find(member => member.id === crewMemberId);

  if (!crewMember) {
    return (
      <Center h="100vh">
        <Text color="red.500">Crew member not found</Text>
      </Center>
    );
  }

  return (
    <QuadrantLayout>
      <CrewStatus crewMember={crewMember} />
      <HealthMetricsQuadrant crewMember={crewMember} />
      <HealthProblems crewMember={crewMember} />    
      <HealthReportsQuadrant crewMember={crewMember} />
    </QuadrantLayout>
  );
}

export default CrewMemberPage; 