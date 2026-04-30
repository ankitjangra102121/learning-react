import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (user) {
        return await this.login({ email, password });
      }

      return user;
    } catch (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      console.warn("No active session");
      return null;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions(); // better than "current"
    } catch (error) {
      console.error("Logout error:", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
