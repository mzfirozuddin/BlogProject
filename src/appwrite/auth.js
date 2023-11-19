import config from "../config/config";
import {Client, Account, ID} from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call login() method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
            
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    // Get the currently logged in user.
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();   // delete all sessions
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;