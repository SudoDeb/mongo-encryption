import { MongoClient, ClientEncryption } from 'mongodb';
import { getOrCreateLocalMasterKey } from './master-key';


export async function getOrCreateDataKey(mongoUri: string, keyVaultNamespace: string, keyAltName: string, masterKeyPath: string) {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const [dbName, collectionName] = keyVaultNamespace.split('.')
    const keyVault = client.db(dbName).collection(collectionName);
    const kmsProviders = {
        local: {
            key: getOrCreateLocalMasterKey(masterKeyPath),
        },
    };

    const existingKey = await keyVault.findOne({ keyAltNames: keyAltName });
    if (existingKey) {
        console.log('Existing Data encryption key found.')
        return existingKey._id;
    }
    const encryption = new ClientEncryption(client, {
        keyVaultNamespace,
        kmsProviders,
    });

    const dataKeyId = await encryption.createDataKey('local', {
        keyAltNames: [keyAltName],
    });

    console.log('Created new data encryption key');
    await client.close();
    return dataKeyId;
}
