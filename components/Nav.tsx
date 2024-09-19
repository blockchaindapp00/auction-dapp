import React from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
  Heading,
} from "@chakra-ui/react";

const Nav: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="black" // Dark black background
      p={4} // Padding for spacing
      boxShadow="md" // Optional: add shadow for better separation
      w="98.5%" // Full-width
      position="fixed" // Fixed position to stay at the top
      top={0} // Aligns to the top
      left={0} // Aligns to the left
      zIndex={1000} // Ensure it stays on top of other content
      mt={3} // Reduced margin at the top
      mx={3} // Equal margin on left and right
      borderRadius="lg" // Large border radius for curves on corners
    >
      <Heading
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
      >
        Auction DApp
      </Heading>
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          My Account
        </MenuButton>
        <MenuList
          bg="gray.900" // Dark background for the menu list
          borderColor="gray.700" // Border color for the menu list
          borderRadius="lg" // Large border radius for curves on corners
        >
          <MenuGroup title="Profile">
            <MenuItem
              _hover={{ bg: "gray.700" }} // Hover effect for menu items
            >
              My Account
            </MenuItem>
            <MenuItem
              _hover={{ bg: "gray.700" }} // Hover effect for menu items
            >
              Payments
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Help">
            <MenuItem
              _hover={{ bg: "gray.700" }} // Hover effect for menu items
            >
              Docs
            </MenuItem>
            <MenuItem
              _hover={{ bg: "gray.700" }} // Hover effect for menu items
            >
              FAQ
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Nav;