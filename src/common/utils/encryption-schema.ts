export function getSchemaMap(keyId) {
    return {
        'test.users': {
            bsonType: 'object',
            encryptMetadata: {
                keyId: [keyId],
            },
            properties: {
                name: {
                    encrypt: {
                        bsonType: 'string',
                        algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic',
                    },
                },
                password: {
                    encrypt: {
                        bsonType: 'string',
                        algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
                    },
                },
            },
        }
    }
}