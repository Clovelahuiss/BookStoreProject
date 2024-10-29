import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Assure-toi que ce chemin couvre bien toutes les entités
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
