import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  Collapsible,
} from '@chakra-ui/react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";



const getRiskColor = (riskLevel) => {
  const colors = {
    low: 'green',
    medium: 'orange',
    high: 'red'
  };
  return colors[riskLevel] || 'gray';
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const ReportCard = ({ report }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const riskColor = getRiskColor(report.riskLevel);
  
  return (
    <Box
      borderRadius="md"
      bg="rgba(26, 32, 44, 0.3)"
      borderWidth="1px"
      borderColor={`${riskColor}.600`}
      p={3}
      transition="all 0.2s"
      _hover={{
        borderColor: `${riskColor}.400`,
        bg: "rgba(26, 32, 44, 0.4)"
      }}
    >
      <VStack align="stretch" spacing={2}>
        <Collapsible.Root open={isExpanded} onOpenChange={({open}) => setIsExpanded(open)}>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <HStack>
                <Text color="gray.100" fontWeight="bold">
                  {report.title}
                </Text>
                <Badge
                  colorScheme={riskColor}
                  variant="subtle"
                  px={2}
                  borderRadius="full"
                >
                  {report.riskLevel}
                </Badge>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                {formatDate(report.date)}
              </Text>
            </VStack>
            <Collapsible.Trigger asChild>
              <IconButton
                size="sm"
                variant="ghost"
                icon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                aria-label={isExpanded ? "Collapse" : "Expand"}
                color="gray.400"
                _hover={{ color: "white" }}

              />
            </Collapsible.Trigger>
          </HStack>

          <Text color="gray.300" fontSize="sm">
            {report.subtitle}
          </Text>

          <Collapsible.Content>
            <Box
              pt={2}
              borderTopWidth="1px"
              borderColor="gray.700"
            >
              <Text color="gray.300" fontSize="sm">
                {report.content}
              </Text>
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </VStack>
    </Box>
  );
};

export default ReportCard; 