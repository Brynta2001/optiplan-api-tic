import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@ApiBearerAuth()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('users')
  createUsers() {
    return this.seedService.createUsers();
  }

  @Get('roles')
  createRoles() {
    return this.seedService.createRoles();
  }

  @Get('states')
  createStates() {
    return this.seedService.createStates();
  }
}
