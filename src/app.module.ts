import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutasModule } from './rutas/rutas.module';
import { ParaderosModule } from './paraderos/paraderos.module';
import { NodosModule } from './nodos/nodos.module';
import { BoletosModule } from './boletos/boletos.module';
import { HistoriasModule } from './historias/historias.module';
import { APP_GUARD } from '@nestjs/core';
import { SecurityGuard } from './guards/security.guard';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    RutasModule,
    ParaderosModule,
    NodosModule,
    BoletosModule,
    HistoriasModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: SecurityGuard },
  ],
})
export class AppModule {}