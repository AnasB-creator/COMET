import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  Text,
} from '@chakra-ui/react';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from '../../components/ui/dialog';
import { Field } from '../../components/ui/field';
import { Input } from "@chakra-ui/react"

function AddFleetDialog({ 
  isOpen, 
  onClose, 
  onSubmit,
  opacity = 0.7,
  blurStrength = 8
}) {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Fleet name is required';
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogContent
        bg="gray.50"
        border="1px solid"
        borderColor="purple.200"
        borderRadius="2xl"
        maxW="500px"
        w="90%"
        position="relative"
        boxShadow="xl"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          backdropFilter: `blur(${blurStrength}px)`,
          borderRadius: "2xl",
          bg: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <DialogHeader
          borderBottom="1px solid"
          borderColor="purple.200"
          p={6}
          bg="purple.50"
          borderTopRadius="2xl"
        >
          <DialogTitle>
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              bgGradient="linear(to-r, purple.500, blue.500)"
              bgClip="text"
              mb={2}
            >
              Add New Fleet
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              fontWeight="normal"
              lineHeight="1.6"
            >
              Expand your space exploration capabilities by adding a new fleet to your command. 
              Each fleet represents a new frontier in our mission to advance human presence beyond Earth.
            </Text>
          </DialogTitle>
        </DialogHeader>

        <DialogBody py={8} px={6}>
          <VStack spacing={6} align="stretch">
            <Box mb={4}>
              <Text
                fontSize="md"
                color="purple.700"
                fontWeight="medium"
                mb={3}
                p={4}
                bg="purple.50"
                borderRadius="md"
                borderLeft="4px solid"
                borderColor="purple.400"
              >
                "Great achievements in space exploration begin with well-organized fleets. 
                Your fleet management decisions today shape humanity's tomorrow in space."
              </Text>
            </Box>

            <Field 
              label="Fleet Name *"
              invalid={!!errors.name}
              helperText={errors.name}
            >
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter fleet name"
                bg="white"
                borderColor="purple.200"
                _hover={{ borderColor: "purple.300" }}
                _focus={{ 
                  borderColor: "purple.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)"
                }}
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Choose a distinctive name that reflects your fleet's mission and purpose
              </Text>
            </Field>

            <Field 
              label="Company Name *"
              invalid={!!errors.companyName}
              helperText={errors.companyName}
            >
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
                bg="white"
                borderColor="purple.200"
                _hover={{ borderColor: "purple.300" }}
                _focus={{ 
                  borderColor: "purple.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)"
                }}
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Enter the organization responsible for this fleet's operations
              </Text>
            </Field>

            <Box
              mt={2}
              p={4}
              bg="blue.50"
              borderRadius="md"
              borderLeft="4px solid"
              borderColor="blue.400"
            >
              <Text fontSize="sm" color="blue.700">
                <strong>Pro Tip:</strong> Effective fleet management starts with clear identification. 
                Your fleet name and company details will be used across all mission communications and reports.
              </Text>
            </Box>
          </VStack>
        </DialogBody>

        <DialogFooter 
          borderTop="1px solid"
          borderColor="purple.200"
          p={6}
          bg="purple.50"
          borderBottomRadius="2xl"
        >
          <DialogActionTrigger asChild>
            <Button
              onClick={onClose}
              variant="ghost"
              mr={3}
              color="gray.600"
              _hover={{ bg: 'purple.100' }}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={handleSubmit}
            bgGradient="linear(to-r, purple.400, blue.500)"
            size="lg"
            fontSize="md"
            fontWeight="medium"
            _hover={{ 
              bgGradient: "linear(to-r, purple.500, blue.600)",
              transform: "translateY(-1px)",
              boxShadow: "lg"
            }}
            _active={{
              transform: "translateY(0)",
              boxShadow: "md"
            }}
            color="white"
            px={8}
            transition="all 0.2s"
          >
            Launch New Fleet
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default AddFleetDialog; 