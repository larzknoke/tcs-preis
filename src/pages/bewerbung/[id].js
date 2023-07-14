import { useRouter } from "next/router";
import {
  VStack,
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
  useDisclosure,
  Text,
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
import StatusModal from "@/components/statusModal";

function Bewerbung() {
  const router = useRouter();
  const { id } = router.query;
  const {
    isOpen: statusIsOpen,
    onOpen: statusOnOpen,
    onClose: statusOnClose,
  } = useDisclosure();

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <HStack justify={"space-between"}>
        <VStack alignItems={"start"}>
          <Heading fontSize={"22"} color={"gray.300"} fontWeight={"500"}>
            Bewerbung
          </Heading>
          <Heading fontSize={"24"}>
            Ev.-luth. Kindertagesstätte 'Arche Noah'
          </Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Eingang: 14.07.2023 | 15.23 Uhr
          </Text>
          <Tooltip label="Status" placement="top">
            <Badge
              variant="outline"
              colorScheme="yellow"
              fontSize={"md"}
              _hover={{ cursor: "pointer" }}
              onClick={statusOnOpen}
            >
              Offen
            </Badge>
          </Tooltip>
          <StatusModal
            statusOnOpen={statusOnOpen}
            statusOnClose={statusOnClose}
            statusIsOpen={statusIsOpen}
          />
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
