"use client";
import React from "react";
import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  Divider,
  Badge,
  useClipboard,
  IconButton,
  Tooltip,
  VStack,
  Heading,
  Avatar,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useSessionStore } from "@/utils/zustand/sessionStore";

const ProfileDashboard = () => {
  const router = useRouter(); // Initialize the router
  const user = useSessionStore((state) => state.user);
  const walletAddress = "0x1234...abcd5678efgh"; // Replace with the actual wallet address
  const { hasCopied, onCopy } = useClipboard(walletAddress);

  // Example data for bids and sold items
  const bids = [
    {
      item: "Artwork 01",
      status: "Successful",
      price: "2.5 ETH",
      date: "2024-09-01",
    },
    {
      item: "Digital Sculpture",
      status: "Unsuccessful",
      price: "1.8 ETH",
      date: "2024-08-15",
    },
    {
      item: "3D NFT",
      status: "Successful",
      price: "3.2 ETH",
      date: "2024-07-22",
    },
  ];

  const soldItems = [
    { item: "Painting X", price: "2.0 ETH", date: "2024-08-10" },
    { item: "Sculpture Y", price: "3.5 ETH", date: "2024-07-18" },
  ];

  return (
    <Flex direction="column" minH="100vh" bg="gray.800" color="gray.100" p={4}>
      {/* Navbar */}
      <Flex
        justify="space-between"
        align="center"
        bg="gray.900"
        p={4}
        borderRadius="lg"
        mb={6}
        boxShadow="md"
      >
        <Heading size="lg" color="gray.100">
          Profile Dashboard
        </Heading>
        <Button colorScheme="blue" onClick={() => router.push('/')}> {/* Add onClick handler */}
          Back to Home
        </Button>
      </Flex>

      {/* Full-screen Flex container */}
      <Flex justify="center" align="start" h="full" wrap="wrap" gap={6}>
        {/* First Column: User Profile (5% Wider, Equal Height) */}
        <Box
          flex="1.05" // Increase width by 5%
          maxW="470px" // Adjust max width to maintain 5% width difference
          minW="450px" // Minimum width
          h="600px" // Set uniform height for all columns
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          p={6}
          bg="gray.900"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }} // Hover effect
        >
          <Stack spacing={4} textAlign="center">
            <Flex justify="center" mb={4}>
              <Avatar
                size="xl"
                name="Yogesh" // Replace with dynamic user data
                src="https://bit.ly/broken-link" // Replace with user's profile image URL
              />
            </Flex>

            <Text fontSize="2xl" fontWeight="bold">
              {user?.username || "Yogesh"}
            </Text>

            <Flex justify="center" align="center">
              <Text fontSize="sm" fontWeight="medium">
                {user?.public_address || "0x1234...abcd5678efgh"}
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
              <Tooltip
                label={hasCopied ? "Copied!" : "Copy to clipboard"}
                closeOnClick={false}
              >
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
              Yogesh's Auction DApp User
            </Text>

            <Stack direction="row" justify="center" spacing={6}>
              <Button colorScheme="blue">Edit Profile</Button>
              <Button variant="outline" colorScheme="red">
                Logout
              </Button>
            </Stack>

            <Divider />

            {/* Additional Information */}
            <Box textAlign="left">
              <Text fontSize="sm" fontWeight="medium">
                Email: {user?.email || "YpR0s@example.com"}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                Member Since: {user?.joinedOn}
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                Account Status: <Badge colorScheme="green">Verified</Badge>
              </Text>
            </Box>
          </Stack>
        </Box>

        {/* Second Column: Bids (with Scrollbar and Equal Height) */}
        <Box
          flex="1" // Normal width
          maxW="450px"
          minW="450px"
          h="600px" // Set height to match the profile column
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          bg="gray.700"
          boxShadow="md"
          overflowY="auto" // Scrollable content
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Bids
          </Text>

          <VStack spacing={4}>
            {bids.map((bid, index) => (
              <Box
                key={index}
                w="100%"
                p={4}
                bg="gray.800"
                borderRadius="lg"
                boxShadow="md"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }} // Hover effect
              >
                <Text fontWeight="bold">{bid.item}</Text>
                <Text>
                  Status:{" "}
                  <Badge
                    color={
                      bid.status === "Successful" ? "green.400" : "red.400"
                    }
                  >
                    {bid.status}
                  </Badge>
                </Text>
                <Text>Price: {bid.price}</Text>
                <Text>Date of Bid: {bid.date}</Text>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Third Column: Sold Items (with Scrollbar and Equal Height) */}
        <Box
          flex="1" // Normal width
          maxW="450px"
          minW="450px"
          h="600px" // Set height to match the profile column
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          bg="gray.700"
          boxShadow="md"
          overflowY="auto" // Scrollable content
        >
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Sold Items
          </Text>

          <VStack spacing={4}>
            {soldItems.map((soldItem, index) => (
              <Box
                key={index}
                w="100%"
                p={4}
                bg="gray.800"
                borderRadius="lg"
                boxShadow="md"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }} // Hover effect
              >
                <Text fontWeight="bold">{soldItem.item}</Text>
                <Text>Price: {soldItem.price}</Text>
                <Text>Date Sold: {soldItem.date}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProfileDashboard;
