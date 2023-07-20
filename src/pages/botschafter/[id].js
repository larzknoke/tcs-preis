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
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import StatusModal from "@/components/letter/statusModal";
import BotschafterDetail from "@/components/botschafter/botschafterDetail";
import { dateFormatter } from "@/lib/utils";

function Botschafter({ botschafter }) {
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
          <Heading fontSize={"24"}>{botschafter.name}</Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Erstellt: {dateFormatter(botschafter.createdAt)}
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

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const botschafter = await prisma.botschafter.findFirstOrThrow({
    where: {
      id: parseInt(id),
    },
  });
  return { props: { botschafter } };
};

export default Botschafter;
