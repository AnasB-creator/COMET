import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  Badge,
  HStack,
} from '@chakra-ui/react';

const ReportModal = ({ isOpen, onClose, report }) => {
  const getRiskColor = (riskLevel) => {
    const colors = {
      low: 'green',
      medium: 'orange',
      high: 'red'
    };
    return colors[riskLevel] || 'gray';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="gray.800" color="white">
        <ModalHeader>
          <VStack align="start" spacing={2}>
            <HStack>
              <Text>{report.title}</Text>
              <Badge colorScheme={getRiskColor(report.riskLevel)}>
                {report.riskLevel}
              </Badge>
            </HStack>
            <Text fontSize="sm" color="gray.400">{report.subtitle}</Text>
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text whiteSpace="pre-wrap">{report.content}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal; 