import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVectorSupport implements MigrationInterface {
  name = 'AddVectorSupport1748363994925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
    await queryRunner.query(`
      CREATE TABLE file_chunk (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        embedding vector(1536)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS file_chunk;`);
  }
}

