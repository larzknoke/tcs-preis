import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  TableContainer,
  Td,
  Th,
  Tr,
  TableCaption,
  Tooltip,
  IconButton,
  Icon,
  chakra,
  HStack,
  Heading,
  Card,
  CardBody,
  Flex,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  ButtonGroup,
  Stack,
  Input,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiOutlineCheck,
  HiOutlineNoSymbol,
  HiOutlineQuestionMarkCircle,
  HiMiniLanguage,
  HiMiniStar,
  HiLink,
  HiOutlineBanknotes,
  HiCalendarDays,
  HiOutlineTrash,
} from "react-icons/hi2";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

import DebouncedInput from "@/lib/debouncedInput";
import fuzzyFilter from "@/lib/fuzzyFilter";

import { Capatilizer } from "@/lib/utils";

function LetterTable({ letters }) {
  const router = useRouter();
  const [sorting, setSorting] = useState([{ id: "id", desc: false }]);
  const [globalFilter, setGlobalFilter] = useState("");

  const { onOpen, onClose, isOpen } = useDisclosure();

  const columnHelper = createColumnHelper();

  function checkHasEmpty(list) {
    if (list.includes(null) || list.includes("") || list.includes(undefined)) {
      return true;
    } else {
      return false;
    }
  }

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      meta: {
        isNumeric: true,
      },
      cell: ({ row }) => (
        <HStack>
          <Tooltip label="Bewerbung einsehen" placement="top">
            <IconButton
              as={Link}
              variant={"ghost"}
              aria-label="Bewerbung zeigen"
              icon={<HiOutlineFolderOpen />}
              href={`/admin/bewerbung/${row.original?.id}`}
            />
          </Tooltip>
          <Text>{row.original?.id}</Text>
        </HStack>
      ),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Popover trigger="hover" placement="left-start">
          <PopoverTrigger>
            <span>
              {info.getValue() == "offen" && (
                <Icon as={HiOutlineQuestionMarkCircle} color={"yellow.500"} />
              )}
              {info.getValue() == "abgelehnt" && (
                <Icon as={HiOutlineNoSymbol} color={"red.500"} />
              )}
              {info.getValue() == "1000" && (
                <Icon as={HiOutlineCheck} color={"green.700"} />
              )}
              {info.getValue() == "5000" && (
                <Flex>
                  <Icon as={HiOutlineCheck} color={"green.700"} />
                  <Icon as={HiMiniStar} color={"yellow.400"} />
                </Flex>
              )}
              {info.getValue() == "ausland" && (
                <Icon as={HiMiniLanguage} color={"blue.400"} />
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent width={"auto"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Text as={"b"}>
                Aktueller Status: {Capatilizer(info.getValue())}
              </Text>
            </PopoverHeader>
            <PopoverBody>
              <Text mb={2}>Status ändern:</Text>
              <ButtonGroup size="sm">
                <Button colorScheme="blue">Ausland</Button>
                <Button colorScheme="red">Abgelehnt</Button>
                <Button colorScheme="yellow">Offen</Button>
                <Button colorScheme="green">1000,-</Button>
                <Button colorScheme="green" bg={"green.600"}>
                  5000,-
                </Button>
              </ButtonGroup>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ),
    }),
    columnHelper.accessor("bundeslandTraeger", {
      header: "Bundesland",
    }),
    columnHelper.accessor("botschafter", {
      cell: ({ row, info }) => {
        return !row.original.botschafter?.id ? (
          <Tooltip label={"kein Botschafter verknüpft"} placement="top">
            <IconButton
              onClick={() => router.push("/admin/bewerbung/" + row.original.id)}
              icon={<HiOutlineQuestionMarkCircle />}
              color={"yellow.500"}
              variant={"ghost"}
            />
          </Tooltip>
        ) : (
          <Popover trigger="hover">
            <PopoverTrigger>
              <Button
                variant={"link"}
                color="gray.600"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    "/admin/botschafter/" + row.original.botschafter?.id
                  );
                }}
              >
                {row.original.botschafter?.name}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Kontaktdaten</PopoverHeader>
              <PopoverBody>
                <Flex direction={"column"} gap={4}>
                  <div>
                    <Text as={"b"}>Bundesland:</Text> <br />
                    <Text>{row.original.botschafter?.bundesland || "-"}</Text>
                  </div>
                  <div>
                    <Text as={"b"}>Kontakt:</Text> <br />
                    <Text>{row.original.botschafter.strasse || "-"}</Text>
                    <Text>
                      {row.original.botschafter.plz || "-"}{" "}
                      {row.original.botschafter.ort || "-"}
                    </Text>
                  </div>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Botschafter",
    }),
    columnHelper.accessor("nameTraeger", {
      cell: ({ row, info }) => {
        return (
          <Text>
            <chakra.span>{row.original.nameTraeger}</chakra.span>{" "}
            {row.original.wwwProjekt && (
              <Tooltip label={row.original.wwwProjekt}>
                <IconButton icon={<HiLink />} variant={"ghost"} />
              </Tooltip>
            )}
          </Text>
        );
      },
      header: "Träger",
    }),
    columnHelper.accessor("vorstandTraeger", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover">
            <PopoverTrigger>
              <Text
                color={
                  checkHasEmpty([
                    row.original.strasseTraeger,
                    row.original.plzTraeger,
                    row.original.ortTraeger,
                    row.original.ansprechpartnerProjekt,
                    row.original.telefonnummerProjekt,
                    row.original.mobilProjekt,
                    row.original.emailProjekt,
                  ])
                    ? "red.400"
                    : ""
                }
              >
                {row.original.vorstandTraeger}
              </Text>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Kontaktdaten</PopoverHeader>
              <PopoverBody>
                <Flex direction={"column"} gap={4}>
                  <div>
                    <Text as={"b"}>Träger:</Text> <br />
                    <Text>{row.original.strasseTraeger}</Text>
                    <Text>
                      {row.original.plzTraeger} {row.original.ortTraeger}{" "}
                    </Text>
                  </div>
                  <div>
                    <Text as={"b"}>Projekt:</Text> <br />
                    <Text>
                      AP: {row.original.ansprechpartnerProjekt || "-"}
                    </Text>
                    <Text>
                      Tel.: {row.original.telefonnummerProjekt || "-"}
                    </Text>
                    <Text>Mobil: {row.original.mobilProjekt || "-"}</Text>
                    <Text>Email: {row.original.emailProjekt || "-"}</Text>
                  </div>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Kontakt",
    }),
    columnHelper.accessor("organisationProjekt", {
      header: "Projekt Organisation",
    }),
    columnHelper.accessor("nameProjekt", {
      header: "Projekt Name",
    }),
    columnHelper.accessor("checkFreistellung", {
      header: "Freistellungb. Check",
      cell: ({ row }) => {
        return (
          <Popover trigger="hover">
            <PopoverTrigger>
              {row.original.checkFreistellung ? (
                <IconButton
                  variant={"ghost"}
                  icon={<HiOutlineCheck />}
                  color={"green.900"}
                />
              ) : (
                <IconButton
                  variant={"ghost"}
                  icon={<HiOutlineNoSymbol />}
                  color={"red.500"}
                />
              )}
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Freistellungsbescheid bestätigen?</PopoverHeader>
              <PopoverBody>
                <ButtonGroup size="sm">
                  <Button colorScheme="red">Abbrechen</Button>
                  <Button colorScheme="green">Bestätigen</Button>
                </ButtonGroup>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
    }),
    columnHelper.accessor("kontoNameProjekt", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover">
            <PopoverTrigger>
              <IconButton
                color={
                  checkHasEmpty([
                    row.original.kontoNameProjekt,
                    row.original.ibanProjekt,
                    row.original.bankNameProjekt,
                  ])
                    ? "red.400"
                    : ""
                }
                icon={<HiOutlineBanknotes />}
                variant={"ghost"}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Bankdaten</PopoverHeader>
              <PopoverBody>
                <Flex direction={"column"} gap={4}>
                  <div>
                    <Text>
                      <chakra.span fontWeight={600}>Name: </chakra.span>
                      {row.original.kontoNameProjekt}
                    </Text>
                    <Text>
                      <chakra.span fontWeight={600}>IBAN:</chakra.span>{" "}
                      {row.original.ibanProjekt}
                    </Text>
                    <Text>
                      <chakra.span fontWeight={600}>Bank:</chakra.span>{" "}
                      {row.original.bankNameProjekt}
                    </Text>
                  </div>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Bank",
    }),
    columnHelper.accessor("terminGeld", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover" onClose={onClose}>
            <PopoverTrigger>
              <HStack>
                <Text>16.08.2023</Text>
                <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Datum auswählen</PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Input placeholder="Datum..." />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button isDisabled colorScheme="green">
                      Speichern
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Termin Überweisung",
    }),
    columnHelper.accessor("terminUebergabe", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover" onClose={onClose}>
            <PopoverTrigger>
              <HStack>
                <Text>03.09.2023</Text>
                <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Datum auswählen</PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Input placeholder="Datum..." />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button isDisabled colorScheme="green">
                      Speichern
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Termin Übergabe",
    }),
    columnHelper.accessor("bildmaterial", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover" onClose={onClose}>
            <PopoverTrigger>
              <HStack>
                <Text>03.09.2023</Text>
                <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Datum auswählen</PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Input placeholder="Datum..." />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button isDisabled colorScheme="green">
                      Speichern
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Bildmaterial erhalten",
    }),
    columnHelper.accessor("socialTCS", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover" onClose={onClose}>
            <PopoverTrigger>
              <HStack>
                <Text>03.09.2023</Text>
                <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Datum auswählen</PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Input placeholder="Datum..." />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button isDisabled colorScheme="green">
                      Speichern
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Socialmedia TCS",
    }),
    columnHelper.accessor("socialFremd", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover" onClose={onClose}>
            <PopoverTrigger>
              <HStack>
                <Text>03.09.2023</Text>
                <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Datum auswählen</PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Input placeholder="Datum..." />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button isDisabled colorScheme="green">
                      Speichern
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "Socialmedia Fremd",
    }),
    columnHelper.accessor("presseErlaubt", {
      header: "Presse erwünscht",
      cell: ({ row }) => {
        return (
          <Popover trigger="hover">
            <PopoverTrigger>
              {row.original.presseErlaubt ? (
                <IconButton
                  variant={"ghost"}
                  icon={<HiOutlineCheck />}
                  color={"green.900"}
                />
              ) : (
                <IconButton
                  variant={"ghost"}
                  icon={<HiOutlineNoSymbol />}
                  color={"red.500"}
                />
              )}
            </PopoverTrigger>
            <PopoverContent width={"auto"}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Pressearbeit erwünscht?</PopoverHeader>
              <PopoverBody>
                <ButtonGroup size="sm">
                  <Button colorScheme="red">Nein</Button>
                  <Button colorScheme="green">Ja</Button>
                </ButtonGroup>
                <Divider my={4} />
                <Flex direction={"column"} gap={4}>
                  <div>
                    <Text>
                      <chakra.span fontWeight={600}>
                        Presseeinladung versendet:{" "}
                      </chakra.span>
                      16.08.2023
                    </Text>
                    <Text>
                      <chakra.span fontWeight={600}>
                        Pressemitteilung erstellt:{" "}
                      </chakra.span>
                      17.08.2023
                    </Text>
                    <Text>
                      <chakra.span fontWeight={600}>
                        Pressemitteilung freigegeben:{" "}
                      </chakra.span>
                      18.08.2023
                    </Text>
                    <Text>
                      <chakra.span fontWeight={600}>
                        Pressemitteilung versendet:{" "}
                      </chakra.span>
                      19.08.2023
                    </Text>
                    <Text>
                      <chakra.span fontWeight={600}>
                        Pressearbeit erledigt:{" "}
                      </chakra.span>
                      20.08.2023
                    </Text>
                  </div>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
    }),
    columnHelper.accessor("zwb1000", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover" onClose={onClose}>
            <PopoverTrigger>
              <HStack>
                <Text>03.09.2023</Text>
                <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Datum auswählen</PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Input placeholder="Datum..." />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button isDisabled colorScheme="green">
                      Speichern
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "ZWB 1000,-",
    }),
    columnHelper.accessor("zwb5000", {
      cell: ({ row, info }) => {
        return (
          <Popover trigger="hover" onClose={onClose}>
            <PopoverTrigger>
              <HStack>
                <Text>03.09.2023</Text>
                <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
              </HStack>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Datum auswählen</PopoverHeader>
              <PopoverBody>
                <Stack spacing={4}>
                  <Input placeholder="Datum..." />
                  <ButtonGroup display="flex" justifyContent="flex-end">
                    <Button variant="outline" onClick={onClose}>
                      Abbrechen
                    </Button>
                    <Button isDisabled colorScheme="green">
                      Speichern
                    </Button>
                  </ButtonGroup>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      },
      header: "ZWB 5000,-",
    }),
    columnHelper.accessor("controls", {
      cell: ({ row, info }) => (
        <HStack>
          <Tooltip label="Bewerbung einsehen" placement="top">
            <IconButton
              as={Link}
              variant={"ghost"}
              aria-label="Bewerbung zeigen"
              icon={<HiOutlineFolderOpen />}
              href={`/admin/bewerbung/${row.original.id}`}
            />
          </Tooltip>
          <Tooltip label="Bewerbung löschen" placement="top">
            <IconButton
              variant={"ghost"}
              aria-label="Bewerbung löschen"
              icon={<HiOutlineTrash />}
              colorScheme="red"
            />
          </Tooltip>
        </HStack>
      ),
      header: "",
    }),
  ];

  const table = useReactTable({
    columns,
    data: letters,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  useEffect(() => {
    table.setPageSize(999999999);
  }, []);

  function rowColor(status) {
    switch (status) {
      case "offen":
        return "";
      case "1000":
        return "green.50";
      case "5000":
        return "green.50";
      case "ausland":
        return "blue.50";
      case "abgelehnt":
        return "red.50";
    }
  }

  return (
    <>
      <HStack mt={10} mb={6}>
        <Heading color={"gray.700"} size={"md"} textAlign={"left"}>
          Bewerbungen{" "}
          <chakra.span color={"gray.400"}>({letters.length})</chakra.span>
        </Heading>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Suche..."
          maxWidth={"450px"}
          w={"100%"}
          ml={"auto"}
        />
      </HStack>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
              <TableCaption color={"gray.400"}>
                letzte Bewerbung 12.07.2023 | 16.53 Uhr | dev
              </TableCaption>
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const meta = header.column.columnDef.meta;
                      return (
                        <Th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          isNumeric={meta?.isNumeric}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          <chakra.span pl="4">
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <TriangleDownIcon aria-label="sorted descending" />
                              ) : (
                                <TriangleUpIcon aria-label="sorted ascending" />
                              )
                            ) : null}
                          </chakra.span>
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    // onClick={() =>
                    //   router.push(`/admin/bewerbung/${row.getValue("id")}`)
                    // }
                    bg={rowColor(row.getValue("status"))}
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "gray.50",
                      transitionDuration: "200ms",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta;
                      return (
                        <Td key={cell.id} isNumeric={meta?.isNumeric}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
}

export default LetterTable;
