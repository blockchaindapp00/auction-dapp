'use client'
import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Stack,
  Button,
  Divider,
  Badge,
  useClipboard,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';


const ProfileDashboard = () => {
  const walletAddress = '0x1234...abcd5678efgh'; // Replace with the actual wallet address
  const { hasCopied, onCopy } = useClipboard(walletAddress);

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={8}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p={6}
      bg="gray.900"
      color="gray.100"
    >
      <Flex justify="center" mb={4}>
        <Avatar
          size="xl"
          name="Yogesh" // Replace with dynamic user data
          src="https://bit.ly/broken-link" // Replace with user's profile image URL
        />
      </Flex>

      <Stack spacing={4} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Yogesh {/* Replace with dynamic username */}
        </Text>

        <Flex justify="center" align="center">
          <Text fontSize="sm" fontWeight="medium">
            Wallet Address:
          </Text>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="blue.500"
            ml={2}
            isTruncated
            maxW="150px"
            title={walletAddress}
          >
            {walletAddress}
          </Text>
          <Tooltip label={hasCopied ? 'Copied!' : 'Copy to clipboard'} closeOnClick={false}>
            <IconButton
              size="sm"
              ml={2}
              icon={<CopyIcon />}
              onClick={onCopy}
              aria-label="Copy Wallet Address"
            />
          </Tooltip>
        </Flex>

        <Text fontSize="md" color="gray.600">
          Yogesh's Auction DApp User {/* Additional details can go here */}
        </Text>

        <Stack direction="row" justify="center" spacing={6}>
          <Button colorScheme="blue">Edit Profile</Button>
          <Button variant="outline" colorScheme="red">
            Disconnect Wallet
          </Button>
        </Stack>

        <Divider />

        {/* Additional Information */}
        <Box textAlign="left">
          <Text fontSize="sm" fontWeight="medium">
            Email: yogesh@example.com {/* Replace with dynamic email */}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
            Member Since: September 2024 {/* Replace with dynamic registration date */}
          </Text>

          <Text fontSize="sm" fontWeight="medium">
            Account Status: <Badge colorScheme="green">Verified</Badge>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProfileDashboard;
