import prisma from "@/lib/prisma";
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
// import kampagneDetail from "@/components/kampagne/kampagneDetail";
import { dateFormatter } from "@/lib/utils";
import LetterTable from "@/components/letter/letterTable";
import EditKampagneModal from "@/components/kampagne/editKampagneModal";

function Kampagne({ kampagne }) {
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  function statusBadge(status) {
    return status ? "green" : "yellow";
  }

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"8xl"}>
      <HStack justify={"space-between"}>
        <VStack alignItems={"start"}>
          <Heading fontSize={"22"} color={"gray.300"} fontWeight={"500"}>
            Kampagne
          </Heading>
          <Heading fontSize={"24"}>{kampagne.name}</Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Erstellt: {dateFormatter(kampagne.createdAt)}
          </Text>
          <Tooltip label="Status" placement="top">
            <Badge
              variant="outline"
              colorScheme={statusBadge(kampagne.abgeschlossen)}
              fontSize={"md"}
            >
              {kampagne.abgeschlossen ? "Abgeschlossen" : "Offen"}
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
              <MenuItem onClick={editOnOpen}>Bearbeiten</MenuItem>
              <EditKampagneModal
                kampagne={kampagne}
                editIsOpen={editIsOpen}
                editOnClose={editOnClose}
              />
              <MenuItem>Löschen</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <Divider my={4} />
      <LetterTable letters={kampagne.letters} />
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const kampagne = await prisma.kampagne.findFirstOrThrow({
    where: {
      id: parseInt(id),
    },
    include: {
      letters: true,
    },
  });
  console.log("kampagne: ", kampagne);
  return { props: { kampagne } };
};

export default Kampagne;
