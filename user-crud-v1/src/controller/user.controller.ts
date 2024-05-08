import { Request, Response } from "express";
import { UserService } from "../service/user.service";

/*
 * A controller to handle the user CRUD operations from RESTful API
 * getAllUsers: A method to retrieve all users requested from HTTP GET
 * getUserById: A method to retrieve a single user by id requested from HTTP GET
 * createUser: A method to create a new user from request body requested from HTTP POST
 * updateUser: A method to update a user by id from request url and body requested from HTTP PUT
 * deleteUser: A method to delete a user by id from request url requested from HTTP DELETE
 */
export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // A method to retrieve all users requested from HTTP GET
    public getAllUsers = async (req: Request, res: Response): Promise<void> => {
        const users = await this.userService.getAllUsers();
        res.json(users);
    }

    // A method to retrieve a single user by id requested from HTTP GET
    public getUserById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const user = await this.userService.getUserById(parseInt(id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }

    // A method to create a new user from request body requested from HTTP POST
    public createUser = async (req: Request, res: Response): Promise<void> => {
        const { name, email } = req.body;
        const user = await this.userService.createUser(name, email);
        res.status(201).json(user);
    }

    // A method to update a user by id from request url and body requested from HTTP PUT
    public updateUser = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await this.userService.updateUser(parseInt(id), name, email);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }

    // A method to delete a user by id from request url requested from HTTP DELETE
    public deleteUser = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const user = await this.userService.deleteUser(parseInt(id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    }

}