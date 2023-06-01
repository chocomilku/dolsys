import {
	Box,
	Container,
	Heading,
	IconButton,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	VStack,
	HStack,
	Text,
	useToast,
	Code,
	useDisclosure,
} from "@chakra-ui/react";
import {
	HiChevronLeft,
	HiChevronDoubleLeft,
	HiChevronRight,
	HiChevronDoubleRight,
} from "react-icons/hi";
import { PaginationDetails } from "../../../../interfaces/Pagination";
import { useEffect, useState } from "react";
import { axiosWrapperWithAuthToken } from "../../controllers/axios/axiosWrapperWithAuthToken";
import { useAuth0 } from "@auth0/auth0-react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { EditFileModal } from "../../components/modal/EditFileModal";
import { FileMetadata } from "../../../../interfaces/File";

const LIMIT = 10;

export const FilesIndexPage = (): JSX.Element => {
	const [filesList, setFilesList] = useState<FileMetadata[]>([]);
	const [pagination, setPagination] = useState<PaginationDetails>();
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [selectedFileEdit, setSelectedFileEdit] = useState<
		FileMetadata | undefined
	>();

	const { getAccessTokenSilently } = useAuth0();
	const {
		isOpen: isModalOpen,
		onOpen: onModalOpen,
		onClose: onModalClose,
	} = useDisclosure();
	const toast = useToast();

	const editModalOnOpen = (cell_id: number) => {
		setSelectedFileEdit(filesList[cell_id]);
		onModalOpen();
	};

	const editModalOnClose = () => {
		onModalClose();
		setSelectedFileEdit(undefined);
	};

	const deleteFile = async (cell_id: number) => {
		const toBeDeletedFile = filesList[cell_id];

		const response = axiosWrapperWithAuthToken<Record<string, never>>(
			await getAccessTokenSilently(),
			{
				method: "DELETE",
				url: `/files/${toBeDeletedFile.uid}`,
			}
		);

		if (!response) return;
		const updatedFilesList = filesList.filter(
			(file) => file.uid !== toBeDeletedFile.uid
		);
		setFilesList(updatedFilesList);

		toast({
			title: "File Deleted",
			description: (
				<p>
					File <Code>{toBeDeletedFile.file_name}</Code> has been deleted.
				</p>
			),
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	};

	useEffect(() => {
		const fetchFilesList = async () => {
			const access_token = await getAccessTokenSilently();

			const response = await axiosWrapperWithAuthToken<{
				files: FileMetadata[];
				pagination: PaginationDetails;
			}>(access_token, {
				method: "GET",
				url: "/files",
				params: {
					page: currentPage,
					limit: LIMIT,
				},
			});

			if (!response.data) return;

			const { files, pagination } = response.data;

			setFilesList(files);
			setPagination(pagination);
			setCurrentPage(pagination.currentPage);
		};
		fetchFilesList();
	}, [getAccessTokenSilently, currentPage]);

	const columnHelper = createColumnHelper<FileMetadata>();

	type AddColumnKey = FileMetadata & {
		action: unknown;
	};
	type ColumnKeys = (keyof AddColumnKey)[];

	const columnKeys: ColumnKeys = [
		"action",
		"id",
		"file_name",
		"created_at",
		"uid",
		"download_count",
		"title",
		"phase_no",
		"unit_no",
		"category_id",
		"category_name",
		"category_code",
		"category_scope_level",
		"category_color",
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
								onClick={() => editModalOnOpen(props.row.index)}
							/>
							<IconButton
								aria-label="Delete File"
								variant="solid"
								colorScheme="red"
								icon={<AiFillDelete />}
								onClick={() => deleteFile(props.row.index)}
							/>
						</HStack>
					);
				},
			});
		}

		return columnHelper.accessor(key as keyof FileMetadata, {
			header: key,
			cell: (info) => info.getValue(),
		});
	});

	const tableInstance = useReactTable({
		columns,
		data: filesList ?? [],
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<>
			<VStack as={Container} maxW="container.xl" p={{ base: 4, md: 8 }}>
				<Heading textAlign="center" pb={8}>
					Files
				</Heading>
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
				<HStack>
					<IconButton
						aria-label="Go to First Page"
						variant="outline"
						colorScheme="purple"
						icon={<HiChevronDoubleLeft />}
						onClick={() => setCurrentPage(1)}
						isDisabled={currentPage === 1}
					/>
					<IconButton
						aria-label="Go to Previous Page"
						variant="outline"
						colorScheme="purple"
						icon={<HiChevronLeft />}
						onClick={() => setCurrentPage(currentPage - 1)}
						isDisabled={currentPage === 1}
					/>

					<Text>
						Page {currentPage} / {pagination?.totalPages}
					</Text>

					<IconButton
						aria-label="Go to Next Page"
						variant="outline"
						colorScheme="purple"
						icon={<HiChevronRight />}
						onClick={() => setCurrentPage(currentPage + 1)}
						isDisabled={currentPage === pagination?.totalPages}
					/>
					<IconButton
						aria-label="Go to Last Page"
						variant="outline"
						colorScheme="purple"
						icon={<HiChevronDoubleRight />}
						onClick={() => setCurrentPage(pagination?.totalPages ?? 1)}
						isDisabled={currentPage === pagination?.totalPages}
					/>
				</HStack>
			</VStack>
			<EditFileModal
				isOpen={isModalOpen}
				onClose={editModalOnClose}
				file={selectedFileEdit}
			/>
		</>
	);
};
