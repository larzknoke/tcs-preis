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
  Tooltip,
  Text,
  Input,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerCloseButton,
  Checkbox,
  Divider,
  Select,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
  HiPaperClip,
  HiOutlineTableCells,
  HiOutlineCheck,
  HiOutlineNoSymbol,
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

import { TableContainer } from "@chakra-ui/react";
import { dateFormatter } from "@/lib/utils";
import fuzzyFilter from "@/lib/fuzzyFilter";

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
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const btnRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleExport() {
    const result = table.getFilteredRowModel().rows.map((row) => {
      const rowData = row.getVisibleCells().map((cell) => {
        return { [cell.getContext().column.id]: cell.getValue() };
      });
      const rows = Object.assign({}, ...rowData);
      return rows;
    });
    const date = new Date().toLocaleDateString("de-DE").replace(/\./g, "-");
    exportToExcel(result, "filter_export_" + date);
  }

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isNumeric: true,
          className: "sticky left-0",
        },
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
        accessorKey: "juryStatus",
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
      {
        accessorKey: "mitarbeiterProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "hauptamtlichAnzahl",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "hauptamtlichStunden",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ehrenamtlichAnzahl",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ehrenamtlichStunden",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ibanProjekt",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      // {
      //   accessorKey: "beschreibungProjekt",
      //   cell: (info) => info.getValue(),
      //   footer: (props) => props.column.id,
      // },
      // {
      //   accessorKey: "zielsetzungProjekt",
      //   cell: (info) => info.getValue(),
      //   footer: (props) => props.column.id,
      // },
      // {
      //   accessorKey: "benachteiligungProjekt",
      //   cell: (info) => info.getValue(),
      //   footer: (props) => props.column.id,
      // },
      // {
      //   accessorKey: "umsetzungProjekt",
      //   cell: (info) => info.getValue(),
      //   footer: (props) => props.column.id,
      // },
      // {
      //   accessorKey: "bisherigeErgebnisse",
      //   cell: (info) => info.getValue(),
      //   footer: (props) => props.column.id,
      // },
      {
        accessorKey: "botschafter.vorname",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.anrede",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.firma",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.bundesland",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.strasse",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.plz",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.ort",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.telefon",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.mobil",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafter.email",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "botschafterConfirm",
        footer: (props) => props.column.id,
        cell: ({ info, row }) => (
          <span>
            {row.original.botschafterConfirm ? (
              <Icon as={HiOutlineCheck} color={"green.700"} />
            ) : (
              <Icon as={HiOutlineNoSymbol} color={"red.500"} />
            )}
          </span>
        ),
      },
      {
        accessorKey: "botschafter.typ",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "terminUebergabe",
        cell: (info) => dateFormatter(info.getValue(), false),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "terminGeld",
        cell: (info) => dateFormatter(info.getValue(), false),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "eigenmittel",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "oeffentlicheZuwendungen",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "privateSpenden",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "bisherigeFoerderung",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "zwb1000",
        header: "ZWB1111",
        cell: (info) => dateFormatter(info.getValue(), false),
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
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
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
        <Tooltip label="Bewerbungen exportieren" placement="top">
          <IconButton
            onClick={handleExport}
            icon={<HiPaperClip />}
            colorScheme="green"
            variant={"outline"}
            mt={2}
          />
        </Tooltip>
        <Tooltip label="Spalten ein-/ausblenden">
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            aria-label="Spalten ein-/ausblenden"
            icon={<HiOutlineTableCells />}
            mt={2}
            colorScheme="green"
            variant={"outline"}
          />
        </Tooltip>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Spalten ein-/ausblenden</DrawerHeader>

            <DrawerBody>
              <Checkbox
                onChange={table.getToggleAllColumnsVisibilityHandler()}
                isChecked={table.getIsAllColumnsVisible()}
              >
                <Text as="b">Alle aus-/abwählen</Text>
              </Checkbox>
              <Divider my={2} />
              {table.getAllLeafColumns().map((column) => {
                return (
                  <div key={column.id}>
                    <Checkbox
                      isChecked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    >
                      {column.id}
                    </Checkbox>
                  </div>
                );
              })}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
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
                          <Td
                            key={cell.id}
                            className={
                              cell.column.columnDef.meta?.className ?? ""
                            }
                          >
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
          </Flex>
        </CardBody>
      </Card>
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
    case "botschafterConfirm":
      return (
        <>
          <Select
            h={"25px"}
            mt={2}
            size={"sm"}
            onChange={(e) => {
              if (e.target.value == "Alle") {
                column.setFilterValue("");
              } else if (e.target.value == "Ja") {
                column.setFilterValue(true);
              } else if (e.target.value == "Nein") {
                column.setFilterValue(false);
              }
            }}
          >
            <option value="Alle">Alle</option>
            <option value="Ja">Ja</option>
            <option value="Nein">Nein</option>
          </Select>
        </>
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
    case "eigenmittel":
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
    case "oeffentlicheZuwendungen":
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
    case "privateSpenden":
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
      minWidth={"90px"}
      py={3}
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
    return date.getTime() >= start.getTime();
  } else if (!start && end) {
    return date.getTime() <= end.getTime();
  } else if (start && end) {
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
  } else return true;
}

export default FilterTable;
