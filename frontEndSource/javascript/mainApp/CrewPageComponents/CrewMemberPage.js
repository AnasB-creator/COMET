import React, { useState, useEffect } from 'react';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';
import QuadrantLayout from './layout/QuadrantLayout';
import CrewStatus from './crew/CrewStatus';
import HealthMetricsQuadrant from './health/HealthMetricsQuadrant';
import HealthProblems from './health/HealthProblems';
import HealthReportsQuadrant from './reports/HealthReportsQuadrant';
import { getMockCrewMemberById } from './services/mockData';

function CrewMemberPage({ crewMemberId }) {
  const [crewMember, setCrewMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewMember = async () => {
      try {
        const data = await getMockCrewMemberById(crewMemberId);
        if (data) {
          setCrewMember(data);
        } else {
          setError('Crew member not found');
        }
      } catch (err) {
        setError('Failed to fetch crew member data');
      } finally {
        setLoading(false);
      }
    };

    fetchCrewMember();
  }, [crewMemberId]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !crewMember) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error || 'Crew member not found'}</Text>
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