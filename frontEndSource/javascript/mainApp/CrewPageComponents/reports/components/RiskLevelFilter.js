import React from 'react';
import { ButtonGroup, Button, HStack, Text } from '@chakra-ui/react';

const RiskLevelFilter = ({ selectedRiskLevel, onRiskLevelChange }) => {
  const riskLevels = [
    { value: 'all', label: 'All', color: 'gray.500' },
    { value: 'low', label: 'Low', color: 'green.400' },
    { value: 'medium', label: 'Medium', color: 'orange.400' },
    { value: 'high', label: 'High', color: 'red.400' }
  ];

  return (
    <HStack spacing={4} mb={4} width="100%">
      <Text color="gray.300" fontSize="sm">Filter by risk:</Text>
      <ButtonGroup size="sm" isAttached variant="outline">
        {riskLevels.map(({ value, label, color }) => (
          <Button
            key={value}
            onClick={() => onRiskLevelChange(value)}
            isActive={selectedRiskLevel === value}
            _active={{
              bg: `${color}`,
              color: 'white',
              borderColor: `${color}`,
            }}
            _hover={{
              bg: `${color}50`,
              borderColor: `${color}`,
            }}
            color={selectedRiskLevel === value ? 'white' : color}
            borderColor="gray.600"
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  );
};

export default RiskLevelFilter; 