import { Client, Account, Databases, ID } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("67076062002dfca34948"); // Replace with your project ID

export const DB_ID = "6708fa24003c6440e8fc";
export const COLLECTION_ID = "6708fa2f0006eefaa473";

export const databases = new Databases(client);
