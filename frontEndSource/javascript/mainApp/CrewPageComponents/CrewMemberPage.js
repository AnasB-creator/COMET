import React, { useState, useEffect } from 'react';
import { Box, Text, Center, Spinner, VStack, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import QuadrantLayout from './layout/QuadrantLayout';
import CrewStatus from './crew/CrewStatus';
import HealthMetricsQuadrant from './health/HealthMetricsQuadrant';
import HealthProblems from './health/HealthProblems';
import {HealthReportsQuadrant} from './reports/HealthReportsQuadrant';
import { useCrewMemberMutation } from './hooks/useCrewMemberMutation';
import { useFleets } from '../FleetComponents/hooks/useFleetQueries';
import { getCrewMembersData } from '../customApiCalls/apiCalls';

function CrewMemberPage({ selectedFleetId }) {
  const { data: crewMembers, isLoading, error } = useQuery({
    queryKey: ['crewMembers', selectedFleetId],
    queryFn: () => getCrewMembersData(selectedFleetId),
    enabled: !!selectedFleetId
  });
  console.log("selectedFleetId",selectedFleetId);


  // State for current crew member index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use our existing mutation hook
  const createCrewMutation = useCrewMemberMutation();

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentIndex(current => 
      current === 0 ? crewMembers.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(current => 
      current === crewMembers.length - 1 ? 0 : current + 1
    );
  };

  // Get current crew member
  const currentCrewMember = crewMembers?.[currentIndex];
  console.log(currentCrewMember);
  const handleAddCrewMember = async (formData) => {
    try {
      await createCrewMutation.mutateAsync({
        ...formData,
        fleet: selectedFleetId, // Ensure fleet ID is included
      });
    } catch (error) {
      console.error('Error creating crew member:', error);
      // You might want to handle this error in the UI
    }
  };

  if (isLoading) {
    return (
      <Center h="100vh" bg="gray.900">
        <Spinner size="xl" color="white" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh" bg="gray.900">
        <Text color="red.500">Error loading crew data: {error.message}</Text>
      </Center>
    );
  }

  // Check if we have crew members
  if (!crewMembers || crewMembers.length === 0) {
    return (
      <Box bg="gray.900" minH="100vh">
        <QuadrantLayout>
          <Center gridColumn="span 2" gridRow="span 2">
            <VStack spacing={4}>
              <Text color="white" fontSize="xl">
                No crew members found in Fleet {selectedFleetId}
              </Text>
              <Button
                colorScheme="blue"
                onClick={() => {
                  // TODO: Open create crew member dialog
                  console.log("Create crew member for fleet:", selectedFleetId);
                }}
              >
                Add Crew Member
              </Button>
            </VStack>
          </Center>
        </QuadrantLayout>
      </Box>
    );
  }

  return (
    <Box bg="gray.900" minH="100vh">
      <QuadrantLayout>
        {currentCrewMember && (
          <>
            <CrewStatus
              crewMember={currentCrewMember}
              onPrevious={handlePrevious}
              onNext={handleNext}
              totalCrewCount={crewMembers.length}
              onAddCrewMember={handleAddCrewMember}
              isSubmitting={createCrewMutation.isLoading}
            />
            <HealthMetricsQuadrant crewMember={currentCrewMember} />
            <HealthProblems crewMember={currentCrewMember} />    
            <HealthReportsQuadrant crewMember={currentCrewMember} />
          </>
        )}
      </QuadrantLayout>
    </Box>
  );
}

export default CrewMemberPage; 