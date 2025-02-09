import React from 'react';
import { Box, Text, VStack, Badge, HStack, Button } from '@chakra-ui/react';
import {
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogRoot,
  DialogTitle,
  DialogFooter,
  DialogActionTrigger,
} from '../../../../components/ui/dialog';

const ReportDialog = ({ isOpen, onClose, report }) => {
  const getRiskColor = (riskLevel) => {
    const colors = {
      low: 'var(--chakra-colors-green-500)',
      medium: 'var(--chakra-colors-orange-500)',
      high: 'var(--chakra-colors-red-500)'
    };
    return colors[riskLevel] || 'var(--chakra-colors-gray-500)';
  };

  const renderContent = () => {
    if (typeof report.content === 'string') {
      return <Text color="black" fontSize="md" lineHeight="tall">{report.content}</Text>;
    }

    if (report.content?.sections) {
      return (
        <VStack 
          align="stretch" 
          spacing={6}
          divideY="1px"
          sx={{
            '& > *': {
              py: 4
            },
            '& > *:first-of-type': {
              pt: 0
            },
            '& > *:last-of-type': {
              pb: 0
            }
          }}
        >
          {report.content.sections.map((section, index) => (
            <Box key={index}>
              <HStack 
                spacing={2} 
                mb={3}
                align="center"
              >
                <Box 
                  w="4px" 
                  h="24px" 
                  bg={getRiskColor(report.riskLevel)} 
                  borderRadius="full"
                />
                <Text 
                  fontWeight="bold" 
                  color="black" 
                  fontSize="lg"
                >
                  {section.title}
                </Text>
              </HStack>
              <Text 
                color="black" 
                fontSize="md" 
                lineHeight="tall"
                pl="6"
              >
                {section.content}
              </Text>
            </Box>
          ))}
        </VStack>
      );
    }

    return <Text color="black">No content available</Text>;
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogContent maxW="800px">
        <DialogHeader bg="gray.50" p={6} borderTopRadius="md">
          <DialogTitle>
            <VStack align="start" spacing={3} width="100%">
              <HStack justify="space-between" width="100%" align="center">
                <Text 
                  fontSize="2xl" 
                  fontWeight="bold" 
                  color="black"
                  letterSpacing="tight"
                >
                  {report.title}
                </Text>
                <Badge 
                  bg={getRiskColor(report.riskLevel)} 
                  color="white"
                  px={3}
                  py={1.5}
                  borderRadius="full"
                  fontSize="sm"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {report.riskLevel}
                </Badge>
              </HStack>
              <Text color="gray.600" fontSize="md">{report.subtitle}</Text>
            </VStack>
          </DialogTitle>
        </DialogHeader>

        <DialogBody p={6}>
          {renderContent()}
        </DialogBody>

        <DialogFooter 
          borderTop="1px solid"
          borderColor="gray.100" 
          p={4}
        >
          <DialogActionTrigger asChild>
            <Button 
              onClick={onClose}
              size="lg"
              colorScheme="gray"
              px={8}
            >
              Close Report
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ReportDialog; 