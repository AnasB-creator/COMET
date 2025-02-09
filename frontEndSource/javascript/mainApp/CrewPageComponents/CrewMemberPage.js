import React, { useState, useEffect } from 'react';
import { Box, Text, Center, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import QuadrantLayout from './layout/QuadrantLayout';
import CrewStatus from './crew/CrewStatus';
import HealthMetricsQuadrant from './health/HealthMetricsQuadrant';
import HealthProblems from './health/HealthProblems';
import {HealthReportsQuadrant} from './reports/HealthReportsQuadrant';
import { useCrewMemberMutation } from './hooks/useCrewMemberMutation';

function CrewMemberPage() {
  // Get all crew members data
  const { 
    data: crewMembers, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['crewMembers'],
    queryFn: () => fetch('/api/crew-members/').then(res => res.json())
  });

  // State for current crew member index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use our existing mutation hook
  const createCrewMutation = useCrewMemberMutation();

  // Filter crew members by fleet F001 and memoize the result
  const fleetMembers = React.useMemo(() => {
    if (!crewMembers) return [];
    return crewMembers.filter(member => member.fleet.id === 'F001');
  }, [crewMembers]);

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? fleetMembers.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(current => 
      current === fleetMembers.length - 1 ? 0 : current + 1
    );
  };

  // Get current crew member
  const currentCrewMember = fleetMembers[currentIndex];

  const handleAddCrewMember = async (formData) => {
    try {
      await createCrewMutation.mutateAsync({
        ...formData,
        fleet: 'F001', // Ensure fleet ID is included
      });
    } catch (error) {
      console.error('Error creating crew member:', error);
      // You might want to handle this error in the UI
    }
  };



  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Error loading crew data: {error.message}</Text>
      </Center>
    );
  }

  if (!currentCrewMember) {
    return (
      <Center h="100vh">
        <Text color="white">No crew members found in Fleet F001</Text>
      </Center>
    );
  }

  return (
    <QuadrantLayout>
      <CrewStatus 
        crewMember={currentCrewMember}
        onPrevious={handlePrevious}
        onNext={handleNext}
        totalCrewCount={fleetMembers.length}
        onAddCrewMember={handleAddCrewMember}
        isSubmitting={createCrewMutation.isLoading}
      />
      <HealthMetricsQuadrant crewMember={currentCrewMember} />
      <HealthProblems crewMember={currentCrewMember} />    
      <HealthReportsQuadrant crewMember={currentCrewMember} />
    </QuadrantLayout>
  );
}

export default CrewMemberPage; 