import prisma from "@/lib/prisma";
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
import LetterDetail from "@/components/letter/letterDetail";
import StatusModal from "@/components/letter/statusModal";
import { dateFormatter } from "@/lib/utils";
import Link from "next/link";

function Bewerbung({ letter }) {
  console.log("letter: ", letter);
  const {
    isOpen: statusIsOpen,
    onOpen: statusOnOpen,
    onClose: statusOnClose,
  } = useDisclosure();

  function statusBadge(status) {
    switch (status) {
      case "offen":
        return "yellow";
      case "angenommen":
        return "green";
      case "abgelehnt":
        return "red";
    }
  }

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <HStack justify={"space-between"}>
        <VStack alignItems={"start"}>
          <Heading fontSize={"22"} color={"gray.300"} fontWeight={"500"}>
            Bewerbung
          </Heading>
          <Heading fontSize={"24"}>{letter.organisationProjekt}</Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Eingang: {dateFormatter(letter.createdAt)}
          </Text>
          <Link
            href={
              letter.kampagne
                ? "/admin/kampagne/" + letter.kampagne?.id
                : "/admin/kampagne"
            }
          >
            <Text fontSize={"sm"} color={"gray.400"} mr={3}>
              Kampagne:{" "}
              {letter.kampagne
                ? letter.kampagne.name
                : "keine Kampagne zugeordnet"}
            </Text>
          </Link>
          <Tooltip label="Status" placement="top">
            <Badge
              variant="outline"
              colorScheme={statusBadge(letter.status)}
              fontSize={"md"}
              _hover={{ cursor: "pointer" }}
              onClick={statusOnOpen}
            >
              {letter.status}
            </Badge>
          </Tooltip>
          <StatusModal
            statusOnOpen={statusOnOpen}
            statusOnClose={statusOnClose}
            statusIsOpen={statusIsOpen}
            letter={letter}
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
      <LetterDetail letter={letter} />
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.params;
  const letter = await prisma.letter.findFirstOrThrow({
    where: {
      id: parseInt(id),
    },
    include: {
      botschafter: true,
      kampagne: true,
    },
  });
  return { props: { letter } };
};

export default Bewerbung;
