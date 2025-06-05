import { Client, Storage } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('68307b20003484e50a8e'); 

const storage = new Storage(client);


export { client, storage };

