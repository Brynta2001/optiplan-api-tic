import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@ApiTags('States')
@ApiBearerAuth()
@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @ApiOperation({ summary: 'Create a new state' })
  @ApiCreatedResponse({
    description: 'State created successfully',
  })
  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @ApiOperation({ summary: 'Get all states' })
  @ApiResponse({
    status: 200,
    description: 'States found successfully',
  })
  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @ApiOperation({ summary: 'Get a state by id' })
  @ApiResponse({
    status: 200,
    description: 'State found successfully',
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.statesService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a state' })
  @ApiResponse({
    status: 200,
    description: 'State updated successfully',
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return this.statesService.update(id, updateStateDto);
  }

  @ApiOperation({ summary: 'Delete a state' })
  @ApiResponse({
    status: 200,
    description: 'State deleted successfully',
  })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.statesService.remove(id);
  }
}
