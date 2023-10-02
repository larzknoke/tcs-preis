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
  useClipboard,
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiOutlineTrash,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiPaperClip,
  HiOutlineClipboard,
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

function LetterNotVerifiedTable({ letters }) {
  const toast = useToast();
  const [tableData, setTableData] = useState([...letters]);
  const [sorting, setSorting] = useState([{ id: "id", desc: false }]);
  const [globalFilter, setGlobalFilter] = useState("");

  const columnHelper = createColumnHelper();

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
    columnHelper.accessor("nameTraeger"),
    columnHelper.accessor("nameProjekt"),
    columnHelper.accessor("organisationProjekt"),
    columnHelper.accessor("emailProjekt"),
    columnHelper.accessor("ansprechpartnerProjekt"),
    columnHelper.accessor("verifiyid", {
      cell: ({ row, info }) => (
        <HStack>
          <Text>{row.original.verifyId}</Text>
          {/* <Tooltip label="Link kopieren" placement="top">
            <IconButton
              variant={"ghost"}
              aria-label="Link kopieren"
              icon={<HiOutlineClipboard />}

            />
          </Tooltip> */}
        </HStack>
      ),
      header: "verifiyid",
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
          Nicht bestätigte Bewerbungen{" "}
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

export default LetterNotVerifiedTable;
