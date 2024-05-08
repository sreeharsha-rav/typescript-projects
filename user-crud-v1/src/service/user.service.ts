import { User } from "../model/userModel";
import { UserRepository } from "../repository/user.repository";

/*
 * A class for user service that interacts with the user repository
 * createUser: A method to create a new user and add it to the database
 * getAllUsers: A method to retrieve all users from the database
 * getUserById: A method to retrieve a single user by id from the database
 * updateUser: A method to update a user in the database
 * deleteUser: A method to delete a user from the database
 */
export class UserService {

    // A private property to hold the user repository
    private userRepository: UserRepository;
    
    constructor() {
        this.userRepository = new UserRepository();
    }
    
    public async createUser(name: string, email: string): Promise<User> {
        return this.userRepository.createUser(name, email);
    }
    
    public async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }
    
    public async getUserById(id: number): Promise<User | undefined> {
        return this.userRepository.getUserById(id);
    }

    public async updateUser(id: number, name: string, email: string): Promise<User | undefined> {
        return this.userRepository.updateUser(id, name, email);
    }

    public async deleteUser(id: number): Promise<User | undefined> {
        return this.userRepository.deleteUser(id);
    }

}