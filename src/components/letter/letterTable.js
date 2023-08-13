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
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiOutlineCheck,
  HiOutlineNoSymbol,
  HiOutlineQuestionMarkCircle,
  HiMiniLanguage,
  HiMiniStar,
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
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Tooltip label={Capatilizer(info.getValue())} placement="top">
          <span>
            {info.getValue() == "offen" && (
              <Icon as={HiOutlineQuestionMarkCircle} color={"yellow.500"} />
            )}
            {info.getValue() == "abgelehnt" && (
              <Icon as={HiOutlineNoSymbol} color={"red.500"} />
            )}
            {info.getValue() == "1000" && (
              <Icon as={HiOutlineCheck} color={"green.900"} />
            )}
            {info.getValue() == "5000" && (
              <Flex>
                <Icon as={HiOutlineCheck} color={"green.900"} />
                <Icon as={HiMiniStar} color={"yellow.400"} />
              </Flex>
            )}
            {info.getValue() == "ausland" && (
              <Icon as={HiMiniLanguage} color={"yellow.900"} />
            )}
          </span>
        </Tooltip>
      ),
    }),
    columnHelper.accessor("bundeslandTraeger", {
      header: "Bundesland",
    }),
    columnHelper.accessor("botschafter", {
      cell: ({ row, info }) => {
        return (
          (
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
          ) || "-"
        );
      },
      header: "Botschafter",
    }),
    columnHelper.accessor("nameTraeger", {
      cell: ({ row, info }) => {
        return (
          <Text>
            <chakra.span>{row.original.nameTraeger}</chakra.span>{" "}
            {/* {row.original.wwwProjekt && (
              <chakra.a color="gray.500">({row.original.wwwProjekt})</chakra.a>
            )} */}
          </Text>
        );
      },
      header: "Träger",
    }),
    columnHelper.accessor("organisationProjekt", {
      header: "Projekt",
    }),
    columnHelper.accessor("plzTraeger", {
      cell: ({ row, info }) =>
        row.original.plzTraeger + " " + row.original.ortTraeger,
      header: "PLZ / Ort",
    }),
    columnHelper.accessor("controls", {
      cell: ({ row, info }) => (
        <Tooltip label="Bewerbung einsehen" placement="top">
          <IconButton
            as={Link}
            variant={"ghost"}
            aria-label="Bewerbung zeigen"
            icon={<HiOutlineFolderOpen />}
            href={`/admin/bewerbung/${row.original.id}`}
          />
        </Tooltip>
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
        return "yellow.50";
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
                    onClick={() =>
                      router.push(`/admin/bewerbung/${row.getValue("id")}`)
                    }
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
