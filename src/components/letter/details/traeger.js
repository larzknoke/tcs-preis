import {
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  IconButton,
  HStack,
  Tooltip,
  useDisclosure,
  GridItem,
} from "@chakra-ui/react";
import { Checker } from "@/lib/utils";
import BotschafterDetail from "./botschafter";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import TraegerEditModal from "./traegerEditModal";
import BotContactTable from "@/components/botschafter/botContactTable";
import LetterContactTable from "../letterContactTable";

function TraegerDetail({ letter }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
              Träger
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
            <TraegerEditModal
              onClose={onClose}
              isOpen={isOpen}
              letter={letter}
            />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Stat>
              <StatLabel>Name</StatLabel>
              <StatNumber>{letter.nameTraeger} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Bundesland</StatLabel>
              <StatNumber>{letter.bundeslandTraeger} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Name Vorstand/Geschäftsführer</StatLabel>
              <StatNumber>{letter.vorstandTraeger} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Straße</StatLabel>
              <StatNumber>{letter.strasseTraeger} </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Adresse</StatLabel>
              <StatNumber>
                {letter.plzTraeger} {letter.ortTraeger}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Als gemeinnützig anerkannt</StatLabel>
              <StatNumber>
                <Checker bool={letter.vereinTraeger} />
              </StatNumber>
            </Stat>
          </Stack>
        </CardBody>
      </Card>
      <BotschafterDetail letter={letter} />
      <GridItem colSpan={2}>
        <BotContactTable botschafter={letter.botschafter} />
      </GridItem>
      <GridItem colSpan={2}>
        <LetterContactTable letter={letter} />
      </GridItem>
    </SimpleGrid>
  );
}

export default TraegerDetail;
