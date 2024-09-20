'use client';
import React from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/utils/zustand/sessionStore";

const Nav: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);
  const logout = useSessionStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.push('/');  // Redirect to home page after logout
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.900"
      p={4}
      boxShadow="md"
      w="91%"
      
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
      mt={3}
      mx={20}
      borderRadius="lg"
    >
      <Heading
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="3xl"
        fontWeight="extrabold"
      >
        Auction DApp
      </Heading>
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          My Account
        </MenuButton>
        <MenuList
          bg="gray.900"
          borderColor="gray.700"
          borderRadius="lg"
        >
          {isAuthenticated ? (
            <>
              <MenuItem onClick={() => router.push("/profile")} _hover={{ bg: "gray.700" }}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => router.push("/new-item")} _hover={{ bg: "gray.700" }}>
                Sell NFT
              </MenuItem>
              <MenuItem onClick={handleLogout} _hover={{ bg: "gray.700" }}>
                Logout
              </MenuItem>
              <MenuDivider />
            </>
          ) : (
            <MenuItem onClick={() => router.push("/auth/login")} _hover={{ bg: "gray.700" }}>
              Log In
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Nav;