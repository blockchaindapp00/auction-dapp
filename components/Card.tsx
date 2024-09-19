import React from 'react';
import {
  Box,
  Stack,
  Heading,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react';

export type cardProps = {
  title: string;
  description: string;
  startPrice: number;
  img: string;
  bid: number;
  auctionCoordinator: string;
  auctionEndTime: string; // ISO date string
}

const AuctionCard: React.FC<cardProps> = (props) => {
  const calculateTimeRemaining = (endTime: string): string => {
    const now = new Date();
    const end = new Date(endTime);
    const timeDiff = end.getTime() - now.getTime();

    if (timeDiff <= 0) return "Auction ended";

    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s remaining`;
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={'gray.800'}
      color={'gray.100'}
    >
      <Box>
        {/* Header section */}
        <Flex
          align="center"
          justify="space-between"
          p="4"
          borderBottomWidth="1px"
          borderBottomColor="gray.700"
        >
          <Stack spacing="1">
            <Text fontWeight="bold" fontSize="lg">{props.auctionCoordinator}</Text>
            <Text fontSize="sm" color="gray.400">posted this</Text>
          </Stack>
          <Text fontSize="sm" color="gray.400">{calculateTimeRemaining(props.auctionEndTime)}</Text>
        </Flex>

        <Box>
          <img
            src={props.img}
            alt={props.title}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        </Box>

        <Box p="6">
          <Stack spacing="3">
            <Heading size="md">{props.title}</Heading>
            <Text fontSize="sm">{props.description}</Text>
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" fontWeight="medium">Starting Price:</Text>
              <Text fontSize="sm" fontWeight="bold">{props.startPrice}</Text>
            </Flex>
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" fontWeight="medium">Current Bid:</Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.400">{props.bid}</Text>
            </Flex>
          </Stack>
        </Box>

        <Box px="6" pb="6">
          <Button colorScheme="blue" width="full">Place Bid</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuctionCard;
