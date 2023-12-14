import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stagesService.create(createStageDto);
  }

  @Get()
  findAll() {
    return this.stagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.stagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateStageDto: UpdateStageDto) {
    return this.stagesService.update(id, updateStageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.stagesService.remove(id);
  }
}
