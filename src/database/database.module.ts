import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  controllers: [],
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): TypeOrmModuleOptions => {
        return {
          type: 'better-sqlite3',
          database: process.env.DB_FILE ?? './test.db',
        };
      }
    })
  ],
  providers: [],
})
export class DatabaseModule { }
