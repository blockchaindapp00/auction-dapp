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
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Next.js router hook

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setError(''); // Clear error if valid
      // Handle the actual login logic here (e.g., API call)
      console.log('Logging in:', { email, password });
      router.push('/dashboard'); // Redirect to another page after login
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
            <Button type="submit" colorScheme="blue" size="lg" width="full">
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
