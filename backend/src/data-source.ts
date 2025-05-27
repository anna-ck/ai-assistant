import { DataSource } from 'typeorm';
import { FileChunk } from './files/entities/file-chunks.entity';
import { AddVectorSupport } from './migrations/1748363994925-AddVectorSupport';
import { File } from './files/entities/file.entity';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ai-db',
  entities: [FileChunk, File],
  migrations: [AddVectorSupport],
  synchronize: false,
});
