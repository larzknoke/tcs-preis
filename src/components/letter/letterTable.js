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
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiOutlineCheck,
  HiOutlineNoSymbol,
  HiOutlineQuestionMarkCircle,
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
import { useState } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { tableData } from "@/lib/tableData";

import DebouncedInput from "@/lib/debouncedInput";
import fuzzyFilter from "@/lib/fuzzyFilter";

function LetterTable({ letters }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "ID",
    }),
    columnHelper.accessor("nameTraeger", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("organisationProjekt", {
      cell: (info) => info.getValue(),
      header: "Projekt",
    }),
    columnHelper.accessor("bundeslandTraeger", {
      cell: (info) => info.getValue(),
      header: "Bundesland",
    }),
    columnHelper.accessor("plzTraeger", {
      cell: ({ row, info }) =>
        row.original.plzTraeger + " " + row.original.ortTraeger,
      header: "PLZ / Ort",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <Tooltip label={info.getValue()} placement="top">
          <span>
            {info.getValue() == "offen" && (
              <Icon as={HiOutlineQuestionMarkCircle} color={"yellow.500"} />
            )}
            {info.getValue() == "abgelehnt" && (
              <Icon as={HiOutlineNoSymbol} color={"red.500"} />
            )}
            {info.getValue() == "angenommen" && (
              <Icon as={HiOutlineCheck} color={"green.900"} />
            )}
          </span>
        </Tooltip>
      ),
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
          {letters.length > 0 ? (
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
                    <Tr key={row.id}>
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
          ) : (
            <Alert status="warning">
              <AlertIcon />
              <AlertDescription>keine Bewerbungen vorhanden</AlertDescription>
            </Alert>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default LetterTable;
