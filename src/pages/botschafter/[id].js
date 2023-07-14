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
  useDisclosure,
  Text,
  VStack,
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
import BotschafterDetail from "@/components/botschafterDetail";

function Botschafter() {
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
            Botschafter
          </Heading>
          <Heading fontSize={"24"}>Yvonne Bauer</Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Erstellt: 14.07.2023 | 15.23 Uhr
          </Text>
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
      <BotschafterDetail />
    </Container>
  );
}

export default Botschafter;
