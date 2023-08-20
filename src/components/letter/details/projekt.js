import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
  Tooltip,
  IconButton,
  useClipboard,
} from "@chakra-ui/react";
import Link from "next/link";
import BotschafterModal from "@/components/botschafter/botschafterStatusModal";
import { HiOutlineClipboard, HiCheck, HiOutlinePlus } from "react-icons/hi2";
import { useEffect } from "react";

function ProjektDetail({ letter }) {
  const {
    isOpen: botschafterIsOpen,
    onOpen: botschafterOnOpen,
    onClose: botschafterOnClose,
  } = useDisclosure();
  const { onCopy, setValue, hasCopied } = useClipboard();

  useEffect(() => {
    setValue(letter.emailProjekt);
  }, []);
  return (
    <Card>
      <CardHeader>
        <Heading
          size="sm"
          color="gray.500"
          fontWeight={"600"}
          textTransform={"uppercase"}
        >
          Projekt
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <HStack justify={"space-between"}>
            {letter.botschafter ? (
              <Link href={`/admin/botschafter/${letter.botschafter.id}`}>
                <Stat>
                  <StatLabel>Botschafter</StatLabel>
                  <StatNumber color={"gray.700"}>
                    {letter.botschafter.name}
                  </StatNumber>
                  <StatHelpText color={"gray.700"}>
                    {`${letter.botschafter.plz} ${letter.botschafter.ort}, ${letter.botschafter.bundesland}`}
                  </StatHelpText>
                </Stat>
              </Link>
            ) : (
              <Alert status="warning" w={"60%"}>
                {" "}
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
            <StatLabel>Name der Organisation/Einrichtung</StatLabel>
            <StatNumber>{letter.organisationProjekt} </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Ansprechpartner</StatLabel>
            <StatNumber>{letter.ansprechpartnerProjekt}</StatNumber>
          </Stat>
          <HStack justify={"space-between"}>
            <Stat>
              <StatLabel>Email</StatLabel>
              <StatNumber>{letter.emailProjekt}</StatNumber>
            </Stat>
            <Tooltip label="In Zwischenablage kopieren" placement={"top"}>
              <IconButton
                size={"sm"}
                onClick={onCopy}
                icon={hasCopied ? <HiCheck /> : <HiOutlineClipboard />}
                variant={"outline"}
                colorScheme={hasCopied ? "green" : "gray"}
              />
            </Tooltip>
          </HStack>
          <Stat>
            <StatLabel>Telefon</StatLabel>
            <StatNumber>{letter.telefonnummerProjekt}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Mobil</StatLabel>
            <StatNumber>{letter.mobilProjekt}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>IBAN</StatLabel>
            <StatNumber>{letter.ibanProjekt}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Konto Name</StatLabel>
            <StatNumber>{letter.kontoNameProjekt}</StatNumber>
          </Stat>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button size={"sm"}>weitere Details</Button>
      </CardFooter>
    </Card>
  );
}

export default ProjektDetail;
