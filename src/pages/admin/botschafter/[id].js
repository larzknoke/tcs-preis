import { useRouter } from "next/router";
import { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import BotschafterDetail from "@/components/botschafter/botschafterDetail";
import { dateFormatter } from "@/lib/utils";
import BotschafterDeleteModal from "@/components/botschafter/botschafterDeleteModal";
import FormBotschafterModal from "@/components/botschafter/formBotschafterModal";

function Botschafter({ botschafter }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  async function onSubmitDelete(id) {
    setLoading(true);
    const res = await fetch("/api/botschafter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        botschafterId: id,
      }),
    });
    if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    } else {
      toast({
        title: `Botschafter gelöscht`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onCloseDelete();
      setLoading(false);
      router.push("/admin/botschafter");
    }
  }

  return (
    <Container display={"flex"} flexDirection={"column"} maxWidth={"6xl"}>
      <HStack justify={"space-between"}>
        <VStack alignItems={"start"}>
          <Heading fontSize={"22"} color={"gray.300"} fontWeight={"500"}>
            Botschafter
          </Heading>
          <Heading fontSize={"24"}>
            {botschafter.vorname} {botschafter.name}
            <Badge variant="outline" colorScheme="green" ml={4}>
              {botschafter.typ}
            </Badge>
          </Heading>
        </VStack>
        <HStack>
          <Text fontSize={"sm"} color={"gray.400"} mr={3}>
            Erstellt: {dateFormatter(botschafter.createdAt)}
          </Text>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HiOutlineCog6Tooth />}
              variant="ghost"
              size={"lg"}
            />
            <MenuList>
              <MenuItem onClick={() => onOpenEdit()}>Bearbeiten</MenuItem>
              <MenuItem onClick={() => onOpenDelete()}>Löschen</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
      <Divider my={4} />
      <BotschafterDetail botschafter={botschafter} />
      <BotschafterDeleteModal
        botschafter={botschafter}
        onOpen={onOpenDelete}
        onClose={onCloseDelete}
        isOpen={isOpenDelete}
        onSubmitDelete={onSubmitDelete}
        loading={loading}
      />
      <FormBotschafterModal
        onOpen={onOpenEdit}
        onClose={onCloseEdit}
        isOpen={isOpenEdit}
        isNew={false}
        botschafter={botschafter}
      />
    </Container>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const botschafter = await prisma.botschafter.findFirstOrThrow({
      where: {
        id: parseInt(id),
      },
      include: {
        letters: {
          where: {
            verified: true,
          },
          orderBy: {
            botschafterConfirm: "asc",
          },
        },
        botcontacts: true,
      },
    });
    return { props: { botschafter } };
  } catch (error) {
    console.log("error", error);
    return {
      notFound: true,
    };
  }
};

export default Botschafter;
