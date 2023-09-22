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
  useMediaQuery,
  IconButton,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { HiUser } from "react-icons/hi2";

function Header() {
  const { data: session } = useSession();
  const [isMobile] = useMediaQuery("(max-width: 400px)", { fallback: false });

  return (
    <Flex p={8}>
      {session && !isMobile && (
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
            href="/formular"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Formular
          </Button>
          <Button
            as={Link}
            href="/admin/users"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Benutzer
          </Button>
          <Button
            as={Link}
            href="/admin/filter"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Filter
          </Button>
        </HStack>
      )}
      <Spacer />
      <HStack gap={{ base: 0, md: 8 }} color={"gray.500"}>
        <Button
          as={Link}
          href={"/impressum"}
          color={"gray.500"}
          fontWeight={"400"}
          variant={"ghost"}
        >
          Impressum
        </Button>
        <Button
          as={Link}
          href={"/datenschutz"}
          color={"gray.500"}
          fontWeight={"400"}
          variant={"ghost"}
        >
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
                <MenuItem as={Link} href="/formular">
                  Formular
                </MenuItem>
                <MenuItem as={Link} href="/admin/users">
                  Benutzer
                </MenuItem>
                <MenuItem as={Link} href="/admin/filter">
                  Filter
                </MenuItem>
                <MenuDivider />

                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <Link href={"/api/auth/signin"}>
            {isMobile ? (
              <IconButton color={"gray.500"} mr={2} icon={<HiUser />} />
            ) : (
              <Button color={"gray.500"} fontWeight={"400"}>
                Login
              </Button>
            )}
          </Link>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
