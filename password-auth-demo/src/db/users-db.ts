import { User } from "../model/user.model";

const users: User[] = [
    {
        id: 1,
        name: 'Alice',
        password: 'password123'
    },
    {
        id: 2,
        name: 'Bob',
        password: 'password456'
    }
];

export const getUserByName = async (name: string): Promise<User | undefined> => {
    return users.find(user => user.name === name);
};

export const getUserById = async (id: number): Promise<User | undefined> => {
    return users.find(user => user.id === id);
};

export const createUser = async (name: string, password: string): Promise<User> => {
    const id = users.length + 1;
    const newUser = { id, name, password };

    users.push(newUser);

    return newUser;
};

export const updateUser = async (user: User): Promise<User | undefined> => {
    const index = users.findIndex(u => u.id === user.id);
    users[index] = user;

    return user;
};

export const deleteUser = async (id: number): Promise<User | undefined> => {
    const index = users.findIndex(user => user.id === id);
    const deletedUser = users.splice(index, 1)[0];

    return deletedUser;
}
