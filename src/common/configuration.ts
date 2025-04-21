export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    mongodb: {
      mongoUri: generateMongoURI(),
      autoEncryptionOptions: {
        keyVaultNamespace: process.env.ENCRYPTION_KEYVAULT_NAMESPACE || 'encryption.__keyVault',
        keyAltName: process.env.ENCRYPTION_KEYALT_NAME || 'app-data-key',
        cryptLibPath: process.env.CRYPT_SHARED_LIB_PATH || './lib', // pass the path in env of mongo encryption lib
        masterKeyPath: process.env.MASTER_KEY_PATH || './master-key.txt'
      }
    }
  }
});

function generateMongoURI() {
  return process.env.MONGO_URI || 'mongodb://localhost:27017/'
}
