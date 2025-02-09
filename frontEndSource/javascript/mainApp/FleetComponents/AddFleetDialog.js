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
        bg="white"
        border="1px solid"
        borderColor="purple.100"
        borderRadius="xl"
        maxW="500px"
        w="90%"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          backdropFilter: `blur(${blurStrength}px)`,
          borderRadius: "xl",
        }}
      >
        <DialogHeader
          borderBottom="1px solid"
          borderColor="purple.100"
          p={6}
        >
          <DialogTitle>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              Add New Fleet
            </Text>
          </DialogTitle>
        </DialogHeader>

        <DialogBody py={6} px={6}>
          <VStack spacing={4} align="stretch">
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
              />
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
              />
            </Field>
          </VStack>
        </DialogBody>

        <DialogFooter 
          borderTop="1px solid"
          borderColor="purple.100"
          p={6}
        >
          <DialogActionTrigger asChild>
            <Button
              onClick={onClose}
              variant="ghost"
              mr={3}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={handleSubmit}
            colorScheme="blue"
            size="lg"
            fontSize="md"
            fontWeight="medium"
            _hover={{ bg: 'blue.700' }}
            color="white"
            boxShadow="0 2px 8px rgba(66, 153, 225, 0.3)"
          >
            Add Fleet
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default AddFleetDialog; 