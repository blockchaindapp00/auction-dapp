import {
    Box,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    Button
} from "@chakra-ui/react";
const Nav = () => {
    return (
        <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        >
          <Text
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              bgClip='text'
              fontSize='6xl'
              fontWeight='extrabold'>
                Welcome to Auction DApp
            </Text>
            <Menu>
              <MenuButton as={Button} colorScheme='blue'>
                My Account
              </MenuButton>
              <MenuList>
                <MenuGroup title='Profile'>
                  <MenuItem>My Account</MenuItem>
                  <MenuItem>Payments </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Help'>
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
        </Box>
    )
}
export default Nav;