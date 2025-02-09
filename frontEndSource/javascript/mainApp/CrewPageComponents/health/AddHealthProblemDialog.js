import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  Fieldset,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogActionTrigger,
} from '../../../components/ui/dialog';
import { Field } from '../../../components/ui/field';
import { 
  SelectRoot, 
  SelectTrigger, 
  SelectContent, 
  SelectItem,
  SelectValueText,
} from '../../../components/ui/select';
import { createListCollection } from '@chakra-ui/react';

const SEVERITY_OPTIONS = createListCollection({
  items: [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ]
});

const STATUS_OPTIONS = createListCollection({
  items: [
    { value: 'active', label: 'Active' },
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'resolved', label: 'Resolved' }
  ]
});

function AddHealthProblemDialog({ 
  isOpen, 
  onClose, 
  onSubmit,
  crewMember,
  opacity = 0.7,
  blurStrength = 8
}) {
  const [formData, setFormData] = useState({
    description: '',
    severity: '',
    status: '',
    date: new Date().toISOString().split('T')[0],
    crew_member: crewMember?.id
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    const actualValue = value?.value?.[0] || value;
    setFormData(prev => ({
      ...prev,
      [name]: actualValue
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    
    if (!data.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!data.severity) {
      newErrors.severity = 'Severity is required';
    }
    if (!data.status) {
      newErrors.status = 'Status is required';
    }
    if (!data.date) {
      newErrors.date = 'Date is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  const selectStyles = {
    trigger: {
      height: "42px",
      borderRadius: "lg",
      bg: "white",
      border: "1px solid",
      borderColor: "purple.200",
      color: "purple.900",
      _hover: { borderColor: "purple.300" },
    },
    content: {
      bg: "white",
      borderRadius: "md",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 4px 20px rgba(123, 67, 251, 0.15)",
      p: 1,
      maxH: "300px",
      overflow: "auto",
      zIndex: "popover",
    },
    item: {
      p: "8px 12px",
      borderRadius: "md",
      cursor: "pointer",
      color: "purple.800",
      transition: "all 0.2s",
      _hover: { bg: "purple.50" },
      _focus: { bg: "purple.100" },
      _selected: { bg: "purple.100", fontWeight: "semibold" },
    }
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent
        bg="white"
        border="1px solid"
        borderColor="purple.100"
        borderRadius="2xl"
        maxW="480px"
        position="relative"
        zIndex="modal"
        p={0}
        boxShadow="0 4px 20px rgba(123, 67, 251, 0.1)"
      >
        <DialogHeader
          borderBottom="1px solid"
          borderColor="purple.100"
          p={6}
          pb={5}
          bg="purple.50"
          borderTopRadius="2xl"
        >
          <DialogTitle color="purple.900" fontSize="2xl" fontWeight="semibold">
            Add Health Problem
          </DialogTitle>
          <Text color="purple.700" fontSize="sm" mt={2}>
            Adding health problem for: {crewMember?.firstName} {crewMember?.lastName}
          </Text>
        </DialogHeader>

        <DialogBody p={6} bg="white">
          <Box as="form" id="add-health-problem-form" onSubmit={handleSubmit}>
            <Fieldset.Root invalid={Object.keys(errors).length > 0}>
              <Fieldset.Content>
                <VStack spacing={4}>
                  <Field 
                    label="Description *" 
                    invalid={!!errors.description}
                    helperText={errors.description}
                  >
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the health problem"
                      resize="vertical"
                      minH="100px"
                      bg="white"
                      border="1px solid"
                      borderColor="purple.200"
                      _hover={{ borderColor: "purple.300" }}
                      _focus={{ borderColor: "blue.300", boxShadow: "none" }}
                    />
                  </Field>

                  <Field 
                    label="Severity *"
                    invalid={!!errors.severity}
                    helperText={errors.severity}
                  >
                    <SelectRoot 
                      value={formData.severity}
                      onValueChange={(value) => handleSelectChange('severity', value)}
                      collection={SEVERITY_OPTIONS}
                    >
                      <SelectTrigger {...selectStyles.trigger}>
                        <SelectValueText />
                      </SelectTrigger>
                      <SelectContent {...selectStyles.content}>
                        {SEVERITY_OPTIONS.items.map((item) => (
                          <SelectItem 
                            key={item.value} 
                            item={item}
                            sx={selectStyles.item}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  </Field>

                  <Field 
                    label="Status *"
                    invalid={!!errors.status}
                    helperText={errors.status}
                  >
                    <SelectRoot 
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                      collection={STATUS_OPTIONS}
                    >
                      <SelectTrigger {...selectStyles.trigger}>
                        <SelectValueText />
                      </SelectTrigger>
                      <SelectContent {...selectStyles.content}>
                        {STATUS_OPTIONS.items.map((item) => (
                          <SelectItem 
                            key={item.value} 
                            item={item}
                            sx={selectStyles.item}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  </Field>

                  <Field 
                    label="Date *"
                    invalid={!!errors.date}
                    helperText={errors.date}
                  >
                    <Input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      bg="white"
                      border="1px solid"
                      borderColor="purple.200"
                      _hover={{ borderColor: "purple.300" }}
                      _focus={{ borderColor: "blue.300", boxShadow: "none" }}
                    />
                  </Field>
                </VStack>
              </Fieldset.Content>
            </Fieldset.Root>
          </Box>
        </DialogBody>

        <DialogFooter 
          borderTop="1px solid"
          borderColor="purple.100"
          p={6}
          gap={3}
          bg="purple.50"
        >
          <DialogCloseTrigger asChild>
            <Button
              variant="ghost"
              color="purple.600"
              height="42px"
              fontSize="md"
              fontWeight="medium"
              _hover={{ bg: 'purple.100' }}
            >
              Cancel
            </Button>
          </DialogCloseTrigger>
          <Button
            type="submit"
            form="add-health-problem-form"
            bg="blue.600"
            height="42px"
            fontSize="md"
            fontWeight="medium"
            _hover={{ bg: 'blue.700' }}
            color="white"
            boxShadow="0 2px 8px rgba(66, 153, 225, 0.3)"
          >
            Add Health Problem
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default AddHealthProblemDialog; 