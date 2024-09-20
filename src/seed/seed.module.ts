import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../auth/auth.module';
import { StatesModule } from '../states/states.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [AuthModule, StatesModule],
})
export class SeedModule {}
