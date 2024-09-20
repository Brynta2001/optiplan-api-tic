import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@ApiBearerAuth()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @ApiOperation({ summary: 'Create default users for the API' })
  @Get('users')
  createUsers() {
    return this.seedService.createUsers();
  }

  @ApiOperation({ summary: 'Create default roles for the API' })
  @Get('roles')
  createRoles() {
    return this.seedService.createRoles();
  }

  @ApiOperation({ summary: 'Create default states for the API' })
  @Get('states')
  createStates() {
    return this.seedService.createStates();
  }
}
