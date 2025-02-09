import React, { useState } from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import RiskLevelFilter from './components/RiskLevelFilter';
import ReportCard from './components/ReportCard';

const HealthReportsQuadrant = ({ crewMember }) => {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const filteredReports = React.useMemo(() => {
    if (!crewMember?.reports) return [];
    if (selectedRiskLevel === 'all') return crewMember.reports;
    return crewMember.reports.filter(report => report.riskLevel === selectedRiskLevel);
  }, [crewMember?.reports, selectedRiskLevel]);

  if (!crewMember || !crewMember.reports) {
    return (
      <Box
        height="100%"
        bg="rgba(26, 32, 44, 0.2)"
        backdropFilter="blur(8px)"
        borderRadius="lg"
        p={4}
      >
        <Heading size="lg" color="gray.100">Health Reports</Heading>
        <Text color="gray.300">No health reports available</Text>
      </Box>
    );
  }

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
      <Heading size="lg" color="gray.100" mb={4}>Health Reports</Heading>
      
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
        <RiskLevelFilter 
          selectedRiskLevel={selectedRiskLevel}
          onRiskLevelChange={setSelectedRiskLevel}
        />
        <VStack spacing={3} align="stretch">
          {filteredReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
          {filteredReports.length === 0 && (
            <Text color="gray.300" textAlign="center">
              No reports found for the selected risk level
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default HealthReportsQuadrant; 