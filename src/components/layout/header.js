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
  MenuDivider,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

function Header() {
  const { data: session } = useSession();

  return (
    <Flex alignItems={"end"} minWidth="max-content" p={8}>
      {session && (
        <HStack gap={4} color={"gray.500"}>
          <Button
            as={Link}
            href="/admin/bewerbungen"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Bewerbungen
          </Button>
          <Button
            as={Link}
            href="/admin/botschafter"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Botschafter
          </Button>
          <Button
            as={Link}
            href="/admin/kampagne"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Kampagnen
          </Button>
          <Button
            as={Link}
            href="/"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Formular
          </Button>
        </HStack>
      )}
      <Spacer />
      <HStack gap={4} color={"gray.500"}>
        <Button color={"gray.500"} fontWeight={"400"} variant={"ghost"}>
          Impressum
        </Button>
        <Button color={"gray.500"} fontWeight={"400"} variant={"ghost"}>
          Datenschutz
        </Button>
        {session ? (
          <HStack spacing={"6"}>
            <Menu>
              <MenuButton>
                <Avatar size={"sm"} name="Lars Knoke">
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} href="/admin/bewerbungen">
                  Bewerbungen
                </MenuItem>
                <MenuItem as={Link} href="/admin/botschafter">
                  Botschafter
                </MenuItem>
                <MenuItem as={Link} href="/admin/kampagne">
                  Kampagnen
                </MenuItem>
                <MenuItem as={Link} href="/">
                  Formular
                </MenuItem>
                <MenuDivider />

                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
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
