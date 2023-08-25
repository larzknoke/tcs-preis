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
  Text,
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiUserPlus,
  HiOutlineTrash,
  HiOutlineCircleStack,
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

import DebouncedInput from "@/lib/debouncedInput";
import fuzzyFilter from "@/lib/fuzzyFilter";
import { useDisclosure } from "@chakra-ui/react";
import NewBotschafterModal from "./newBotschafterModal";
import ImportBotschafterModal from "./importBotschafterModal";
import BotschafterDeleteModal from "./botschafterDeleteModal";

function BotschafterTable({ botschafters }) {
  const [selectedBot, setSelectedBot] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenImport,
    onOpen: onOpenImport,
    onClose: onCloseImport,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [sorting, setSorting] = useState([{ id: "plz", desc: false }]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      cell: ({ row }) => (
        <HStack>
          <Tooltip label="Botschafter einsehen" placement="top">
            <IconButton
              as={Link}
              variant={"ghost"}
              aria-label="Botschafter zeigen"
              icon={<HiOutlineFolderOpen />}
              href={`/admin/botschafter/${row.original.id}`}
            />
          </Tooltip>
          <Text>{row.original?.id}</Text>
        </HStack>
      ),
      header: "ID",
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor("name", {
      cell: ({ row, info }) => row.original.vorname + " " + row.original.name,
      header: "Name",
    }),
    columnHelper.accessor("bundesland", {
      header: "Bundesland",
    }),
    columnHelper.accessor("plz", {
      cell: ({ row, info }) => row.original.plz + " " + row.original.ort,
      header: "PLZ / Ort",
    }),
    columnHelper.accessor("primaryId", {
      header: "primary-ID",
    }),
    columnHelper.accessor("controls", {
      cell: ({ row, info }) => (
        <>
          <Tooltip label="Botschafter einsehen" placement="top">
            <IconButton
              as={Link}
              variant={"ghost"}
              aria-label="Botschafter zeigen"
              icon={<HiOutlineFolderOpen />}
              href={`/admin/botschafter/${row.original.id}`}
            />
          </Tooltip>
          <Tooltip label="Botschafter löschen" placement="top">
            <IconButton
              variant={"ghost"}
              aria-label="Botschafter löschen"
              icon={<HiOutlineTrash />}
              colorScheme="red"
              onClick={onOpenDelete}
            />
          </Tooltip>
        </>
      ),
      header: "",
    }),
  ];

  const table = useReactTable({
    columns,
    data: botschafters,
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
    table.setPageSize(100);
  }, []);

  return (
    <>
      <HStack mt={10} mb={6}>
        <Heading color={"gray.700"} size={"md"} textAlign={"left"}>
          Botschafter{" "}
          <chakra.span color={"gray.400"}>({botschafters.length})</chakra.span>
        </Heading>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Suche..."
          maxWidth={"450px"}
          w={"100%"}
          ml={"auto"}
        />
        <Tooltip label="Botschafter hinzufügen" placement="top">
          <IconButton
            onClick={onOpen}
            icon={<HiUserPlus />}
            colorScheme="green"
            variant={"outline"}
          />
        </Tooltip>
        <NewBotschafterModal
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
        />
        <Tooltip label="Botschafter importieren" placement="top">
          <IconButton
            onClick={onOpenImport}
            icon={<HiOutlineCircleStack />}
            colorScheme="green"
            variant={"outline"}
          />
        </Tooltip>
        <ImportBotschafterModal
          onOpen={onOpenImport}
          onClose={onCloseImport}
          isOpen={isOpenImport}
        />
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
      <BotschafterDeleteModal
        botschafter={selectedBot}
        onOpen={onOpenDelete}
        onClose={onCloseDelete}
        isOpen={isOpenDelete}
      />
    </>
  );
}

export default BotschafterTable;
