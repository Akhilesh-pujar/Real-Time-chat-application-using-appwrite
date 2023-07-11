import {Client, Databases} from 'appwrite'

export const PROJECT_ID= '64ad134379c1e051faf2'
export const DATABASE_ID='64ad195497f80e214042'
export const COLLECTION_ID='64ad19614d1243b9fae2'

const client = new Client();

client 
 .setEndpoint('https://cloud.appwrite.io/v1')
 .setProject('64ad134379c1e051faf2');


export const databases = new Databases(client);
   
export default client;
