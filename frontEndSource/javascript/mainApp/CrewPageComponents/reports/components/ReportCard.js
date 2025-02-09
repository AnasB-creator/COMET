import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { FiMaximize2 } from "react-icons/fi";
import ReportDialog from './ReportDialog';

const getRiskColor = (riskLevel) => {
  const colors = {
    low: 'var(--chakra-colors-green-500)',
    medium: 'var(--chakra-colors-orange-500)',
    high: 'var(--chakra-colors-red-500)'
  };
  return colors[riskLevel] || 'var(--chakra-colors-gray-500)';
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const ReportCard = ({ report }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const riskColor = getRiskColor(report.riskLevel);
  
  return (
    <>
      <Box
        borderRadius="md"
        bg="rgba(26, 32, 44, 0.3)"
        borderWidth="1px"
        borderColor={riskColor}
        p={3}
        transition="all 0.2s"
        _hover={{
          borderColor: riskColor,
          bg: "rgba(26, 32, 44, 0.4)"
        }}
      >
        <VStack align="stretch" spacing={2}>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <HStack>
                <Text color="gray.100" fontWeight="bold">
                  {report.title}
                </Text>
                <Badge
                  bg={riskColor}
                  color="white"
                  px={2}
                  borderRadius="full"
                >
                  {report.riskLevel}
                </Badge>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                {formatDate(report.date)}
              </Text>
              <Text color="gray.300" fontSize="sm">
                {report.subtitle}
              </Text>
            </VStack>
            <IconButton
              size="sm"
              variant="ghost"
            
              aria-label="View full report"
              color="gray.400"
              _hover={{ color: "white" }}
              onClick={() => setIsDialogOpen(true)}
            >
                <FiMaximize2 />
            </IconButton>
          </HStack>
        </VStack>
      </Box>

      <ReportDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        report={report} 
      />
    </>
  );
};

export default ReportCard; 