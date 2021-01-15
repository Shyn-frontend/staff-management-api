import * as path from 'path';

export default class ConfigService {
  static init() {
    const mode = process.env.NODE_ENV || 'development';
    const _path = `${path.join(__dirname, '../../../.env')}.${mode}`;
    require('dotenv-safe').config({ path: _path });
  }
}