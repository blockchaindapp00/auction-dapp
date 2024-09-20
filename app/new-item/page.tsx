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
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { addItem } from './api'; // Adjust path as necessary
import { useSessionStore } from '@/utils/zustand/sessionStore';


const AddBidItem = () => {
  const [title, setTitle] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImageUrl] = useState('');
  const [bidEndDate, setBidEndDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const userId = useSessionStore(state => state.user?.username);

  // Simple validation
  const validateForm = () => {

    if (!title || !startingBid || !description || !image || !bidEndDate) {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setError('');
      setLoading(true);
      

      try {
        await addItem({
          title,
          startingBid,
          description,
          image,
          bidEndDate,
          userId,
        });
        setSuccessMessage('Item added successfully');
        toast({
          title: 'Item added.',
          description: 'Your item has been added successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          setLoading(false);
          router.push('/items'); // Redirect to another page
        }, 2000); // Redirect after 2 seconds
      } catch (err: any) {
        setError(err.message || 'Failed to add item');
        toast({
          title: 'Error.',
          description: err.message || 'Failed to add item.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
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

            {/* Success message */}
            {successMessage && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>{successMessage}</AlertTitle>
              </Alert>
            )}

            {/* Title Field */}
            <FormControl isRequired>
              <FormLabel color="gray.200">Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter the item title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                type="number"
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

            {/* Image URL Field */}
            <FormControl isRequired>
              <FormLabel color="gray.200">Image URL</FormLabel>
              <Input
                type="url"
                placeholder="Enter the image URL"
                value={image}
                onChange={(e) => setImageUrl(e.target.value)}
                borderColor="gray.500"
                _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px teal.300' }}
                width="100%"
                padding={4}
                borderRadius="md"
                bg="gray.800"
              />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="blue" size="lg" width="full" isLoading={loading}>
              Add Item
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AddBidItem;
