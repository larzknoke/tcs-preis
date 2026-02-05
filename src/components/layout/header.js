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
import { ChevronDownIcon } from "@chakra-ui/icons";

function Header() {
  const { data: session } = useSession();
  const [isMobile] = useMediaQuery("(max-width: 900px)", { fallback: false });

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
            href="/admin/filter"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Filter
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
            href="/admin/anmeldungen"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Anmeldungen
          </Button>
          {/* <Button
            as={Link}
            href="/formular"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Formular
          </Button> */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              color={"gray.500"}
              fontWeight={"400"}
              rightIcon={<ChevronDownIcon />}
            >
              Formulare
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href="/formular">
                Stiftungspreis
              </MenuItem>
              <MenuItem as={Link} href="/formular-sonder">
                Sonderpreis
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <Button
            as={Link}
            href="/admin/users"
            color={"gray.500"}
            fontWeight={"400"}
            variant={"ghost"}
          >
            Benutzer
          </Button> */}
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
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            color={"gray.500"}
            fontWeight={"400"}
            rightIcon={<ChevronDownIcon />}
          >
            Datenschutz
          </MenuButton>
          <MenuList>
            <MenuItem
              as={Link}
              href="/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stiftungspreis
            </MenuItem>
            <MenuItem
              as={Link}
              href="/datenschutz-gala"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stiftungsgala
            </MenuItem>
          </MenuList>
        </Menu>
        {session && (
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
                <MenuItem as={Link} href="/admin/anmeldungen">
                  Anmeldungen
                </MenuItem>
                <MenuDivider />

                <MenuItem onClick={() => signOut()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
