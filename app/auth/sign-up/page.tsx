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
  Spinner,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../auth';

// Overlay Component
const LoadingOverlay: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    isOpen ? (
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundColor="rgba(0, 0, 0, 0.6)"
        zIndex={999}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color="white" />
      </Box>
    ) : null
  );
};

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Simple validation
  const validateForm = () => {
    if (!username || !email || !password || !address || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      onOpen();

      try {
        const result = await registerUser({ email, username, password, public_address: address });
        toast({
          title: 'Success',
          description: result.message,
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        setTimeout(() => {
          onClose();
          router.push('/auth/login');
        }, 2000);
      } catch (err: any) {
        toast({
          title: 'Error',
          description: err.message || 'Registration failed',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        onClose();
      } finally {
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
      position="relative"
    >
      {/* Loading Overlay */}
      <LoadingOverlay isOpen={isOpen} />

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
        bg="gray.900"
        position="relative"
        zIndex={1}
      >
        <Heading as="h3" size="lg" textAlign="center" mb={6}
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
        >
          Sign Up
        </Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Username Field */}
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

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

            {/* Address Field */}
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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

            {/* Confirm Password Field */}
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" colorScheme="blue" size="lg" width="full" isLoading={loading}>
              Sign Up
            </Button>

            <Text textAlign="center" fontSize="sm">
              Already have an account? <Button variant="link" colorScheme="blue" onClick={() => router.push('/auth/login')}>Login</Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupForm;
