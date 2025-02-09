import React from 'react';
import { Box, Grid } from '@chakra-ui/react';

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
        opacity={0.8}
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
    </Box>
  );
};

export default QuadrantLayout; 