import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OpenaiModule } from './openai/openai.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
          ? Number.parseInt(process.env.DATABASE_PORT, 10)
          : 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: false
      }),
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options);

        // Push vector into length column type
        dataSource.driver.supportedDataTypes.push(
          'vector' as any,
        );
        dataSource.driver.withLengthColumnTypes.push(
          'vector' as any,
        );

        // Initialize datasource
        await dataSource.initialize();

        return dataSource;
      },  
    }),
    FilesModule,
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
