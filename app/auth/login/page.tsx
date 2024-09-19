'use client'
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

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    }
  };

  return (
    <Box 
     maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md" bg="grey.900" color='gray.800'>
      <Heading as="h3" size="lg" textAlign="center" mb={6}>
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
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          {/* Password Field */}
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {/* Submit Button */}
          <Button type="submit" colorScheme="blue" size="lg" width="full">
            Login
          </Button>

          <Text textAlign="center" fontSize="sm">
            Don't have an account? <Button variant="link" colorScheme="blue">Sign up</Button>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
