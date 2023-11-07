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
  Flex,
  useToast,
  Stack,
  Select,
  Spacer,
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiUserPlus,
  HiOutlineTrash,
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

import DebouncedInput from "@/lib/debouncedInput";
import fuzzyFilter from "@/lib/fuzzyFilter";
import { useDisclosure } from "@chakra-ui/react";
import FormBotschafterModal from "./formBotschafterModal";
import ImportBotschafterModal from "./importBotschafterModal";
import BotschafterDeleteModal from "./botschafterDeleteModal";
import { exportToExcel } from "react-json-to-excel";

function BotschafterTable({ botschafters }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([...botschafters]);
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

  const columns = useMemo(
    () => [
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
      columnHelper.accessor("vorname"),
      columnHelper.accessor("name"),
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
                onClick={() => {
                  setSelectedBot(row.original);
                  onOpenDelete();
                }}
              />
            </Tooltip>
          </>
        ),
        header: "Test ",
      }),
    ],
    [tableData]
  );

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
    // manualPagination: true,
  });

  async function onSubmitDelete(id) {
    setLoading(true);
    const res = await fetch("/api/botschafter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        botschafterId: id,
      }),
    });
    if (res.status != 200) {
      toast({
        title: "Ein Fehler ist aufgetreten",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    } else {
      toast({
        title: `Botschafter gelöscht`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      const newTableData = tableData.filter((data) => data.id !== id);
      setTableData(newTableData);
      onCloseDelete();
      setLoading(false);
    }
  }

  function handleExport() {
    const ids = table
      .getFilteredRowModel()
      .rows.map((row) => row.getValue("id"));
    const result = tableData
      .filter(({ id }) => ids.includes(id))
      .map((row) => {
        return Object.assign(
          { botschafter: `${row.vorname} ${row.name}` },
          row
        );
      });
    console.log("result", result);
    const date = new Date().toLocaleDateString("de-DE").replace(/\./g, "-");
    exportToExcel(result, "botschafter_export_" + date);
  }

  useEffect(() => {
    // table.setPageSize(999999);
  }, []);

  return (
    <>
      <Stack mt={10} mb={6} direction={{ base: "column", md: "row" }}>
        <Heading
          color={"gray.700"}
          size={"md"}
          textAlign={"left"}
          margin={"auto 0"}
        >
          Botschafter{" "}
          <chakra.span color={"gray.400"}>
            {table.getFilteredRowModel().rows.length || "-"} /{" "}
            {tableData.length}
          </chakra.span>
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
        <FormBotschafterModal
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          isNew={true}
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
            <Tooltip label="Botschafter exportieren" placement="top">
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
      <BotschafterDeleteModal
        botschafter={selectedBot}
        onOpen={onOpenDelete}
        onClose={onCloseDelete}
        isOpen={isOpenDelete}
        onSubmitDelete={onSubmitDelete}
        loading={loading}
      />
    </>
  );
}

export default BotschafterTable;
