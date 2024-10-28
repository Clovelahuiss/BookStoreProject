import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Remonte pour inclure tous les dossiers parents sinon probleme de chemin d'acces
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
