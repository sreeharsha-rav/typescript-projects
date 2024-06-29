import Link from "next/link";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

type User = {
    id: number;
    name: string;
};

async function getBlogs() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return response.json();
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

async function getUsers() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

const Blogs = async() => {
    const [blogs, users] = await Promise.all([getBlogs(), getUsers()]);

    return (
        <div>
            <h1 className="text-4xl font-bold">Blogs</h1>

            <h2 className="text-2xl font-semibold mt-5">Authors</h2>
            <ul className="flex flex-wrap">
                {users.map((user: User) => (
                    <li key={user.id} className="border p-4 rounded-md p-2 m-2 hover:bg-gray-100 hover:text-blue-500">
                        <h4 className="text-xs">{user.name}</h4>
                    </li>
                ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-5">Posts</h2>
            <ul>
                {blogs.map((post: Post) => (
                    <Link key={post.id} href={`/Post/${post.id}`}>
                        <li className="border p-4 rounded-md my-2 cursor-pointer hover:bg-gray-100 hover:text-blue-500">
                            <h4 className="text-lg font-medium hover:underline">{post.title}</h4>
                            <p>{post.body}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Blogs;