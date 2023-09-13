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
  useToast,
  Spacer,
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
  HiUserPlus,
  HiOutlineCircleStack,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiPaperClip,
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
import { useState, useEffect, useMemo } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

import DebouncedInput from "@/lib/debouncedInput";
import fuzzyFilter from "@/lib/fuzzyFilter";

import { Capatilizer, dateFormatter } from "@/lib/utils";
import DateInput from "./dateInput";
import { exportToExcel } from "react-json-to-excel";

function LetterTable({ letters }) {
  const router = useRouter();
  const toast = useToast();
  const [tableData, setTableData] = useState([...letters]);
  const [sorting, setSorting] = useState([{ id: "id", desc: false }]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  function checkHasEmpty(list) {
    if (list.includes(null) || list.includes("") || list.includes(undefined)) {
      return true;
    } else {
      return false;
    }
  }

  async function changeStatus(status, id) {
    const res = await fetch("/api/letter/updateStatus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, status: status }),
    });
    if (res.status == 401) {
      toast({
        title: "Sie sind nicht berechtigt diese Funktion auszuführen.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      const resData = await res.json();
      setTableData(
        tableData.map((l) =>
          l.id == resData.result.id
            ? { ...l, status: resData.result.status }
            : l
        )
      );

      toast({
        title: `Status geändert`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function changeFbCheck(status, id) {
    const res = await fetch("/api/letter/updateFbCheck", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, checkFreistellung: status }),
    });
    if (res.status == 401) {
      toast({
        title: "Sie sind nicht berechtigt diese Funktion auszuführen.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      const resData = await res.json();
      setTableData(
        tableData.map((l) =>
          l.id == resData.result.id
            ? { ...l, checkFreistellung: resData.result.checkFreistellung }
            : l
        )
      );

      toast({
        title: `Status geändert`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function changePresseErlaubt(status, id) {
    const res = await fetch("/api/letter/updatePresseErlaubt", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, presseErlaubt: status }),
    });
    if (res.status == 401) {
      toast({
        title: "Sie sind nicht berechtigt diese Funktion auszuführen.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      const resData = await res.json();
      setTableData(
        tableData.map((l) =>
          l.id == resData.result.id
            ? { ...l, presseErlaubt: resData.result.presseErlaubt }
            : l
        )
      );

      toast({
        title: `Status geändert`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function submitDate(id, date, typ) {
    const res = await fetch("/api/letter/updateDate", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, date, typ }),
    });
    if (res.status == 401) {
      toast({
        title: "Sie sind nicht berechtigt diese Funktion auszuführen.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else {
      const resData = await res.json();
      setTableData(
        tableData.map((l) =>
          l.id == resData.result.id ? { ...l, [typ]: date } : l
        )
      );

      toast({
        title: `Datum geändert`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  function handleExport() {
    const ids = table
      .getFilteredRowModel()
      .rows.map((row) => row.getValue("id"));
    const result = tableData.filter(({ id }) => ids.includes(id));
    const date = new Date().toLocaleDateString("de-DE").replace(/\./g, "-");
    exportToExcel(result, "bewerbung_export_" + date);
  }

  const columns = useMemo(() => [
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
      cell: ({ info, row }) => (
        <Popover trigger="hover" placement="left-start">
          <PopoverTrigger>
            <span>
              {row.original.status == "offen" && (
                <Icon as={HiOutlineQuestionMarkCircle} color={"yellow.500"} />
              )}
              {row.original.status == "abgelehnt" && (
                <Icon as={HiOutlineNoSymbol} color={"red.500"} />
              )}
              {row.original.status == "1111" && (
                <Icon as={HiOutlineCheck} color={"green.700"} />
              )}
              {row.original.status == "5000" && (
                <Flex>
                  <Icon as={HiOutlineCheck} color={"green.700"} />
                  <Icon as={HiMiniStar} color={"yellow.400"} />
                </Flex>
              )}
              {row.original.status == "ausland" && (
                <Icon as={HiMiniLanguage} color={"blue.400"} />
              )}
            </span>
          </PopoverTrigger>
          <PopoverContent width={"auto"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Text as={"b"}>
                Aktueller Status: {Capatilizer(row.original.status)}
              </Text>
            </PopoverHeader>
            <PopoverBody>
              <Text mb={2}>Status ändern:</Text>
              <ButtonGroup size="sm">
                <Button
                  onClick={() => changeStatus("ausland", row.original.id)}
                  colorScheme="blue"
                >
                  Ausland
                </Button>
                <Button
                  onClick={() => changeStatus("abgelehnt", row.original.id)}
                  colorScheme="red"
                >
                  Abgelehnt
                </Button>
                <Button
                  onClick={() => changeStatus("offen", row.original.id)}
                  colorScheme="yellow"
                >
                  Offen
                </Button>
                <Button
                  onClick={() => changeStatus("1111", row.original.id)}
                  colorScheme="green"
                >
                  1111,-
                </Button>
                <Button
                  onClick={() => changeStatus("5000", row.original.id)}
                  colorScheme="green"
                  bg={"green.600"}
                >
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
                  <chakra.div>
                    <Text as={"b"}>
                      {row.original.botschafter?.vorname}{" "}
                      {row.original.botschafter?.name}
                    </Text>
                    <Text>{row.original.botschafter?.mobil}</Text>
                    <Text>{row.original.botschafter?.telefon}</Text>
                    <Text>{row.original.botschafter?.email}</Text>
                  </chakra.div>
                  <chakra.div>
                    <Text as={"b"}>Bundesland:</Text> <br />
                    <Text>{row.original.botschafter?.bundesland || "-"}</Text>
                  </chakra.div>
                  <chakra.div>
                    <Text as={"b"}>Kontakt:</Text> <br />
                    <Text>{row.original.botschafter.strasse || "-"}</Text>
                    <Text>
                      {row.original.botschafter.plz || "-"}{" "}
                      {row.original.botschafter.ort || "-"}
                    </Text>
                  </chakra.div>
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
                  <Button
                    onClick={() => changeFbCheck(false, row.original.id)}
                    colorScheme="red"
                  >
                    Abbrechen
                  </Button>
                  <Button
                    onClick={() => changeFbCheck(true, row.original.id)}
                    colorScheme="green"
                  >
                    Bestätigen
                  </Button>
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
          <HStack>
            <Text>{dateFormatter(row.original.terminGeld, false) || "-"}</Text>
            <Popover>
              <PopoverTrigger>
                <HStack>
                  <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Datum auswählen</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={4}>
                    <DateInput
                      id={row.original.id}
                      typ={"terminGeld"}
                      submitDate={submitDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        );
      },
      header: "Termin Überweisung",
    }),
    columnHelper.accessor("terminUebergabe", {
      cell: ({ row, info }) => {
        return (
          <HStack>
            <Text>
              {dateFormatter(row.original.terminUebergabe, false) || "-"}
            </Text>
            <Popover>
              <PopoverTrigger>
                <HStack>
                  <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Datum auswählen</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={4}>
                    <DateInput
                      id={row.original.id}
                      typ={"terminUebergabe"}
                      submitDate={submitDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        );
      },
      header: "Termin Übergabe",
    }),
    columnHelper.accessor("bildmaterial", {
      cell: ({ row, info }) => {
        return (
          <HStack>
            <Text>
              {dateFormatter(row.original.bildmaterial, false) || "-"}
            </Text>
            <Popover>
              <PopoverTrigger>
                <HStack>
                  <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Datum auswählen</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={4}>
                    <DateInput
                      id={row.original.id}
                      typ={"bildmaterial"}
                      submitDate={submitDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        );
      },
      header: "Bildmaterial erhalten",
    }),
    columnHelper.accessor("socialTCS", {
      cell: ({ row, info }) => {
        return (
          <HStack>
            <Text>{dateFormatter(row.original.socialTCS, false) || "-"}</Text>
            <Popover>
              <PopoverTrigger>
                <HStack>
                  <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Datum auswählen</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={4}>
                    <DateInput
                      id={row.original.id}
                      typ={"socialTCS"}
                      submitDate={submitDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        );
      },
      header: "Socialmedia TCS",
    }),
    columnHelper.accessor("socialFremd", {
      cell: ({ row, info }) => {
        return (
          <HStack>
            <Text>{dateFormatter(row.original.socialFremd, false) || "-"}</Text>
            <Popover>
              <PopoverTrigger>
                <HStack>
                  <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Datum auswählen</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={4}>
                    <DateInput
                      id={row.original.id}
                      typ={"socialFremd"}
                      submitDate={submitDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
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
                  <Button
                    onClick={() => {
                      changePresseErlaubt(false, row.original.id);
                    }}
                    colorScheme="red"
                  >
                    Nein
                  </Button>
                  <Button
                    onClick={() => {
                      changePresseErlaubt(true, row.original.id);
                    }}
                    colorScheme="green"
                  >
                    Ja
                  </Button>
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
          <HStack>
            <Text>{dateFormatter(row.original.zwb1000, false) || "-"}</Text>
            <Popover>
              <PopoverTrigger>
                <HStack>
                  <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Datum auswählen</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={4}>
                    <DateInput
                      id={row.original.id}
                      typ={"zwb1000"}
                      submitDate={submitDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        );
      },
      header: "ZWB 1000,-",
    }),
    columnHelper.accessor("zwb5000", {
      cell: ({ row, info }) => {
        return (
          <HStack>
            <Text>{dateFormatter(row.original.zwb5000, false) || "-"}</Text>
            <Popover>
              <PopoverTrigger>
                <HStack>
                  <IconButton variant={"ghost"} icon={<HiCalendarDays />} />
                </HStack>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Datum auswählen</PopoverHeader>
                <PopoverBody>
                  <Stack spacing={4}>
                    <DateInput
                      id={row.original.id}
                      typ={"zwb5000"}
                      submitDate={submitDate}
                    />
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
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
  ]);

  const table = useReactTable({
    columns,
    data: tableData,
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

  function rowColor(status) {
    switch (status) {
      case "offen":
        return "";
      case "1111":
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
      <Stack mt={10} mb={6} direction={{ base: "column", md: "row" }}>
        <Heading
          color={"gray.700"}
          size={"md"}
          textAlign={"left"}
          margin={"auto 0"}
        >
          Bewerbungen{" "}
          <chakra.span color={"gray.400"}>
            {table.getFilteredRowModel().rows.length || "-"} /{" "}
            {tableData.length}
          </chakra.span>{" "}
        </Heading>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Suche..."
          maxWidth={"450px"}
          w={"100%"}
          ml={"auto"}
        />
      </Stack>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
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
          <Flex gap={2} mt={6} direction={{ base: "column", md: "row" }}>
            <HStack>
              <IconButton
                variant={"ghost"}
                aria-label="Zur ersten Seite"
                icon={<HiChevronDoubleLeft />}
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              />
              <IconButton
                variant={"ghost"}
                aria-label="Zur ersten Seite"
                icon={<HiChevronLeft />}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
              <IconButton
                variant={"ghost"}
                aria-label="Zur ersten Seite"
                icon={<HiChevronRight />}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
              <IconButton
                variant={"ghost"}
                aria-label="Zur ersten Seite"
                icon={<HiChevronDoubleRight />}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              />
            </HStack>
            <HStack>
              <chakra.span className="flex items-center gap-1">
                <Text>Seite</Text>
                <strong>
                  {table.getState().pagination.pageIndex + 1} von{" "}
                  {table.getPageCount()}
                </strong>
              </chakra.span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50, 100, 1000].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Zeige {pageSize}
                  </option>
                ))}
              </select>
            </HStack>
            <Spacer />
            <Tooltip label="Bewerbungen exportieren" placement="top">
              <IconButton
                onClick={handleExport}
                icon={<HiPaperClip />}
                colorScheme="green"
                variant={"outline"}
              />
            </Tooltip>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}

export default LetterTable;
