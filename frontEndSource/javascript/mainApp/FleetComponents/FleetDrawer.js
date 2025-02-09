import React from 'react';
import { IconButton, Box, Text } from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';
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

const FleetDrawer = ({ children }) => {
  return (
    <DrawerRoot placement="top">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton
          icon={<IoChevronDown size={24} />}
          variant="ghost"
          color="white"
          position="fixed"
          top="4px"
          left="50%"
          transform="translateX(-50%)"
          zIndex={9999}
          size="lg"
          bg="rgba(26, 32, 44, 0.8)"
          _hover={{
            bg: 'rgba(26, 32, 44, 0.9)'
          }}
          boxShadow="0 0 10px rgba(0,0,0,0.3)"
          border="1px solid"
          borderColor="whiteAlpha.200"
        />
      </DrawerTrigger>
      <DrawerContent
        roundedBottom="l3"
        bg="rgba(26, 32, 44, 0.8)"
        backdropFilter="blur(8px)"
        height="80vh"
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
      >
        <DrawerHeader>
          <DrawerTitle color="white">Fleet Management</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          {children}
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