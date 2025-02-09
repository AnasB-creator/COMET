import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Badge,
  Flex,
  createListCollection,
} from '@chakra-ui/react';
import { 
  SelectRoot, 
  SelectTrigger, 
  SelectContent, 
  SelectItem,
  SelectValueText,
} from '../../../components/ui/select';

function ProblemItem({ date, status, description, severity }) {
  return (
    <Box
      p={3}
      bg="rgba(255, 255, 255, 0.05)"
      borderRadius="md"
      _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
      transition="all 0.2s"
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="sm" color="gray.300">
          {new Date(date).toLocaleDateString()}
        </Text>
        <Badge
          colorScheme={status === 'active' ? 'red' : 'green'}
          variant="subtle"
        >
          {status}
        </Badge>
      </Flex>
      <Text color="white">{description}</Text>
      <Badge
        mt={2}
        colorScheme={
          severity === 'high' ? 'red' :
          severity === 'medium' ? 'yellow' : 'blue'
        }
      >
        {severity} severity
      </Badge>
    </Box>
  );
}

function HealthProblems({ crewMember }) {
  const [filter, setFilter] = useState('all');
  
  const glassEffect = {
    background: `rgba(26, 32, 44, 0.2)`,
    backdropFilter: 'blur(8px)',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const filterOptions = createListCollection({
    items: [
      { value: 'all', label: 'All Issues' },
      { value: 'active', label: 'Active' },
      { value: 'resolved', label: 'Resolved' }
    ],
  });

  const problems = crewMember?.problems || [];
  const filteredProblems = problems.filter(problem => {
    const currentFilter = typeof filter === 'object' ? filter.value[0] : filter;
    return currentFilter === 'all' || problem.status === currentFilter;
  });

  const handleFilterChange = (newValue) => {
    console.log('Filter changed to:', newValue);
    setFilter(newValue);
  };

  return (
    <Box
      {...glassEffect}
      p={4}
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold" color="white">
          Health Problems
        </Text>
        <SelectRoot 
          value={filter} 
          onValueChange={handleFilterChange}
          collection={filterOptions}
        >
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.items.map((item) => (
              <SelectItem 
                key={item.value} 
                item={item}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Flex>

      <VStack
        spacing={3}
        align="stretch"
        overflowY="auto"
        flex="1"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0.1)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px',
          },
        }}
      >
        {filteredProblems.length === 0 ? (
          <Text color="gray.400" textAlign="center">
            No health problems found
          </Text>
        ) : (
          filteredProblems.map((problem) => (
            <ProblemItem
              key={problem.id}
              date={problem.date}
              status={problem.status}
              description={problem.description}
              severity={problem.severity}
            />
          ))
        )}
      </VStack>
    </Box>
  );
}

export default HealthProblems; 