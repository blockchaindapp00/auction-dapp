
import { 
  Box,
  SimpleGrid,
  Heading} from "@chakra-ui/react";
import AuctionCard from "@/components/Card";
import Nav from "@/components/Nav";
import BidModal from "@/components/BidModal";
export default function Home(){
    return (
  
      <Box
        bgGradient="linear(to-r, #1A202C, #2D3748, #4A5568)"
        color="white"
        minH="100vh"
        paddingX={10}>
        <Nav/>
        
       
        <Heading marginX={10}>Live Auctions</Heading>
        <SimpleGrid columns={2} spacing={40} marginTop={10} marginX={10}  >
            <AuctionCard  title="Example" description="lorem ipsum doler sit amet " startPrice={20} bid={40} 
            img="https://via.placeholder.com/600/92c952"
            />
        </SimpleGrid>
        <BidModal/>    
    </Box>
    );
};