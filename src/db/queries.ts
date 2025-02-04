import { pool, userInfo } from './pool';

export async function getUsers(): Promise<userInfo[][]> {
	//have to connect first
	try {
		let { rows } = await pool.query('SELECT * FROM messages');
		rows = rows as userInfo[][];
		//2d array so need to flatten it to an array of objects

		return rows as userInfo[][];
	} catch (error) {
		console.error('Error getting usernames.');
		throw Error;
	}
}

export async function getUser(id: number): Promise<userInfo> {
	//have to connect first
	try {
		const queryText = 'SELECT * FROM messages WHERE ID=$1';
		const values = [id];
		let { rows } = await pool.query(queryText, values);
		return rows[0];
	} catch (error) {
		console.error('Error getting usernames.');
		throw Error;
	}
}

export async function searchRecord(id: number, record: userInfo) {
	//two cases: Search by email and search by firstname&&lastname
	try {
		if (record?.firstname && record?.lastname) {
			const queryText =
				'SELECT * FROM messages WHERE firstname ILIKE $1 AND lastname ILIKE $2';
			const values = [record.firstname, record.lastname];
			const { rows } = await pool.query(queryText, values);
			return rows[0];
		} else if (record?.email) {
			const queryText = 'SELECT * FROM messages WHERE email ILIKE $1';
			const values = [record.email];
			const { rows } = await pool.query(queryText, values);
			return rows[0];
		} else {
			return null;
		}
	} catch (error) {
		console.error('Error: ', error);
		throw Error;
	}
}
export async function insertRecord(record: userInfo): Promise<void> {
	try {
		await pool.query(
			'INSERT INTO messages (firstname,lastname,email,age,bio) VALUES ($5)',
			Array(record),
		);
	} catch (error) {
		console.error('Error inserting into usernames.');
		throw Error;
	}
}

export async function deleteUser(id: number): Promise<void> {
	try {
		const queryText = 'DELETE FROM messages WHERE id=$1';
		const values = [id];
		await pool.query(queryText, values);
	} catch (error) {
		console.error('Error inserting into usernames.');
		throw Error;
	}
}

export async function updateUser(
	id: number,
	record: userInfo,
): Promise<void> {
	console.log(id, record);
	try {
		const queryText = `UPDATE messages 
			SET firstname = $1, lastname = $2, email = $3, age = $4, bio = $5 WHERE id = $6`;
		const values = [
			record.firstname,
			record.lastname,
			record.email,
			record.age,
			record.bio,
			id,
		];
		await pool.query(queryText, values);
	} catch (error) {
		console.error('Error inserting into usernames.');
		throw Error;
	}
}

export async function addUser(record: userInfo): Promise<void> {
	try {
		const queryText = ` INSERT INTO messages (firstname,lastname,email,age,bio) VALUES ($1,$2,$3,$4,$5)`;
		const values = [
			record.firstname,
			record.lastname,
			record.email,
			record.age,
			record.bio,
		];
		await pool.query(queryText, values);
	} catch (error) {
		console.error('Error: ', error);
		throw Error;
	}
}
