import { User } from "@auth0/auth0-react";
import {
	Avatar,
	Badge,
	Flex,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	Text,
} from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";
import Auth0LogButton from "../Auth0LogButton";

interface AvatarWithPopoverProps {
	user: User;
}

export const AvatarWithPopover = ({ user }: AvatarWithPopoverProps) => {
	return (
		<>
			<Popover>
				{({ onClose }) => (
					<>
						<PopoverTrigger>
							<Avatar
								size="md"
								name={user.name}
								src={user.picture}
								cursor="pointer"
								colorScheme="purple"
								showBorder={true}
								_hover={{ borderColor: "purple.500" }}
							/>
						</PopoverTrigger>
						<Portal>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverHeader>
									<Text fontWeight={"bold"} fontSize={"2xl"}>
										{user.name}
									</Text>
									<Text fontWeight={"light"}>{user.email}</Text>
									<Flex direction={"row"} gap={1} flexWrap={"wrap"}>
										{(user["dolsys/roles"] as string[]).map(
											(role: string, i) => {
												let color = "purple";

												if (role === "Admin") color = "green";
												if (role === "Editor") color = "blue";

												return (
													<Badge
														as={"div"}
														w="fit-content"
														colorScheme={color}
														variant="subtle"
														key={`role${i}-` + role}>
														{role}
													</Badge>
												);
											}
										)}
									</Flex>
								</PopoverHeader>
								<PopoverFooter>
									<Auth0LogButton
										label="Log Out"
										type="logout"
										icon={<CiLogout />}
										onClick={onClose}
										w={"full"}
									/>
								</PopoverFooter>
							</PopoverContent>
						</Portal>
					</>
				)}
			</Popover>
		</>
	);
};
