import React, { useEffect, useState } from 'react';
import { GridItem } from '@chakra-ui/react';
import QuadrantLayout from './layout/QuadrantLayout';
import CrewStatus from './crew/CrewStatus';
import { getMockCrewMember } from './services/mockData';

const CrewMemberPage = () => {
  const [crewData, setCrewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCrewData = async () => {
      try {
        const data = await getMockCrewMember();
        setCrewData(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrewData();
  }, []);

  if (isLoading) {
    return (
      <QuadrantLayout>
        <GridItem>Loading...</GridItem>
      </QuadrantLayout>
    );
  }

  return (
    <QuadrantLayout>
      <GridItem>
        <CrewStatus 
          crewMember={crewData} 
          opacity={0.2}
          blurStrength={0}  // Controls the glass effect strength
        />
      </GridItem>
      <GridItem>Health Metrics (Coming Soon)</GridItem>
      <GridItem>Health Problems (Coming Soon)</GridItem>
      <GridItem>Health Reports (Coming Soon)</GridItem>
    </QuadrantLayout>
  );
};

export default CrewMemberPage; 