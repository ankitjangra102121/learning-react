import conf from "../conf/conf.js";
import { Client, ID, TablesDB, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      );
    } catch (error) {
      console.error("createPost error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        },
      );
    } catch (error) {
      console.error("updatePost error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );
      return true;
    } catch (error) {
      console.error("deletePost error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        slug,
      );
    } catch (error) {
      console.error("getPost error", error);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows(
        conf.appwriteDatabaseId,
        conf.appwriteTableId,
        queries,
      );
    } catch (error) {
      console.error("getPosts error", error);
      return null;
    }
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.error("uploadFile error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("deleteFile error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
