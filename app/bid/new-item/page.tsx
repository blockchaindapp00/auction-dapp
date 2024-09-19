'use client';
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

const AddBidItem = () => {
  const [itemName, setItemName] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [bidEndDate, setBidEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Simple validation
  const validateForm = () => {
    if (!itemName || !startingBid || !bidEndDate || !description) {
      setError('Please fill out all fields');
      return false;
    }
    if (isNaN(Number(startingBid))) {
      setError('Starting bid must be a number');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setError('');
      console.log('Adding item:', { itemName, startingBid, bidEndDate, description });
    }
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, #1A202C, #2D3748, #4A5568)"
      color="white"
      paddingX={10}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="full"
        maxW="lg"
        p={8}
        boxShadow="lg"
        borderRadius="md"
        borderColor="white"
        borderWidth="1px"
        borderStyle="solid"
        bg="gray.900"
      >
        <Heading as="h3" size="lg" textAlign="center" mb={6}
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='4xl'
          fontWeight='extrabold'
        >
          Add New Bid Item
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Error message */}
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}

            {/* Item Name Field */}
            <FormControl isRequired>
              <FormLabel color="gray.200">Item Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter the item name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                borderColor="gray.500"
                _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px teal.300' }}
                width="100%"
                padding={4}
                borderRadius="md"
                bg="gray.800"
              />
            </FormControl>

            {/* Starting Bid Field */}
            <FormControl isRequired>
              <FormLabel color="gray.200">Starting Bid</FormLabel>
              <Input
                type="text"
                placeholder="Enter the starting bid"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                borderColor="gray.500"
                _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px teal.300' }}
                width="100%"
                padding={4}
                borderRadius="md"
                bg="gray.800"
              />
            </FormControl>

            {/* Bid End Date Field */}
            <FormControl isRequired>
              <FormLabel color="gray.200">Bid End Date</FormLabel>
              <Input
                type="date"
                placeholder="Enter bid end date"
                value={bidEndDate}
                onChange={(e) => setBidEndDate(e.target.value)}
                borderColor="gray.500"
                _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px teal.300' }}
                width="100%"
                padding={4}
                borderRadius="md"
                bg="gray.800"
              />
            </FormControl>

            {/* Description Field */}
            <FormControl isRequired>
              <FormLabel color="gray.200">Description</FormLabel>
              <Input
                type="text"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                borderColor="gray.500"
                _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px teal.300' }}
                width="100%"
                padding={4}
                borderRadius="md"
                bg="gray.800"
              />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="blue" size="lg" width="full">
              Add Item
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddBidItem;
