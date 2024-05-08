import { pool } from "../db";
import { User } from "../model/userModel";

/*
 * A class for user repository that interacts with the database
 * createUser: A method to create a new user and add it to the database
 * getAllUsers: A method to retrieve all users from the database
 * getUserById: A method to retrieve a single user by id from the database
 * updateUser: A method to update a user in the database
 * deleteUser: A method to delete a user from the database
 * getLastUserId: A method to get the last user id
 */
export class UserRepository {
    // A method to create a new user and add it to the database
    public async createUser(name: string, email: string): Promise<User> {
        // Create new user id from last id + 1
        const newId: number = await this.getLastUserId() + 1;
    
        // Create a new user object
        const newUser: User = {
        id: newId,
        name: name,
        email: email,
        };
    
        // Add the new user to the database
        await pool.query(
        'INSERT INTO users (id, name, email) VALUES ($1, $2, $3)',
        [newUser.id, newUser.name, newUser.email]
        );
    
        return newUser;
    }
    
    // A method to retrieve all users from the database
    public async getAllUsers(): Promise<User[]> {
        const { rows } = await pool.query('SELECT * FROM users');
    
        return rows;
    }
    
    // A method to retrieve a single user by id from the database
    public async getUserById(id: number): Promise<User | undefined> {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
        return rows[0];
    }
    
    // A method to update a user in the database
    public async updateUser(id: number, name: string, email: string): Promise<User | undefined> {
        const result = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    
        return result.rows[0];
    }
    
    // A method to delete a user from the database
    public async deleteUser(id: number): Promise<User | undefined> {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    
        return result.rows[0];
    }
    
    // A method to get the last user id
    private async getLastUserId(): Promise<number> {
        const { rows } = await pool.query('SELECT id FROM users ORDER BY id DESC LIMIT 1');
    
        return rows.length > 0 ? rows[0].id : 0;
    }
}