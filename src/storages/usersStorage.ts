// storages/usersStorage.js
// This class lets us simulate interacting with a database.
class UsersStorage {
	public storage: Object;
	public id: any;
	constructor() {
		this.storage = {};
		this.id = 0;
	}

	addUser({ firstName, lastName }) {
		const id = this.id;
		this.storage[id] = { id, firstName, lastName };
		this.id++;
	}

	getUsers() {
		return Object.values(this.storage);
	}

	getUser(id: string) {
		return this.storage[id];
	}

	updateUser(
		id: string,
		{ firstName, lastName }: { firstName: string; lastName: string },
	) {
		this.storage[id] = { id, firstName, lastName };
	}

	deleteUser(id: string) {
		delete this.storage[id];
	}
}
// Rather than exporting the class, we can export an instance of the class by instantiating it.
// This ensures only one instance of this class can exist, also known as the "singleton" pattern.
export default new UsersStorage();
