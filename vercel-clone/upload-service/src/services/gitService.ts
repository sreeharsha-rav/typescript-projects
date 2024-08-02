import { ensureDir } from 'https://deno.land/std/fs/ensure_dir.ts';
import { generateId } from '../utils/idGenerator.ts';

/**
 * Clones a repository from the given URL.
 * 
 * TODO: Abort creating the output folder if the git clone operation fails.
 * 
 * @param {string} repoUrl - The URL of the repository to clone.
 * @returns {Promise<string>} - A promise that resolves to the folder ID of the cloned repository.
 * @throws {Error} - If the git clone operation fails.
 */
export async function cloneRepository(repoUrl: string): Promise<string> {
    const folderId = generateId();
    const outputFolder = `./output/${folderId}`;

    await ensureDir(outputFolder);

    const command = new Deno.Command("git", {
        args: ["clone", repoUrl, outputFolder],
    });

    const { code, stderr } = await command.output();

    if (code !== 0) {
        const errorOutput = new TextDecoder().decode(stderr);
        throw new Error(`Git clone failed: ${errorOutput}`);
    }

    return folderId;
}