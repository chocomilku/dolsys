export interface Categories {
	id: number;
	name: string;
	code?: string;
	scope_level?: string;
}

export type CategoriesWithoutID = Omit<Categories, "id">;

export interface ICategoryOptions {
	value: string;
	label: string;
}
