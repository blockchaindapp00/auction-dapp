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
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { authenticateUser, fetchCreatedItems, fetchOwnedItems } from '../auth'; 
import { useSessionStore } from '@/utils/zustand/sessionStore';

const LoginForm = () => {
  const setUser = useSessionStore((state) => state.setUser);
  const setOwnedItems = useSessionStore((state) => state.setOwnedItems);
  const setCreatedItems = useSessionStore((state) => state.setCreatedItems);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  // Simple validation
  const validateForm = () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
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
        const result = await authenticateUser({ email, password });


        if (result.success) {
          setUser(result.data);
          // const ownedItems = await fetchOwnedItems(result.data.username);
          // setOwnedItems(ownedItems.ownedItems);
          // const createdItems = await fetchCreatedItems(result.data.username);
          // setCreatedItems(createdItems.items);

          toast({
            title: 'Login successful!',
            description: 'You have been logged in successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          
          router.push('/');
        } else {
          setError(result.message);
          toast({
            title: 'Login failed',
            description: result.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.error('Login error:', err);
        setError('An unexpected error occurred. Please try again.');
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false); // Reset loading state
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
      position="relative"
    >
      {/* Background Box */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex={-1}
      >
        {/* Gradient Background Box */}
      </Box>

      {/* Form Box */}
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
        position="relative"
        zIndex={1}
      >
        <Heading
          as="h3"
          size="lg"
          textAlign="center"
          mb={6}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
          fontWeight="extrabold"
        >
          Login
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

            {/* Email Field */}
            <FormControl isRequired>
              <FormLabel color="white">Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                borderColor="black"
                _focus={{ borderColor: 'black', boxShadow: '0 0 0 1px black' }}
                _placeholder={{ color: 'black' }}
                bg="white"
                color="black"
              />
            </FormControl>

            {/* Password Field */}
            <FormControl isRequired>
              <FormLabel color="white">Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor="black"
                _focus={{ borderColor: 'black', boxShadow: '0 0 0 1px black' }}
                _placeholder={{ color: 'black' }}
                bg="white"
                color="black"
              />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="blue" size="lg" width="full" isLoading={loading}>
              Login
            </Button>

            <Text textAlign="center" fontSize="sm" color="white">
              Don't have an account?{' '}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => router.push('/auth/sign-up')}
              >
                Sign up
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
