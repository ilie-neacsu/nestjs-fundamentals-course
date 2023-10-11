import { DynamicModule, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { DATA_SOURCE } from './database.constants';

@Module({ })
export class DatabaseModule {
    static register(options: DataSourceOptions): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: DATA_SOURCE,
                    useValue: new DataSource(options)
                }
            ]
        }
    }
}
