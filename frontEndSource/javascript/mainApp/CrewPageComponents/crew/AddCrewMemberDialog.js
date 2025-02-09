import React from 'react';
import {
  VStack,
  Box,
  Button,
  Fieldset,
  Input,
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

const CREW_STATUSES = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Critical', value: 'critical' }
];

function AddCrewMemberDialog({ 
  isOpen, 
  onClose, 
  onSubmit,
  opacity = 0.7,
  blurStrength = 8,
}) {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    role: '',
    status: 'active'
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

  const handleStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  const statusOptions = createListCollection({
    items: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'critical', label: 'Critical' }
    ],
  });

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent
        bg={`rgba(26, 32, 44, ${opacity})`}
        backdropFilter={`blur(${blurStrength}px)`}
        border="1px solid"
        borderColor="whiteAlpha.200"
        borderRadius="xl"
      >
        <DialogHeader>
          <DialogTitle>Add New Crew Member</DialogTitle>
        </DialogHeader>
        
        <DialogBody>
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
                    label="Role"
                    invalid={!!errors.role}
                  >
                    <Input
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      bg="whiteAlpha.50"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      _hover={{ borderColor: "whiteAlpha.300" }}
                      _focus={{ borderColor: "blue.300", boxShadow: "none" }}
                      placeholder="Enter role"
                    />
                  </Field>

                  <Field label="Status">
                    <SelectRoot 
                      value={formData.status}
                      onValueChange={handleStatusChange}
                      collection={statusOptions}
                    >
                      <SelectTrigger>
                        <SelectValueText />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.items.map((item) => (
                          <SelectItem 
                            key={item.value} 
                            item={item}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
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

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="ghost"
              _hover={{ bg: 'whiteAlpha.100' }}
              color="whiteAlpha.900"
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            type="submit"
            form="add-crew-form"
            bg="blue.500"
            _hover={{ bg: 'blue.600' }}
            color="white"
          >
            Add Crew Member
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}

export default AddCrewMemberDialog; 