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
  useDisclosure,
  HStack,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { currencyFormatter } from "@/lib/utils";
import FinanzEditModal from "./finanzEditModal";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import BankEditModal from "./bankEditModal";

function FinanzierungDetail({ letter }) {
  const {
    isOpen: finanzIsOpen,
    onOpen: finanzOnOpen,
    onClose: finanzOnClose,
  } = useDisclosure();
  const {
    isOpen: bankIsOpen,
    onOpen: bankOnOpen,
    onClose: bankOnClose,
  } = useDisclosure();
  return (
    <SimpleGrid
      spacing={6}
      columns={{ sm: 1, md: 2 }}
      // minChildWidth={"500px"}
      //   templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      <Card>
        <CardHeader>
          <HStack justifyContent={"space-between"}>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Finanzierung
            </Heading>
            <Tooltip label="Bearbeiten">
              <IconButton
                onClick={finanzOnOpen}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                color="gray.600"
                icon={<HiOutlinePencilSquare size={20} />}
              />
            </Tooltip>
            <FinanzEditModal
              onClose={finanzOnClose}
              isOpen={finanzIsOpen}
              letter={letter}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Eigenmittel</StatLabel>
              <StatNumber>{currencyFormatter(letter.eigenmittel)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Öffentliche Zuwendungen (z.B. Landes- oder Bundesmittel)
              </StatLabel>
              <StatNumber>
                {currencyFormatter(letter.oeffentlicheZuwendungen)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Private Spenden (z.B. Privatpersonen, Unternehmen)
              </StatLabel>
              <StatNumber>
                {currencyFormatter(letter.privateSpenden)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>
                Bisherige Förderung Ihres Vereins/Organisation durch die TC
                Stiftung
              </StatLabel>
              <StatNumber>{letter.bisherigeFoerderung}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <HStack justifyContent={"space-between"}>
            <Heading
              size="sm"
              color="gray.500"
              fontWeight={"600"}
              textTransform={"uppercase"}
            >
              Bank
            </Heading>
            <Tooltip label="Bearbeiten">
              <IconButton
                onClick={bankOnOpen}
                variant="ghost"
                colorScheme="gray"
                aria-label="See menu"
                color="gray.600"
                icon={<HiOutlinePencilSquare size={20} />}
              />
            </Tooltip>
            <BankEditModal
              onClose={bankOnClose}
              isOpen={bankIsOpen}
              letter={letter}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>IBAN</StatLabel>
              <StatNumber>{letter.ibanProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Konto Name</StatLabel>
              <StatNumber>{letter.kontoNameProjekt}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bank</StatLabel>
              <StatNumber>{letter.bankNameProjekt}</StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
}

export default FinanzierungDetail;
