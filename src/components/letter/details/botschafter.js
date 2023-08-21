import {
  SimpleGrid,
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
  Alert,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import BotschafterModal from "@/components/botschafter/botschafterStatusModal";
import { HiOutlineClipboard, HiCheck, HiOutlinePlus } from "react-icons/hi2";
import { useEffect } from "react";

function BotschafterDetail({ letter }) {
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
          Botschafter
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
