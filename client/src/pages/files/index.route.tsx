import {
	Avatar,
	Button,
	Container,
	FormControl,
	Heading,
	Input,
	Select,
	Stack,
	VStack,
} from "@chakra-ui/react";
import ReactSelect from "react-select";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { type User, useAuth0 } from "@auth0/auth0-react";
import { RxAvatar } from "react-icons/rx";

export const FileIndexPage = (): JSX.Element => {
	const [file, setFile] = useState<File>();
	const { user } = useAuth0();
	const handleChange = (file: File) => {
		setFile(file);
		console.log(file);
	};
	return (
		<>
			<VStack as={Container} maxW="container.xl" p={8}>
				<Heading textAlign="center" pb={8}>
					Upload Files
				</Heading>

				<form>
					<FileUploader
						handleChange={handleChange}
						name="file"
						multiple={false}
						required={true}
						// apperently, message after upload cannot be changed yet so lets wait for https://github.com/KarimMokhtar/react-drag-drop-files/pull/118 to be merged to be able to do update the text
					/>
					<Stack direction={"row"}>
						<FormControl>
							<Input
								type="text"
								placeholder={file?.name ?? "File Name"}
								isReadOnly
							/>
						</FormControl>
						<FormControl>
							<Select
								isReadOnly
								placeholder={user?.name ?? "User"}
								icon={<AvatarIcon user={user} />}
							/>
						</FormControl>
					</Stack>

					<FormControl>
						<Input type="text" placeholder="Name" />
					</FormControl>

					<Stack direction={"row"}>
						<ReactSelect
							options={[
								{ value: "chocolate", label: "Chocolate" },
								{ value: "strawberry", label: "Strawberry" },
								{ value: "vanilla", label: "Vanilla" },
							]}
						/>

						<FormControl>
							<Input type="text" placeholder="Phase" />
						</FormControl>

						<FormControl>
							<Input type="text" placeholder="Unit" />
						</FormControl>
					</Stack>
				</form>
				<Button>Upload</Button>
			</VStack>
		</>
	);
};

const AvatarIcon = ({ user }: { user: User | undefined }): JSX.Element => {
	if (!user) return <RxAvatar />;
	return <Avatar size="xs" src={user?.picture} name={user.name ?? "User"} />;
};
