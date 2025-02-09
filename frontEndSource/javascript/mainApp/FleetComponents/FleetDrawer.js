import React, { useState, useEffect } from 'react';
import { IconButton, Box, Text, HStack, Button, Spinner, Center } from '@chakra-ui/react';
import { IoChevronDown, IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerTitle,
  DrawerTrigger,
  DrawerCloseTrigger,
} from '../../components/ui/drawer';
import FleetAvatar from './FleetAvatar';
import { useFleets } from './hooks/useFleetQueries';

const FleetDrawer = ({ onFleetChange }) => {
  const { data: fleets, isLoading, error } = useFleets();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (fleets && fleets[currentIndex]) {
      onFleetChange(fleets[currentIndex].id);
    }
  }, [currentIndex, fleets, onFleetChange]);

  const handlePrevious = () => {
    if (fleets && fleets.length > 0) {
      setCurrentIndex(prev => prev === 0 ? fleets.length - 1 : prev - 1);
    }
  };

  const handleNext = () => {
    if (fleets && fleets.length > 0) {
      setCurrentIndex(prev => prev === fleets.length - 1 ? 0 : prev + 1);
    }
  };

  const currentFleet = fleets?.[currentIndex];

  return (
    <DrawerRoot placement="top">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton
          
          variant="ghost"
          color="white"
          position="fixed"
          top="4px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          size="lg"
          bg="rgba(26, 32, 44, 0.8)"
          _hover={{
            bg: 'rgba(26, 32, 44, 0.9)'
          }}
          boxShadow="0 0 10px rgba(0,0,0,0.3)"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
            <IoChevronDown size={24} />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent
        roundedBottom="l3"
        bg="rgba(26, 32, 44, 0.8)"
        backdropFilter="blur(8px)"
        height="80vh"
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        zIndex={1001}
      >
        <DrawerHeader>
          <DrawerTitle color="white">Fleet Management</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {isLoading ? (
            <Center h="100%">
              <Spinner color="white" size="xl" />
            </Center>
          ) : error ? (
            <Center h="100%" color="white">
              Error loading fleets
            </Center>
          ) : (
            <HStack spacing={4} justify="center" align="center" h="100%">
              <Button
                leftIcon={<IoChevronBackOutline size={24} />}
                variant="ghost"
                color="white"
                size="lg"
                onClick={handlePrevious}
                isDisabled={!fleets?.length}
                _hover={{ bg: 'whiteAlpha.200' }}
              />
              
              {currentFleet && <FleetAvatar fleet={currentFleet} />}
              
              <Button
                rightIcon={<IoChevronForwardOutline size={24} />}
                variant="ghost"
                color="white"
                size="lg"
                onClick={handleNext}
                isDisabled={!fleets?.length}
                _hover={{ bg: 'whiteAlpha.200' }}
              />
            </HStack>
          )}
        </DrawerBody>
        <DrawerCloseTrigger 
          position="absolute"
          top={4}
          right={4}
          color="white"
        />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default FleetDrawer; 