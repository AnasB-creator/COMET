import React, { useState } from 'react';
import { Box, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import RiskLevelFilter from './components/RiskLevelFilter';
import ReportCard from './components/ReportCard';
import { GenerateReportButton } from './components/GenerateReportButton';

export function HealthReportsQuadrant({ 
  crewMember,
  opacity = 0.2,
  blurStrength = 8,
}) {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const handleRiskLevelChange = (level) => {
    setSelectedRiskLevel(level);
  };

  const filteredReports = React.useMemo(() => {
    if (!crewMember?.reports) return [];
    
    return selectedRiskLevel === 'all' 
      ? crewMember.reports
      : crewMember.reports.filter(report => 
          report.riskLevel.toLowerCase() === selectedRiskLevel.toLowerCase()
        );
  }, [crewMember?.reports, selectedRiskLevel]);

  if (!crewMember || !crewMember.reports) {
    return (
      <Box
        className="quadrant"
        style={{
          backgroundColor: `rgba(26, 32, 44, ${opacity})`,
          backdropFilter: `blur(${blurStrength}px)`,
          transition: 'all 0.3s ease',
        }}
        position="relative"
        height="100%"
      >
        <Flex 
          align="center" 
          justify="space-between" 
          p={4}
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="md">Health Reports</Heading>
          <Flex 
            gap={4} 
            align="center"
            flexDirection={{ base: "column", sm: "row" }}
            width={{ base: "100%", md: "auto" }}
          >
            <RiskLevelFilter 
              selectedRiskLevel={selectedRiskLevel}
              onRiskLevelChange={handleRiskLevelChange}
            />
            <GenerateReportButton 
              crewMemberId={crewMember?.id}
            />
          </Flex>
        </Flex>

        <VStack spacing={4} p={4}>
          <Box textAlign="center" p={8}>
            <Box>No health reports available</Box>
          </Box>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      className="quadrant"
      style={{
        backgroundColor: `rgba(26, 32, 44, ${opacity})`,
        backdropFilter: `blur(${blurStrength}px)`,
        transition: 'all 0.3s ease',
      }}
      position="relative"
      height="100%"
      overflow="hidden"
    >
      <Flex 
        direction="column" 
        height="100%"
      >
        <Flex 
          align="center" 
          justify="space-between" 
          p={4}
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading size="md">Health Reports</Heading>
          <Flex 
            gap={4} 
            align="center"
            flexDirection={{ base: "column", sm: "row" }}
            width={{ base: "100%", md: "auto" }}
          >
            <RiskLevelFilter 
              selectedRiskLevel={selectedRiskLevel}
              onRiskLevelChange={handleRiskLevelChange}
            />
            <GenerateReportButton 
              crewMemberId={crewMember?.id}
            />
          </Flex>
        </Flex>

        <Box 
          flex="1"
          overflowY="auto"
          px={4}
          pb={4}
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
          <VStack 
            spacing={4} 
            align="stretch"
          >
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <ReportCard 
                  key={report.id}
                  report={report}
                  width="100%"
                />
              ))
            ) : (
              <Box textAlign="center" p={8}>
                <Box>No health reports available for this risk level</Box>
              </Box>
            )}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
} 