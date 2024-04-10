import {
  Card,
  CardBody,
  CardHeader,
  Stack,
  Box,
  Heading,
  StackDivider,
  Text,
  HStack,
  Select,
  Icon,
  Tooltip,
  Button,
  IconButton,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  HiGift,
  HiUser,
  HiBanknotes,
  HiPaperClip,
  HiCamera,
  HiCheck,
  HiXMark,
  HiShieldCheck,
  HiOutlineDocumentCheck,
} from "react-icons/hi2";
import { dateFormatter } from "@/lib/utils";
import { useState } from "react";
import { exportToExcel } from "react-json-to-excel";

function KampagnenTermine({ kampagne, abgelehntAnzeigen }) {
  const [sortValue, setSortValue] = useState("terminUebergabe");
  const [ausblenden, setAusblenden] = useState(false);
  const [abgelaufen, setAbgelaufen] = useState(false);

  function handleExport() {
    const result = kampagne.letters
      .filter((letter) =>
        abgelehntAnzeigen
          ? true
          : ["1111", "5000", "ausland1111", "ausland5000"].includes(
              letter.status
            )
      )
      .map((l) => ({
        ...l,
        botschafterName: `${l.botschafter?.vorname} ${l.botschafter?.name}`,
        botschafterTyp: `${l.botschafter?.typ}`,
        botschafterFirma: `${l.botschafter?.firma}`,
      }))
      .sort((a, b) => a[sortValue] - b[sortValue])
      .filter((l) => (ausblenden ? l.terminUebergabe : true))
      .filter((l) => (abgelaufen ? l.terminUebergabe > Date.now() : true));
    const date = new Date().toLocaleDateString("de-DE").replace(/\./g, "-");
    exportToExcel(result, "termin_export_" + date);
  }

  return (
    <Card>
      <CardHeader>
        <HStack justifyContent={"space-between"}>
          <Heading size="md">
            Termin Übersicht{" "}
            <Text as={"span"}>
              (
              {
                kampagne.letters
                  .filter((letter) =>
                    abgelehntAnzeigen
                      ? true
                      : ["1111", "5000", "ausland1111", "ausland5000"].includes(
                          letter.status
                        )
                  )
                  .filter((l) => (ausblenden ? l.terminUebergabe : true))
                  .filter((l) =>
                    abgelaufen ? l.terminUebergabe > Date.now() : true
                  ).length
              }
              )
            </Text>
          </Heading>
          <Button
            ml={"auto"}
            mr={4}
            colorScheme="teal"
            variant={!ausblenden ? "outline" : "solid"}
            onClick={() => setAusblenden(!ausblenden)}
          >
            leere ausblenden
          </Button>
          <Button
            mr={4}
            colorScheme="teal"
            variant={!abgelaufen ? "outline" : "solid"}
            onClick={() => setAbgelaufen(!abgelaufen)}
          >
            abgelaufen ausblenden
          </Button>
          <Select
            w={"250px"}
            onChange={(e) => {
              setSortValue(e.target.value);
            }}
            value={sortValue}
          >
            <option value="terminUebergabe">Übergabe</option>
            <option value="terminGeld">Geld</option>
          </Select>
          <Tooltip label="Bewerbungen exportieren">
            <IconButton
              onClick={handleExport}
              icon={<HiPaperClip />}
              variant={"outline"}
            />
          </Tooltip>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {kampagne.letters.length > 0 &&
            kampagne.letters
              .filter((letter) =>
                abgelehntAnzeigen
                  ? true
                  : ["1111", "5000", "ausland1111", "ausland5000"].includes(
                      letter.status
                    )
              )
              .sort((a, b) => a[sortValue] - b[sortValue])
              .filter((l) => (ausblenden ? l.terminUebergabe : true))
              .filter((l) =>
                abgelaufen ? l.terminUebergabe > Date.now() : true
              )
              .map((letter) => {
                return (
                  <Box key={letter.id}>
                    <Link
                      href={`/admin/bewerbung/${letter.id}`}
                      target="_black"
                      rel="noopener noreferrer"
                    >
                      <Heading size="sm" display={"flex"} gap={2}>
                        <Text color={"gray.400"}>{letter.id} </Text>
                        <Text>{letter.nameProjekt}</Text>
                      </Heading>
                    </Link>
                    <Text color={"gray.400"}>
                      {letter.organisationProjekt}{" "}
                    </Text>
                    <HStack mt={2} gap={6}>
                      <Tooltip label={"Übergabe"}>
                        <Text color={"gray.400"}>
                          <Icon as={HiGift} mr={2} />
                          {dateFormatter(letter.terminUebergabe, false)}
                        </Text>
                      </Tooltip>
                      <Tooltip label={"Geld"}>
                        <Text color={"gray.400"}>
                          <Icon as={HiBanknotes} mr={2} />
                          {dateFormatter(letter.terminGeld, false)}
                        </Text>
                      </Tooltip>
                      <Tooltip label={"Botschafter"}>
                        <Link
                          href={`/admin/botschafter/${letter.botschafter?.id}`}
                        >
                          <Text color={"gray.400"}>
                            <Icon as={HiUser} mr={2} />
                            {letter.botschafter?.vorname}{" "}
                            {letter.botschafter?.name}
                          </Text>
                        </Link>
                      </Tooltip>
                      <Tooltip label={"Presse Foto"}>
                        <Text color={"gray.400"}>
                          <Icon as={HiCamera} mr={2} />
                          {letter.presseFoto ? (
                            <Icon as={HiCheck} color={"green.500"} />
                          ) : (
                            <Icon as={HiXMark} color={"red.500"} />
                          )}
                        </Text>
                      </Tooltip>
                      <Tooltip label={"Presse Einverständnis"}>
                        <Text color={"gray.400"}>
                          <Icon as={HiShieldCheck} mr={2} />
                          {letter.presseEV ? (
                            <Icon as={HiCheck} color={"green.500"} />
                          ) : (
                            <Icon as={HiXMark} color={"red.500"} />
                          )}
                        </Text>
                      </Tooltip>
                      <Tooltip label={"ZWB1111"}>
                        <Text color={"gray.400"}>
                          <Icon as={HiOutlineDocumentCheck} mr={2} />
                          {dateFormatter(letter.zwb1000, false)}
                        </Text>
                      </Tooltip>
                    </HStack>
                  </Box>
                );
              })}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default KampagnenTermine;
