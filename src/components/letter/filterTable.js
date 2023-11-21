import {
  Table,
  Card,
  CardBody,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Stack,
  Heading,
  chakra,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Tooltip,
  Text,
  Input,
  Select,
} from "@chakra-ui/react";
import React from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiPaperClip,
} from "react-icons/hi2";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { exportToExcel } from "react-json-to-excel";

import {
  Column,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { TableContainer } from "@chakra-ui/react";
import { dateFormatter } from "@/lib/utils";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// const fuzzySort= (rowA, rowB, columnId) => {
//   let dir = 0

//   // Only sort by rank if the column has ranking information
//   if (rowA.columnFiltersMeta[columnId]) {
//     dir = compareItems(
//       rowA.columnFiltersMeta[columnId]?.itemRank!,
//       rowB.columnFiltersMeta[columnId]?.itemRank!
//     )
//   }

//   // Provide an alphanumeric fallback for when the item ranks are equal
//   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
// }

function FilterTable({ letters }) {
  const [tableData, setTableData] = React.useState([...letters]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  function handleExport() {
    const ids = table
      .getFilteredRowModel()
      .rows.map((row) => row.getValue("id"));
    const result = tableData.filter(({ id }) => ids.includes(id));
    const date = new Date().toLocaleDateString("de-DE").replace(/\./g, "-");
    exportToExcel(result, "bewerbung_export_" + date);
  }

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "createdAt",
        cell: (info) => dateFormatter(info.getValue(), false),
        footer: (props) => props.column.id,
        header: "Erstellt",
        filterFn: "isWithinRange",
      },
      {
        accessorKey: "status",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: "equals",
      },
      {
        accessorKey: "bundeslandTraeger",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        filterFn: "equals",
      },
      {
        accessorKey: "nameProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "nameTraeger",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "vorstandTraeger",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "plzTraeger",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ortTraeger",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "organisationProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ansprechpartnerProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "emailProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "telefonnummerProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "mobilProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "wwwProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "strasseProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "plzProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ortProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "bundeslandProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "wannProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const table = useReactTable({
    data: tableData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
      isWithinRange: isWithinRange,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
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
      <Stack mt={10} mb={6} direction={{ base: "column", md: "row" }}>
        <Heading
          color={"gray.700"}
          size={"md"}
          textAlign={"left"}
          margin={"auto 0"}
        >
          Bewerbung Filter{" "}
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
          size={"md"}
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
                      return (
                        <Th key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <>
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? "cursor-pointer select-none"
                                    : "",
                                  onClick:
                                    header.column.getToggleSortingHandler(),
                                }}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {{
                                  asc: (
                                    <TriangleUpIcon
                                      aria-label="sorted descending"
                                      ml={2}
                                    />
                                  ),
                                  desc: (
                                    <TriangleDownIcon
                                      aria-label="sorted descending"
                                      ml={2}
                                    />
                                  ),
                                }[header.column.getIsSorted()] ?? null}
                              </div>
                              {header.column.getCanFilter() ? (
                                <div>
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                </div>
                              ) : null}
                            </>
                          )}
                        </Th>
                      );
                    })}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
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
      <pre>{JSON.stringify(table.getState(), null, 2)}</pre>
    </>
  );
}

function Filter({ column, table }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  switch (column.id) {
    case "createdAt":
      return (
        <div>
          <div className="flex space-x-2">
            <DebouncedInput
              type="date"
              value={columnFilterValue?.[0] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old) => [value, old?.[1]])
              }
            />
            <DebouncedInput
              type="date"
              value={columnFilterValue?.[1] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old) => [old?.[0], value])
              }
            />
          </div>
        </div>
      );
    case "id":
      return (
        <div>
          <div className="flex space-x-2">
            <DebouncedInput
              type="number"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={columnFilterValue?.[0] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old) => [value, old?.[1]])
              }
              placeholder={`Min ${
                column.getFacetedMinMaxValues()?.[0]
                  ? `(${column.getFacetedMinMaxValues()?.[0]})`
                  : ""
              }`}
            />
            <DebouncedInput
              type="number"
              min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
              max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
              value={columnFilterValue?.[1] ?? ""}
              onChange={(value) =>
                column.setFilterValue((old) => [old?.[0], value])
              }
              placeholder={`Max ${
                column.getFacetedMinMaxValues()?.[1]
                  ? `(${column.getFacetedMinMaxValues()?.[1]})`
                  : ""
              }`}
            />
          </div>
        </div>
      );
    default:
      return (
        <>
          <datalist id={column.id + "list"}>
            {sortedUniqueValues.slice(0, 5000).map((value) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <DebouncedInput
            type="text"
            value={columnFilterValue ?? ""}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Suche... (${column.getFacetedUniqueValues().size})`}
            list={column.id + "list"}
          />
        </>
      );
  }
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  size = "xs",
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      size={size}
      mt={2}
    />
  );
}

function isWithinRange(row, columnId, value) {
  const date = row.getValue(columnId);
  const [startRaw, endRaw] = value; // value => two date input values
  const start = startRaw != "" ? new Date(startRaw) : null;
  const end = endRaw != "" ? new Date(endRaw) : null;
  if ((start || end) && !date) return false;
  if (start && !end) {
    console.log("1");
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    console.log("2");
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    console.log("3", start);
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  } else return true;
}

export default FilterTable;
