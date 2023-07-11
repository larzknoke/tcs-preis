import {
  Badge,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Spacer,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

function Header() {
  return (
    <Flex alignItems={"end"} minWidth="max-content" p={8}>
      <Spacer />
      <HStack gap={4} color={"gray.500"}>
        <Button color={"gray.500"} fontWeight={"400"}>
          Impressum
        </Button>
        <Button color={"gray.500"} fontWeight={"400"}>
          Datenschutz
        </Button>
        {true ? (
          <HStack spacing={"6"}>
            <Menu>
              <MenuButton>
                <Avatar size={"sm"} name="Lars Knoke">
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </MenuButton>
              <MenuList>
                <MenuItem>Admin</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <Link href={"/api/auth/signin"}>
            <Button color={"gray.500"} fontWeight={"400"}>
              Login
            </Button>
          </Link>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
