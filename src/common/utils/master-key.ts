import * as fs from 'fs';
import * as path from 'path';
import { randomBytes } from 'crypto';

export function getOrCreateLocalMasterKey(masterKeyPath: string) {
    const MASTER_KEY_PATH = path.resolve(masterKeyPath);//path for master key storing
    if (fs.existsSync(MASTER_KEY_PATH)) {
        console.log("Existing master key found, using that")
        return fs.readFileSync(MASTER_KEY_PATH);
    }

    // Must be 96 bytes for local KMS
    const newKey = randomBytes(96);
    console.log("No Existing master key found, generating one!")
    fs.writeFileSync(MASTER_KEY_PATH, newKey);
    return newKey;
}