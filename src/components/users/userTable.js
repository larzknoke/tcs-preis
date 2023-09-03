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
import FormUserModal from "./formUserModal";
import UserDeleteModal from "./userDeleteModal";

function UserTable({ users }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([...users]);
  const [userData, setUserData] = useState({});
  const [isNew, setIsNew] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [sorting, setSorting] = useState([{ id: "email", desc: false }]);
  const [globalFilter, setGlobalFilter] = useState("");
  const columnHelper = createColumnHelper();
  const [selectedUser, setSelectedUser] = useState();

  function handleUserForm(newStatus, user = {}) {
    setIsNew(newStatus);
    setUserData(user);
    onOpen();
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: "ID",
      }),
      columnHelper.accessor("name", {
        header: "Name",
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("controls", {
        cell: ({ row, info }) => (
          <>
            <Tooltip label="Benutzer zeigen" placement="top">
              <IconButton
                onClick={() => handleUserForm(false, row.original)}
                variant={"ghost"}
                aria-label="Benutzer zeigen"
                icon={<HiOutlineFolderOpen />}
                href={`/admin/users/${row.original.id}`}
              />
            </Tooltip>
            <Tooltip label="Benutzer löschen" placement="top">
              <IconButton
                variant={"ghost"}
                aria-label="Benutzer löschen"
                icon={<HiOutlineTrash />}
                colorScheme="red"
                onClick={() => {
                  setSelectedUser(row.original);
                  onOpenDelete();
                }}
              />
            </Tooltip>
          </>
        ),
        header: "",
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
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
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
        title: `Benutzer gelöscht`,
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

  useEffect(() => {
    setTableData(users);
  }, [users]);

  return (
    <>
      <HStack mt={10} mb={6}>
        <Heading color={"gray.700"} size={"md"} textAlign={"left"}>
          Benutzer{" "}
          <chakra.span color={"gray.400"}>({tableData.length})</chakra.span>
        </Heading>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Suche..."
          maxWidth={"450px"}
          w={"100%"}
          ml={"auto"}
        />
        <Tooltip label="Benutzer hinzufügen" placement="top">
          <IconButton
            onClick={() => handleUserForm(true)}
            icon={<HiUserPlus />}
            colorScheme="green"
            variant={"outline"}
          />
        </Tooltip>
        <FormUserModal
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          isNew={isNew}
          user={userData}
        />
      </HStack>
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
          <Flex gap={2} mt={6}>
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
            <chakra.span className="flex items-center gap-1">
              <Text>Seite</Text>
              <strong>
                {table.getState().pagination.pageIndex + 1} von{" "}
                {table.getPageCount()}
              </strong>
            </chakra.span>
            <chakra.span className="flex items-center gap-1">
              | Seite:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-10"
              />
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
          </Flex>
        </CardBody>
      </Card>
      <UserDeleteModal
        user={selectedUser}
        onOpen={onOpenDelete}
        onClose={onCloseDelete}
        isOpen={isOpenDelete}
        onSubmitDelete={onSubmitDelete}
        loading={loading}
      />
    </>
  );
}

export default UserTable;
