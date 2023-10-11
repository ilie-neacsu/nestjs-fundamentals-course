import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { DataSource } from 'typeorm';


@Module({
    imports: [ TypeOrmModule.forFeature([Coffee, Flavor, Event]) ],
    controllers: [ CoffeesController ],
    providers: [
        CoffeesService,
        {
            provide: COFFEE_BRANDS,
            useFactory: async (dataSource: DataSource): Promise<string[]> => {
                const coffeeBrands: { id: number, brand: string}[] = await dataSource.query(
                    'SELECT * FROM coffee_brands')

                return coffeeBrands.map(entry => entry.brand);
            },
            inject: [DataSource]
        },
    ],

    exports: [ CoffeesService ]
})
export class CoffeesModule { }
