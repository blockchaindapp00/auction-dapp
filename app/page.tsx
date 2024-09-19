import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import AuctionCard from "@/components/Card";
import Nav from "@/components/Nav";
import BidModal from "@/components/BidModal";

const Home: React.FC = () => {
  const auctionCoordinator = "John Doe";
  const auctionEndTime = "2024-09-30T18:00:00"; // Example ISO date string

  return (
    <Box
      bgGradient="linear(to-r, #1A202C, #2D3748, #4A5568)" // Consistent gradient background
      color="white"
      minH="100vh"
      paddingX={10} // Padding for left and right spacing
      pt={16} // Add padding to the top to account for the fixed navbar height
    >
      {/* Navigation Bar */}
      <Nav />

      {/* Heading for Auctions */}
      <Heading marginX={10} marginTop={10} fontWeight="extrabold">
        Live Auctions
      </Heading>

      {/* Auction Cards Grid */}
      <SimpleGrid columns={2} spacing={10} marginTop={5} marginX={10}>
        <AuctionCard
          title="Example Auction"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          startPrice={20}
          bid={40}
          img="https://via.placeholder.com/600/92c952"
          auctionCoordinator={auctionCoordinator}
          auctionEndTime={auctionEndTime}
        />
        {/* Add more AuctionCard components as needed */}
      </SimpleGrid>

      {/* Modal for Bids */}
      <BidModal />
    </Box>
  );
};

export default Home;
