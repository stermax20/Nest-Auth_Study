import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

class OrmConfig {
  constructor(private configService: ConfigService) {}

  async getOrmConfig(): Promise<TypeOrmModuleOptions> {
    const commonConf = {
      SYNCHRONIZE: false,
      ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
      MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
      MIGRATIONS_RUN: false,
    };

    const ormconfig: TypeOrmModuleOptions = {
      name: 'default',
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      logging: true,
      synchronize: commonConf.SYNCHRONIZE,
      entities: commonConf.ENTITIES,
      migrations: commonConf.MIGRATIONS,
      migrationsRun: commonConf.MIGRATIONS_RUN,
    };

    return ormconfig;
  }
}

export { OrmConfig };
