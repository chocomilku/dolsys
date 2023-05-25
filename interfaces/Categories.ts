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

export class Category {
	readonly id: number;
	name: string;
	code?: string;
	scope_level?: string;
	constructor(id: number, name: string, code?: string, scope_level?: string) {
		this.id = id;
		this.name = name;
		this.code = code;
		this.scope_level = scope_level;
	}

	public value = () => {
		return `${this.id}${this.code && `-${this.code}`}`;
	};

	public label = () => {
		return `${this.name} ${this.scope_level && `${this.scope_level}`}`;
	};
}
