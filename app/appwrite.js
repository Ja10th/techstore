import { Client, Databases, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6720b663002162da98b0'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);

export { ID } from 'appwrite';
