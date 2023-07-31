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
  Button,
  Card,
  CardBody,
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiOutlineCheck,
  HiOutlineNoSymbol,
  HiOutlineQuestionMarkCircle,
  HiUserPlus,
  HiOutlineTrash,
  HiOutlinePlus,
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
import { useDisclosure } from "@chakra-ui/react";
import NewKampagneModal from "./newKampagneModal";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "ID",
  }),
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name",
  }),
  columnHelper.accessor("abgeschlossen", {
    header: "Abgeschlossen",
    cell: (info) => (
      <Tooltip label={info.getValue()} placement="top">
        <span>
          {info.getValue() ? (
            <Icon as={HiOutlineCheck} color={"green.900"} />
          ) : (
            <Icon as={HiOutlineNoSymbol} color={"red.500"} />
          )}
        </span>
      </Tooltip>
    ),
  }),
  columnHelper.accessor("controls", {
    cell: ({ row, info }) => (
      <>
        <Tooltip label="kampagne einsehen" placement="top">
          <IconButton
            as={Link}
            variant={"ghost"}
            aria-label="kampagne zeigen"
            icon={<HiOutlineFolderOpen />}
            href={`/admin/kampagne/${row.original.id}`}
          />
        </Tooltip>
        <Tooltip label="kampagne löschen" placement="top">
          <IconButton
            variant={"ghost"}
            aria-label="kampagne löschen"
            icon={<HiOutlineTrash />}
            colorScheme="red"
          />
        </Tooltip>
      </>
    ),
    header: "",
  }),
];

function KampagneTable({ kampagnes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data: kampagnes,
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
          Kampagnen{" "}
          <chakra.span color={"gray.400"}>({kampagnes.length})</chakra.span>
        </Heading>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Suche..."
          maxWidth={"450px"}
          w={"100%"}
          ml={"auto"}
        />
        <Tooltip label="Kampagne hinzufügen" placement="top">
          <IconButton
            onClick={onOpen}
            icon={<HiOutlinePlus />}
            colorScheme="green"
            variant={"outline"}
          />
        </Tooltip>
        <NewKampagneModal onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
      </HStack>
      <Card>
        <CardBody>
          <TableContainer>
            <Table>
              <TableCaption color={"gray.400"}>
                {/* letzte Bewerbung 12.07.2023 | 16.53 Uhr */}
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
        </CardBody>
      </Card>
    </>
  );
}

export default KampagneTable;