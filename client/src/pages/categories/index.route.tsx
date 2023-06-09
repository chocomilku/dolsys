import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Category } from "../../../../interfaces/Category";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosWrapperWithAuthToken } from "../../controllers/axios/axiosWrapperWithAuthToken";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { EditCategoryModal } from "../../components/modal/EditCategoryModal";
import { AddCategoryModal } from "../../components/modal/AddCategoryModal";

export const CategoryIndexPage = (): JSX.Element => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategoryEdit, setSelectedCategoryEdit] = useState<Category>({
    id: 0,
    name: "",
    code: "",
    scope_level: "",
    color: "",
  });

  const { getAccessTokenSilently } = useAuth0();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();

  const fetchCategoryList = useCallback(async () => {
    const response = await axiosWrapperWithAuthToken<Category[]>(
      await getAccessTokenSilently(),
      {
        method: "GET",
        url: "/categories",
      }
    );

    if (!response.data) return;

    setCategoryList(response.data);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchCategoryList();
  }, [fetchCategoryList]);

  const editCategoryModalOpen = (cell_id: number) => {
    setSelectedCategoryEdit(categoryList[cell_id]);
    onModalOpen();
  };

  const editCategoryModalClose = async () => {
    await fetchCategoryList();
    onModalClose();
  };

  const columnHelper = createColumnHelper<Category>();
  type AddColumnKey = Category & { action: unknown };
  type ColumnKeys = (keyof AddColumnKey)[];
  const columnKeys: ColumnKeys = [
    "action",
    "id",
    "name",
    "code",
    "scope_level",
    "color",
  ];

  const columns = columnKeys.map((key) => {
    if (key === "action") {
      return columnHelper.display({
        id: "action",
        cell: (props) => {
          return (
            <HStack>
              <IconButton
                aria-label="Edit File"
                variant="solid"
                colorScheme="blue"
                icon={<AiFillEdit />}
                onClick={() => editCategoryModalOpen(props.row.index)}
              />
            </HStack>
          );
        },
      });
    }

    return columnHelper.accessor(key as keyof Category, {
      header: key,
      cell: (info) => info.getValue(),
    });
  });

  const tableInstance = useReactTable({
    columns,
    data: categoryList ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <VStack as={Container} maxW="container.xl" p={{ base: 4, md: 8 }}>
        <Heading>Categories</Heading>
        <Button
          variant="outline"
          colorScheme="green"
          size={"sm"}
          rightIcon={<AiOutlinePlus />}
          m={4}
          onClick={onAddModalOpen}
        >
          Create Category
        </Button>
        <Box w={"full"} overflowX="scroll">
          <Table>
            <Thead>
              {tableInstance.getHeaderGroups().map((headerGroup) => {
                return (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <Th key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Th>
                      );
                    })}
                  </Tr>
                );
              })}
            </Thead>
            <Tbody>
              {tableInstance.getRowModel().rows.map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </VStack>
      <EditCategoryModal
        isOpen={isModalOpen}
        onClose={editCategoryModalClose}
        category={selectedCategoryEdit}
      />
      <AddCategoryModal isOpen={isAddModalOpen} onClose={onAddModalClose} />
    </>
  );
};
