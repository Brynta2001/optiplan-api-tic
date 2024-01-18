import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('users')
  createUsers() {
    return this.seedService.createUsers();
  }

  @Get('boards')
  createBoards() {
    return this.seedService.createBoards();
  }

}
