import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Button,
  HStack,
  StatHelpText,
  useDisclosure,
  useClipboard,
  Alert,
  AlertDescription,
  AlertIcon,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import BotschafterModal from "@/components/botschafter/botschafterStatusModal";
import BotschafterEditModal from "./botschafterEditModal";
import { useEffect } from "react";
import { Checker } from "@/lib/utils";
import { HiOutlinePencilSquare } from "react-icons/hi2";

function BotschafterDetail({ letter }) {
  const {
    isOpen: botschafterIsOpen,
    onOpen: botschafterOnOpen,
    onClose: botschafterOnClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, setValue, hasCopied } = useClipboard();

  useEffect(() => {
    setValue(letter.emailProjekt);
  }, []);
  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
          >
            Botschafter
          </Heading>
          <Tooltip label="Bearbeiten">
            <IconButton
              onClick={onOpen}
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              color="gray.600"
              icon={<HiOutlinePencilSquare size={20} />}
            />
          </Tooltip>
          <BotschafterEditModal
            onClose={onClose}
            isOpen={isOpen}
            letter={letter}
          />
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <HStack justify={"space-between"}>
            {letter.botschafter ? (
              <Link href={`/admin/botschafter/${letter.botschafter.id}`}>
                <Stat>
                  <StatLabel>Botschafter</StatLabel>
                  <StatNumber color={"gray.700"}>
                    {letter.botschafter.vorname} {letter.botschafter.name}
                  </StatNumber>
                  <StatHelpText color={"gray.700"}>
                    {`${letter.botschafter.plz} ${letter.botschafter.ort}, ${letter.botschafter.bundesland}`}
                  </StatHelpText>
                </Stat>
              </Link>
            ) : (
              <Alert status="warning" w={"60%"}>
                <AlertIcon />
                <AlertDescription>kein Botschafter verknüpft</AlertDescription>
              </Alert>
            )}
            <Button size={"sm"} variant={"outline"} onClick={botschafterOnOpen}>
              {letter.botschafter
                ? "Botschafter bearbeiten"
                : "Botschafter verknüpfen"}
            </Button>
            <BotschafterModal
              botschafterOnOpen={botschafterOnOpen}
              botschafterOnClose={botschafterOnClose}
              botschafterIsOpen={botschafterIsOpen}
              botschafter={letter.botschafter}
              letter={letter}
            />
          </HStack>
          <Stat>
            <StatLabel>Botschafter-Zuordnung bestätigt</StatLabel>
            <StatNumber>
              <Checker bool={letter.botschafterConfirm} />
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Vorfeld Botschafter Kontakt</StatLabel>
            <StatNumber>
              {letter.andereLizenzpartner || (
                <Alert status="info" fontSize={16} mt={3}>
                  <AlertIcon />
                  <AlertDescription>keine Angaben</AlertDescription>
                </Alert>
              )}
            </StatNumber>
          </Stat>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default BotschafterDetail;
