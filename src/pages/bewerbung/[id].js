import { useRouter } from "next/router";
import {
  Container,
  Divider,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import {
  HiBars3,
  HiEllipsisVertical,
  HiOutlineCog8Tooth,
  HiMiniBars3,
  HiMiniCog8Tooth,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import LetterDetail from "@/components/letterDetail";

function Bewerbung() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <HStack justify={"space-between"}>
        <Heading size={"md"}>Ev.-luth. Kindertagesstätte 'Arche Noah'</Heading>
        <HStack>
          <Tooltip label="Status" placement="top">
            <Badge variant="outline" colorScheme="yellow" fontSize={"md"}>
              Offen
            </Badge>
          </Tooltip>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HiOutlineCog6Tooth />}
              variant="ghost"
              size={"lg"}
            />
            <MenuList>
              <MenuItem>Bearbeiten</MenuItem>
              <MenuItem>Löschen</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <Divider my={4} />
      <LetterDetail />
    </Container>
  );
}

export default Bewerbung;
