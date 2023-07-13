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
} from "@chakra-ui/react";
import {
  HiOutlineFolderOpen,
  HiOutlineCheck,
  HiXMark,
  HiOutlineNoSymbol,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import { useState } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Link from "next/link";

const data = [
  {
    id: "1",
    name: "Max Mustermann",
    projekt: "Ev.-luth. Kindertagesstätte 'Arche Noah'",
    bundesland: "Niedersachsen",
    plz: 37603,
    ort: "Holzminden",
    status: "offen",
  },
  {
    id: "2",
    name: "Anja Tollhausen",
    projekt: "BürgerStiftung Erfurt",
    bundesland: "Thüringen",
    plz: 99102,
    ort: "Erfurt",
    status: "angenommen",
  },
  {
    id: "3",
    name: "Yvonne Bauer",
    projekt: "Kinderschutzbund Schweinfurt",
    bundesland: "Bayern",
    plz: 80687,
    ort: "München",
    status: "abgelehnt",
  },
  {
    id: "4",
    name: "Ulrike Herkner",
    projekt: "Kinderhospiz Bärenherz",
    bundesland: "Sachsen",
    plz: 4207,
    ort: "Leipzig",
    status: "offen",
  },
];

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
  columnHelper.accessor("projekt", {
    cell: (info) => info.getValue(),
    header: "Projekt",
  }),
  columnHelper.accessor("bundesland", {
    cell: (info) => info.getValue(),
    header: "Bundesland",
  }),
  columnHelper.accessor("plz", {
    cell: ({ row, info }) => row.original.plz + " " + row.original.ort,
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
          href={`/letter/${row.original.id}`}
        />
      </Tooltip>
    ),
    header: "",
  }),
];

function LetterTable() {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <TableContainer>
      <Table>
        <TableCaption>letzte Bewerbung 12.07.2023 | 16.53 Uhr</TableCaption>
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default LetterTable;
