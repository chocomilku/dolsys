import { db } from "../config/db";

export const countData = async (table: string) => {
	const totalItems = await db(table)
		.count({ count: "*" })
		.first();
	
	if (!totalItems || !totalItems.count)
		return 0;
	if (typeof totalItems.count === "string")
		return 0;
    
	return totalItems.count;

};