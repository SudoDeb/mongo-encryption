import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './common/configuration';
import { CustomerModule } from './customers/customers.module';
import { getSchemaMap } from './common/utils/encryption-schema';
import { getOrCreateDataKey } from './common/utils/data-enc-key';
import { getOrCreateLocalMasterKey } from './common/utils/master-key';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes it available everywhere
      load: [configuration], // loads from custom config file
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('database.mongodb.mongoUri')
        const keyVaultNamespace = configService.get<string>('database.mongodb.autoEncryptionOptions.keyVaultNamespace');
        const keyId = await getOrCreateDataKey(uri as string,keyVaultNamespace as string,configService.get<string>('database.mongodb.autoEncryptionOptions.keyAltName') as string,configService.get<string>('database.mongodb.autoEncryptionOptions.masterKeyPath') as string)
        return {
          uri,
          autoEncryption: {
            keyVaultNamespace,
            kmsProviders: {
              local: {
                key: getOrCreateLocalMasterKey(configService.get<string>('database.mongodb.autoEncryptionOptions.masterKeyPath') as string),
              },
            },
            schemaMap: getSchemaMap(keyId),
            extraOptions: {
              cryptSharedLibPath: configService.get<string>('database.mongodb.autoEncryptionOptions.cryptLibPath')
            }
          }
        };
      },
      inject: [ConfigService],
    }),
    CustomerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
