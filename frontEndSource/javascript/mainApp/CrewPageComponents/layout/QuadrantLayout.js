import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import FleetDrawer from '../../FleetComponents/FleetDrawer';

const QuadrantLayout = ({ children }) => {
  return (
    <Box position="relative" h="100vh" overflow="hidden">
      {/* Background Image Layer */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgImage="url('/static/images/space_background3.png')"
        bgSize="cover"
        bgPosition="center"
        zIndex={1}
      />
      
      {/* Content Grid Layer */}
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        templateRows={{ base: 'repeat(4, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={6}
        p={6}
        position="relative"
        zIndex={2}
        h="100%"
        color="white"
      >
        {children}
      </Grid>

      {/* Fleet Drawer */}
      <FleetDrawer>
        <Box color="white">Fleet content will go here</Box>
      </FleetDrawer>
    </Box>
  );
};

export default QuadrantLayout; 