import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
// import { UserRoles } from '../auth/roles.decorator';
// import { Role } from '../auth/roles.enum';
import { UserWithDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  // @UserRoles(Role.Admin)
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() user: UserWithDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UsePipes(ValidationPipe)
  // @UserRoles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UserWithDto) {//using PATCH
    return this.usersService.update(+id, user);
  }
  
  // @UserRoles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
