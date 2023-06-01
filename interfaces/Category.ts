export interface Category {
    /**
     * The ID of the category of the file.
     * @remarks This is the ID of the category of the file and it has an SQL data type of `int unsigned NOT NULL AUTO_INCREMENT`
     */
    id: number;

    /**
     * The name of the category of the file.
     * @remarks This is the name of the category of the file and it has an SQL data type of `text NOT NULL`
     */
    name: string;

    /**
     * The code of the category of the file.
     * @remarks This is the code of the category of the file and it has an SQL data type of `varchar(255) NOT NULL`
     */
    code: string;

    /**
     * The scope level of the category of the file.
     * @remarks This is the scope level of the category of the file and it has an SQL data type of `varchar(24) `
     */
    scope_level?: string;

    /**
     * The color of the category of the file.
     * @remarks This is the color of the category of the file and it has an SQL data type of `varchar(7) DEFAULT '#000000'`
     */
    color?: string;
}

export interface CategoryWithoutID extends Omit<Category, "id"> {}

export class CategoryOption  {
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
