import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Badge,
  Flex,
  createListCollection,
  Button,
  HStack,
  Icon,
  Heading,
} from '@chakra-ui/react';
import { 
  SelectRoot, 
  SelectTrigger, 
  SelectContent, 
  SelectItem,
  SelectValueText,
} from '../../../components/ui/select';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useHealthProblemMutation } from '../hooks/useHealthProblemMutation';
import AddHealthProblemDialog from './AddHealthProblemDialog';

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

function HealthProblems({ crewMember, opacity = 0.7, blurStrength = 8 }) {
  const [filter, setFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const createHealthProblemMutation = useHealthProblemMutation();
  
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
    setFilter(newValue);
  };

  const handleAddHealthProblem = async (healthProblemData) => {
    try {
      await createHealthProblemMutation.mutateAsync({
        ...healthProblemData,
        crew_member: crewMember.id,
      });
    } catch (error) {
      console.error('Error creating health problem:', error);
    }
  };

  return (
    <>
      <Box
        height="100%"
        bg="rgba(26, 32, 44, 0.2)"
        backdropFilter="blur(8px)"
        borderRadius="lg"
        p={4}
        position="relative"
        overflow="hidden"
      >
        <VStack spacing={4} height="100%">
          {/* Header Section */}
          <Flex w="100%" justify="space-between" align="center">
            <Heading size="lg" color="gray.100">
              Health Problems
            </Heading>
            <Button
              leftIcon={<Icon as={IoAddCircleOutline} />}
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Problem
            </Button>
          </Flex>

          {/* Filter Section */}
          <Box w="100%">
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
          </Box>

          {/* Scrollable Content Section */}
          <Box
            overflowY="auto"
            height="calc(100% - 120px)" // Adjust for header and filter height
            width="100%"
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
            <VStack spacing={3} align="stretch">
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
        </VStack>
      </Box>

      <AddHealthProblemDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddHealthProblem}
        crewMember={crewMember}
        opacity={opacity}
        blurStrength={blurStrength}
      />
    </>
  );
}

export default HealthProblems; 