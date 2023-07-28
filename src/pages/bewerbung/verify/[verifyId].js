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

function VerifyLetter({ letter }) {
  console.log("letter: ", letter);

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
          <Text>{letter.verified ? "Bestätigt" : "nicht Bestätigt"} </Text>
        </HStack>
      </HStack>
      <Divider my={4} />
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  console.log("ctx: ", ctx);
  const { verifyId } = ctx.params;
  const letter = await prisma.letter.update({
    where: {
      verifyId: verifyId,
    },
    data: {
      verified: true,
    },
  });
  return { props: { letter } };
};

export default VerifyLetter;
