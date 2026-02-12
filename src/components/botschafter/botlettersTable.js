import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Button,
  Text,
  Stack,
  StackDivider,
  Icon,
  Tooltip,
  HStack,
  GridItem,
  Alert,
  AlertIcon,
  AlertDescription,
  VStack,
  Select,
} from "@chakra-ui/react";
import {
  HiOutlineCheckCircle,
  HiOutlineDocumentText,
  HiXMark,
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiDevicePhoneMobile,
  HiOutlineGlobeAlt,
  HiOutlineHashtag,
  HiOutlineTag,
  HiOutlineUserCircle,
  HiCalendarDays,
  HiMiniUserCircle,
} from "react-icons/hi2";
import Link from "next/link";
import { Capatilizer, dateFormatter } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

function BotlettersTable({ botschafter }) {
  const letters = botschafter?.letters || [];
  const [selectedKampagneId, setSelectedKampagneId] = useState(null);
  const [sonderpreisTyp, setSonderpreisTyp] = useState("Alle");

  const kampagnen = useMemo(() => {
    const unique = new Map();
    letters.forEach((l) => {
      if (l.kampagne?.id) {
        unique.set(l.kampagne.id, {
          id: l.kampagne.id,
          name: l.kampagne.name || `Kampagne ${l.kampagne.id}`,
          createdAt: new Date(l.kampagne.createdAt),
        });
      }
    });

    return Array.from(unique.values()).sort(
      (a, b) => b.createdAt - a.createdAt,
    );
  }, [letters]);

  useEffect(() => {
    if (kampagnen.length > 0 && selectedKampagneId === null) {
      setSelectedKampagneId(kampagnen[0].id);
    }
  }, [kampagnen, selectedKampagneId]);

  const filteredLetters = useMemo(() => {
    let filtered = letters;

    if (selectedKampagneId) {
      filtered = filtered.filter((l) => l.kampagneId === selectedKampagneId);
    }

    if (sonderpreisTyp === "Sonderpreis") {
      filtered = filtered.filter((l) => l.sonderpreis === true);
    } else if (sonderpreisTyp === "Stiftungspreis") {
      filtered = filtered.filter((l) => l.sonderpreis === false);
    }

    return filtered;
  }, [letters, selectedKampagneId, sonderpreisTyp]);

  return (
    <Card>
      <CardHeader>
        <HStack justify="space-between" flexWrap="nowrap" gap={3}>
          <Heading
            size="sm"
            color="gray.500"
            fontWeight={"600"}
            textTransform={"uppercase"}
            whiteSpace={"nowrap"}
          >
            Verknüpfte Projekte
          </Heading>
          <HStack gap={3} flexWrap="wrap" justify="flex-end" w="100%">
            <Select
              placeholder="Alle Kampagnen"
              value={selectedKampagneId}
              onChange={(e) => setSelectedKampagneId(Number(e.target.value))}
              maxW="330px"
            >
              {kampagnen.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name}
                </option>
              ))}
            </Select>
            <Select
              value={sonderpreisTyp}
              onChange={(e) => setSonderpreisTyp(e.target.value)}
              maxW="200px"
            >
              <option value="Alle">Alle Preise</option>
              <option value="Sonderpreis">Sonderpreis</option>
              <option value="Stiftungspreis">Stiftungspreis</option>
            </Select>
          </HStack>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {filteredLetters.length > 0 ? (
            filteredLetters.map((letter) => {
              return (
                <HStack justify={"space-between"} key={letter.id}>
                  <VStack alignItems={"self-start"} w={"100%"}>
                    <Link
                      target="_black"
                      rel="noopener noreferrer"
                      href={`/admin/bewerbung/${letter.id}`}
                      color={"gray.500"}
                    >
                      <Text as={"b"} fontSize={"lg"}>
                        {letter.organisationProjekt} | {letter.nameProjekt}
                      </Text>
                    </Link>
                    <HStack gap={6} w={"100%"}>
                      <HStack color={"gray.500"} gap={1}>
                        <Icon as={HiOutlineHashtag} />
                        <Text as={"b"} minW={"20px"}>
                          {letter.id}
                        </Text>
                      </HStack>
                      <HStack color={"gray.500"} gap={1}>
                        <Icon as={HiOutlineTag} />
                        <Text as={"b"}>{Capatilizer(letter.status)}</Text>
                      </HStack>
                      <Tooltip label={"Termin Übergabe"}>
                        <HStack color={"gray.500"} gap={1}>
                          <Icon as={HiCalendarDays} />
                          <Text as={"b"}>
                            {letter.terminUebergabe
                              ? dateFormatter(letter.terminUebergabe, false)
                              : "-"}
                          </Text>
                        </HStack>
                      </Tooltip>
                      <HStack>
                        {letter.botschafterConfirm ? (
                          <Tooltip label={"Botschafter bestätigt"}>
                            <div>
                              <Icon
                                fontSize={"xl"}
                                as={HiOutlineCheckCircle}
                                color={"green.500"}
                              />
                            </div>
                          </Tooltip>
                        ) : (
                          <Tooltip label={"Botschafter nicht bestätigt"}>
                            <div>
                              <Icon
                                fontSize={"lg"}
                                as={HiXMark}
                                color={"red.500"}
                              />
                            </div>
                          </Tooltip>
                        )}
                      </HStack>
                    </HStack>

                    <VStack alignItems={"start"} w={"100%"} gap={1}>
                      <Text as={"b"} color={"gray.500"}>
                        Kontakt:
                      </Text>
                      <HStack color={"gray.400"} gap={1}>
                        <Icon as={HiOutlineMapPin} />
                        <Text>
                          {`${letter.plzTraeger} ${letter.ortTraeger}, ${letter.bundeslandTraeger}`}
                        </Text>
                      </HStack>
                      <HStack
                        as={"span"}
                        color={"gray.400"}
                        gap={5}
                        alignItems={"start"}
                        minW={"50%"}
                      >
                        <HStack>
                          <Icon as={HiOutlineEnvelope} />
                          <Text>{letter.emailProjekt || "-"}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlinePhone} />
                          <Text>{letter.telefonnummerProjekt || "-"}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiDevicePhoneMobile} />
                          <Text>{letter.mobilProjekt || "-"}</Text>
                        </HStack>
                        <HStack>
                          <Icon as={HiOutlineGlobeAlt} />
                          <Text>{letter.wwwProjekt || "-"}</Text>
                        </HStack>
                      </HStack>
                      <VStack alignItems={"start"} gap={1} mt={2}>
                        {letter && letter.lettercontacts.length > 0 && (
                          <Text as={"b"} color={"gray.500"}>
                            weiterer Botschafter-Kontakt:
                          </Text>
                        )}
                        {letter &&
                          letter.lettercontacts.length > 0 &&
                          letter.lettercontacts.map((contact) => {
                            return (
                              <HStack
                                alignItems={"start"}
                                gap={4}
                                color={"gray.400"}
                              >
                                <Text color={"gray.500"}>{contact.name}</Text>
                                <HStack>
                                  <Icon as={HiOutlineUserCircle} />
                                  <Text>{contact.funktion || "-"}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={HiOutlineEnvelope} />
                                  <Text>{contact.email || "-"}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={HiOutlinePhone} />
                                  <Text>{contact.telefon || "-"}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={HiDevicePhoneMobile} />
                                  <Text>{contact.mobil || "-"}</Text>
                                </HStack>
                              </HStack>
                            );
                          })}
                      </VStack>
                      <HStack color={"gray.400"} gap={1}>
                        <Text as={"b"} color={"gray.500"}>
                          Kampagne:{" "}
                        </Text>
                        <Text>{letter.kampagne.name || "-"}</Text>
                      </HStack>
                      <HStack color={"gray.400"} gap={1}>
                        <Text as={"b"} color={"gray.500"}>
                          Sonderpreis:{" "}
                        </Text>
                        <Text>{letter.sonderpreis ? "Ja" : "Nein"}</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </HStack>
              );
            })
          ) : (
            <Alert status="warning">
              <AlertIcon />
              <AlertDescription>
                Keine verknüpften Projekte vorhanden
              </AlertDescription>
            </Alert>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default BotlettersTable;
