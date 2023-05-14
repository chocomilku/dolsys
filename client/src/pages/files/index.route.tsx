import {
	Box,
	Container,
	Heading,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";

import { FilesWithCategoriesWithoutPathAndUserID } from "../../../../interfaces/FileMetadata";
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

export const FilesIndexPage = (): JSX.Element => {
	const [filesList, setFilesList] =
		useState<FilesWithCategoriesWithoutPathAndUserID[]>();
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const fetchFilesList = async () => {
			const access_token = await getAccessTokenSilently();

			const response = await axiosWrapperWithAuthToken<
				FilesWithCategoriesWithoutPathAndUserID[] & PaginationDetails
			>(access_token, {
				method: "GET",
				url: "/files",
			});

			if (!response.data) return;

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { currentPage, totalItems, totalPages, limit, ...filesData } =
				response.data;

			setFilesList(filesData);
		};
		fetchFilesList();
	}, [getAccessTokenSilently]);

	const columnHelper =
		createColumnHelper<FilesWithCategoriesWithoutPathAndUserID>();

	const columnKeys: (keyof FilesWithCategoriesWithoutPathAndUserID)[] = [
		"id",
		"originalname",
		"created_at",
		"uid",
		"downloadCount",
		"category_id",
		"name",
		"code",
		"scope_level",
		"title",
		"phase_no",
		"unit_no",
	];

	const columns = columnKeys.map((key) => {
		return columnHelper.accessor(
			key as keyof FilesWithCategoriesWithoutPathAndUserID,
			{
				header: key,
				cell: (info) => info.getValue(),
			}
		);
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
			</VStack>
		</>
	);
};
