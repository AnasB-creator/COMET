import React from 'react';
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  Button,
  Image,
  Skeleton,
  Box,
  Link,
  Icon
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { GoChevronRight } from 'react-icons/go';
import { MdBolt } from 'react-icons/md';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <Container maxW="6xl" px={{ base: 6, md: 3 }} py={24}>
      <Stack direction={{ base: 'column', md: 'row' }} justifyContent="center">
        <Stack direction="column" spacing={6} justifyContent="center" maxW="480px">
          <HStack
            as={motion.div}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            p={1}
            rounded="full"
            fontSize="sm"
            w="max-content"
            bg="gray.300"
            cursor="pointer"
          >
            <Box
              py={1}
              px={2}
              lineHeight={1}
              rounded="full"
              color="white"
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
            >
              Space Health
            </Box>
            <HStack spacing={1} alignItems="center" justifyContent="center">
              <Text lineHeight={1}>Advanced Crew Monitoring</Text>
              <Icon as={GoChevronRight} w={4} h={4} />
            </HStack>
          </HStack>
          <chakra.h1
            fontSize={{ base: "4xl", md: "5xl" }}
            lineHeight={1.2}
            fontWeight="bold"
            textAlign="left"
            as={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Monitor Space Crew Health <br />
            <chakra.span color="teal">with COMET</chakra.span>
          </chakra.h1>
          <Text
            fontSize="1.2rem"
            textAlign="left"
            lineHeight="1.375"
            fontWeight="400"
            color="gray.500"
          >
            COMET (Crew Observation & Medical Evaluation Tool) provides comprehensive health monitoring 
            for space fleet crews. Track vital metrics, generate reports, and ensure crew well-being 
            with our advanced monitoring system.
          </Text>
          <HStack
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            spacing={{ base: 0, sm: 2 }}
            mb={{ base: '3rem !important', sm: 0 }}
            flexWrap="wrap"
          >
            <chakra.button
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              w={{ base: '100%', sm: 'auto' }}
              h={12}
              px={6}
              color="white"
              size="lg"
              rounded="md"
              mb={{ base: 2, sm: 0 }}
              zIndex={5}
              lineHeight={1}
              bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              _hover={{ bgGradient: 'linear(to-l, #0ea5e9,#2563eb)', opacity: 0.9 }}
            >
              <chakra.span> Launch Fleet Monitor </chakra.span>
              <Icon as={MdBolt} h={4} w={4} ml={1} />
            </chakra.button>
            <Box
              as={motion.div}
              whileHover={{ scale: 1.05, boxShadow: "lg" }}
              whileTap={{ scale: 0.95 }}
              d="flex"
              justifyContent="center"
              bg="white"
              w={{ base: '100%', sm: 'auto' }}
              border="1px solid"
              borderColor="gray.300"
              p={3}
              lineHeight={1.18}
              rounded="md"
              boxShadow="md"
              as={Link}
              zIndex={55555555}
            >
              View Features
            </Box>
          </HStack>
        </Stack>
        <Box
          as={motion.div}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          ml={{ base: 0, md: 5 }}
          pos="relative"
        >
          <DottedBox />
          <Image
            w="100%"
            h="100%"
            minW={{ base: "auto", md: "30rem" }}
            objectFit="cover"
            src="/static/images/comets.png"
            rounded="md"
            fallback={<Skeleton />}
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.02)" }}
          />
        </Box>
      </Stack>
    </Container>
  );
};

function DottedBox() {
  return (
    <Box position="absolute" left="-45px" top="-30px" height="full" maxW="700px" zIndex={-1}>
      <svg
        color="gray.200"
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"></rect>
      </svg>
    </Box>
  );
}

export default HeroSection;