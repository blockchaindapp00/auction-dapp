'use client';
import { useEffect, useState } from "react";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import AuctionCard from "@/components/Card";
import Nav from "@/components/Nav";
import BidModal from "@/components/BidModal";
import { fetchItems,Item } from "./api";



const Home: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems(); // Fetch items from your API
        setItems(data.items); // Set the fetched items
        setLoading(false);
      } catch (error) {
        console.error("Failed to load auction items:", error);
        setLoading(false);
      }
    };

    loadItems();
  }, []);

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
      <Heading fontSize={"22px"} marginX={10} marginTop={10} fontWeight="extrabold">
        Live Auctions
      </Heading>

      {/* Auction Cards Grid */}
      <SimpleGrid columns={[1,null,4]} spacing={10} marginTop={5} marginX={10}>
        {loading ? (
          <Heading>Loading auctions...</Heading>
        ) : (
          items.map((item) => (
            <AuctionCard
               // Assuming each item has an _id property
              title={item.title}
              description={item.description}
              startPrice={item.start_price}
              bid={item.highest_bid}
              img={item.image}
              auctionCoordinator={item.posted_by} // You may need to adjust this to display user info
              auctionEndTime={item.start_time_stamp}
            />
          ))
        )}
      </SimpleGrid>

      {/* Modal for Bids */}
      <BidModal />
    </Box>
  );
};

export default Home;
