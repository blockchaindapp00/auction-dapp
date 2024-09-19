
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import AuctionCard from "@/components/Card";
import Nav from "@/components/Nav";
import BidModal from "@/components/BidModal";

const Home: React.FC = () => {
  const auctionCoordinator = "John Doe";
  const auctionEndTime = "2024-09-30T18:00:00"; // Example ISO date string

  return (
    <Box
      bgGradient="linear(to-r, #1A202C, #2D3748, #4A5568)"
      color="white"
      minH="100vh"
      paddingX={10}
    >
      <Nav />
      <Heading marginX={10}>Live Auctions</Heading>
      <SimpleGrid columns={2} spacing={40} marginTop={10} marginX={10}>
        <AuctionCard
          title="Example"
          description="lorem ipsum dolor sit amet"
          startPrice={20}
          bid={40}
          img="https://via.placeholder.com/600/92c952"
          auctionCoordinator={auctionCoordinator}
          auctionEndTime={auctionEndTime}
        />
        {/* Add more AuctionCard components here as needed */}
      </SimpleGrid>
      <BidModal />
    </Box>
  );
};

export default Home;
