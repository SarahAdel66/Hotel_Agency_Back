import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomWithDto } from './dto/rooms.dto';
import { UserRoles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }
  @UserRoles(Role.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() room: RoomWithDto) {
    return this.roomsService.create(room);
  }

  @Get()  // to test http://localhost:3000/rooms?minPrice=200&maxPrice=300
  async findAll(@Query('minPrice') minPrice?: number, @Query('maxPrice') maxPrice?: number) {

    if (minPrice && maxPrice) {
      const filteredRooms = await this.roomsService.findRoomsByPriceRange(minPrice, maxPrice);
      return filteredRooms;
    }
    else {

      return this.roomsService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }


  @UserRoles(Role.Admin)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() room: RoomWithDto) {
    return this.roomsService.update(+id, room);
  }
  @UserRoles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
