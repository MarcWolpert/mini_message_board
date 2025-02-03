// storages/usersStorage.js
// This class lets us simulate interacting with a database.
interface IterableStorage {
	[key: string]: any;
	[Symbol.iterator](): Iterator<any>;
}
export interface userInfo {
	firstName: string;
	lastName: string;
	id: number;
	email: string;
	bio?: string;
}

class UsersStorage {
	public storage: IterableStorage;
	public id: any;
	constructor() {
		this.storage = {
			[Symbol.iterator]: () => {
				let index = 0;
				// 'this' here refers to the storage object.
				const keys = Object.keys(this);
				return {
					next: () => {
						if (index < keys.length) {
							return {
								value: this[keys[index++]],
								done: false,
							};
						} else {
							return { done: true };
						}
					},
				};
			},
		};
		//mocking here
		this.storage['0'] = {
			id: 0,
			firstName: 'a',
			lastName: 'a',
			email: 'a@a.com',
		};
		this.storage['1'] = {
			id: 1,
			firstName: 'b',
			lastName: 'b',
			email: 'b@b.com',
		};

		this.storage;
		this.id = 2;
	}

	addUser({ firstName, lastName, email, age, bio }) {
		const id = this.id;
		this.storage[id] = { id, firstName, lastName, email, age, bio };
		this.id++;
	}

	getUsers() {
		return Object.values(this.storage);
	}

	getUser(id: string) {
		return this.storage[id];
	}
	search(
		firstName: string | null,
		lastName: string | null,
		email: string | null,
	): Object | null {
		console.log(this.storage);
		//TODO: DOESN'T SEARCH RIGHT
		//gets all entries that arent the iterator
		const users = Object.values(this.storage).filter(
			(value) => typeof value === 'object',
		);
		const result = users.filter((user: userInfo) => {
			return (
				(user.firstName === firstName &&
					user.lastName === lastName) ||
				user.email === email
			);
		});
		return result.length ? result : null;
	}

	updateUser(
		id: string,
		{
			firstName,
			lastName,
			email,
			age,
			bio,
		}: {
			firstName: string;
			lastName: string;
			email: string;
			age: number;
			bio: string;
		},
	) {
		this.storage[id] = { id, firstName, lastName, email, age, bio };
	}

	deleteUser(id: string) {
		delete this.storage[id];
	}
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
export default new UsersStorage();
