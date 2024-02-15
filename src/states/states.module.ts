import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatesService } from './states.service';
import { StatesController } from './states.controller';
import { State } from './entities/state.entity';

@Module({
  controllers: [StatesController],
  providers: [StatesService],
  imports: [
    TypeOrmModule.forFeature([State])
  ],
})
export class StatesModule {}
