import { VALID_GIT_HOSTS } from "../utils/constants.ts";

/**
 * Validates a Git URL by checking its format, host, and existence of the repository.
 */
export class GitUrlValidator {
    // Regular expression to match a Git URL.
    private static gitUrlPattern = /^(https?:\/\/)?([\w.@:/\-~]+)(\.git)?\/?$/;
    
    /**
     * Checks if the given URL is a valid Git URL.
     * 
     * @param url - The URL to validate.
     * @returns A promise that resolves to true if the URL is valid, and false otherwise.
     */
    static async isValid(url: string): Promise<boolean> {
        if (!this.gitUrlPattern.test(url)) {
            return false;
        }

        if (!this.hasValidHost(url)) {
            return false;
        }

        return await this.repoExists(url);      // this causes backpressure, future performance design change
    }

    /**
     * Checks if the given URL has a valid host.
     * 
     * @param url - The URL to check.
     * @returns True if the URL has a valid host, and false otherwise.
     */
    private static hasValidHost(url: string): boolean {
        try {
            const parsedUrl = new URL(url);
            return VALID_GIT_HOSTS.some(host => parsedUrl.hostname.includes(host));
        } catch {
            return false;
        }
    }

    /**
     * Checks if the repository exists at the given URL.
     * 
     * @param url - The URL of the repository to check.
     * @returns A promise that resolves to true if the repository exists, and false otherwise.
     */
    private static async repoExists(url: string): Promise<boolean> {
        const parsedRepo = this.parseGitHubUrl(url);
        if (!parsedRepo) {
            return false;
        }

        const { owner, repo } = parsedRepo;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'User-Agent': 'Deno'
                }
            });

            return response.status === 200;
        } catch {
            return false;
        }
    }

    /**
     * Parses a GitHub URL to extract the owner and repository name.
     * 
     * @param url - The GitHub URL to parse.
     * @returns An object containing the owner and repo if successful, null otherwise.
     */
    private static parseGitHubUrl(url: string): { owner: string; repo: string } | null {
        try {
            const parsedUrl = new URL(url);
            if (parsedUrl.hostname !== 'github.com') return null;

            const parts = parsedUrl.pathname.split('/').filter(Boolean);
            if (parts.length < 2) return null;

            return { 
                owner: parts[0], 
                repo: parts[1].replace('.git', '') 
            };
        } catch {
            return null;
        }
    }
}