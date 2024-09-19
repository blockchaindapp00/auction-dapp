import React from 'react';
import {
  Box,
  Image,
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
}

const AuctionCard = (props: cardProps) => {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={'gray.800'}
      color={'gray.100'}
    >
      <Image
        src={props.img}
        alt="Vintage Watch"
        objectFit="cover"
        w="100%"
        h="200px"
      />

      <Box p="6">
        <Stack spacing="3">
          <Heading size="md">{props.title}</Heading>
          <Text fontSize="sm">
            {props.description}
          </Text>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="medium">
              Starting Price:
            </Text>
            <Text fontSize="sm" fontWeight="bold">
              {props.startPrice}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" fontWeight="medium">
              Current Bid:
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="blue.400">
              {props.bid}
            </Text>
          </Flex>
        </Stack>
      </Box>

      <Box px="6" pb="6">
        <Button colorScheme="blue" width="full">
          Place Bid
        </Button>
      </Box>
    </Box>
  );
};

export default AuctionCard;