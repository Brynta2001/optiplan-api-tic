import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../auth/auth.module';
import { BoardsModule } from '../boards/boards.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    AuthModule,
    BoardsModule,
  ],
})
export class SeedModule {}
