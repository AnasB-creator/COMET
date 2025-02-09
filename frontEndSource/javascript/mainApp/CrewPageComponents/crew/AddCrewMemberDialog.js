import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  Fieldset,
  Input,
  Text,
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

const SEX_OPTIONS = createListCollection({
  items: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ]
});

const CREW_ROLES = createListCollection({
  items: [
    { value: 'commander', label: 'Commander' },
    { value: 'pilot', label: 'Pilot' },
    { value: 'engineer', label: 'Engineer' },
    { value: 'medical', label: 'Medical Officer' },
    { value: 'science', label: 'Science Officer' }
  ]
});

const CREW_STATUS = createListCollection({
  items: [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Critical', value: 'critical' }
  ]
});

function AddCrewMemberDialog({ 
  isOpen, 
  onClose, 
  onSubmit,
  fleetName = "Fleet F001",
  captainName = "Captain O'Neil",
  opacity = 0.7,
  blurStrength = 8
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    status: '',
    sex: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    // Extract just the value from the select state
    const actualValue = value?.value?.[0] || value;
    
    setFormData(prev => ({
      ...prev,
      [name]: actualValue
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleStatusChange = (details) => {
    setFormData(prev => ({
      ...prev,
      status: Array.isArray(details) ? details : [details]
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    
    // Validate firstName
    if (!data.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate lastName
    if (!data.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate role - check if exists instead of trim
    if (!data.role) {
      newErrors.role = 'Role is required';
    }
    
    // Validate sex
    if (!data.sex) {
      newErrors.sex = 'Sex is required';
    }
    
    // Validate dateOfBirth
    if (!data.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    // Validate status
    if (!data.status) {
      newErrors.status = 'Status is required';
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

  const hasErrors = Object.keys(errors).length > 0;

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

  const inputStyles = {
    bg: "whiteAlpha.50",
    border: "1px solid",
    borderColor: "whiteAlpha.200",
    _hover: { borderColor: "whiteAlpha.300" },
    _focus: { borderColor: "blue.300", boxShadow: "none" },
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
        style={{
          background: `rgba(26, 32, 44, ${opacity})`,
          backdropFilter: `blur(${blurStrength}px)`,
        }}
      >
        <DialogHeader
          borderBottom="1px solid"
          borderColor="purple.100"
          p={6}
          pb={5}
          bg="purple.50"
          borderTopRadius="2xl"
        >
          <DialogTitle color="purple.900" fontSize="2xl" fontWeight="semibold" mb={4}>
            Add New Crew Member
          </DialogTitle>
          <Box bg="blue.900" p={3} borderRadius="lg" color="white">
            <Text fontSize="sm" fontWeight="medium" mb={1} opacity={0.9}>
              Adding crew member to:
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              {fleetName} • {captainName}
            </Text>
          </Box>
          <Text color="purple.700" fontSize="sm" mt={4} lineHeight="1.5">
            Please fill in the details below to add a new crew member to your fleet. 
            All fields marked with an asterisk (*) are required.
          </Text>
        </DialogHeader>

        <DialogBody p={6} bg="white">
          <Box as="form" id="add-crew-form" onSubmit={handleSubmit}>
            <Fieldset.Root invalid={hasErrors}>
              <Fieldset.Legend>Crew Member Details</Fieldset.Legend>
              <Fieldset.Content>
                <VStack spacing={4}>
                  <Field 
                    label="First Name" 
                    invalid={!!errors.firstName}
                  >
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      bg="whiteAlpha.50"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: "whiteAlpha.300" }}
                      _focus={{ borderColor: "blue.300", boxShadow: "none" }}
                      placeholder="Enter first name"
                    />
                  </Field>

                  <Field 
                    label="Last Name"
                    invalid={!!errors.lastName}
                  >
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      bg="whiteAlpha.50"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: "whiteAlpha.300" }}
                      _focus={{ borderColor: "blue.300", boxShadow: "none" }}
                      placeholder="Enter last name"
                    />
                  </Field>

                  <Field 
                    label="Sex *"
                    invalid={!!errors.sex}
                    helperText={errors.sex}
                  >
                    <SelectRoot 
                      value={formData.sex}
                      onValueChange={(value) => handleChange({ target: { name: 'sex', value }})}
                      collection={SEX_OPTIONS}
                    >
                      <SelectTrigger {...selectStyles.trigger}>
                        <SelectValueText />
                      </SelectTrigger>
                      <SelectContent {...selectStyles.content}>
                        {SEX_OPTIONS.items.map((item) => (
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
                    label="Role *"
                    invalid={!!errors.role}
                    helperText={errors.role}
                  >
                    <SelectRoot 
                      value={formData.role}
                      onValueChange={(value) => handleSelectChange('role', value)}
                      collection={CREW_ROLES}
                    >
                      <SelectTrigger {...selectStyles.trigger}>
                        <SelectValueText />
                      </SelectTrigger>
                      <SelectContent {...selectStyles.content}>
                        {CREW_ROLES.items.map((item) => (
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

                  <Field label="Date of Birth *" invalid={!!errors.dateOfBirth}>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      {...inputStyles}
                    />
                    {errors.dateOfBirth && (
                      <Text color="red.500" fontSize="sm">
                        {errors.dateOfBirth}
                      </Text>
                    )}
                  </Field>

                  <Field label="Status *" invalid={!!errors.status}>
                    <SelectRoot 
                      collection={CREW_STATUS}
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger {...selectStyles.trigger}>
                        <SelectValueText />
                      </SelectTrigger>
                      <SelectContent {...selectStyles.content}>
                        {CREW_STATUS.items.map((item) => (
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
                    {errors.status && (
                      <Text color="red.500" fontSize="sm">
                        {errors.status}
                      </Text>
                    )}
                  </Field>
                </VStack>
              </Fieldset.Content>
              {hasErrors && (
                <Fieldset.ErrorText>
                  Please check the form for errors and try again.
                </Fieldset.ErrorText>
              )}
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
          <DialogActionTrigger asChild>
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
          </DialogActionTrigger>
          <Button
            type="submit"
            form="add-crew-form"
            bg="blue.600"
            height="42px"
            fontSize="md"
            fontWeight="medium"
            _hover={{ bg: 'blue.700' }}
            color="white"
            boxShadow="0 2px 8px rgba(66, 153, 225, 0.3)"
          >
            Add Crew Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default AddCrewMemberDialog; 