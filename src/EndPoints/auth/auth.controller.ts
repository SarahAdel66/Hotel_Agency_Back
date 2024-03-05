import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegAuthDto } from './dto/reg-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserRoles } from './roles.decorator';
import { Role } from './roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('reg')
  Reg(@Body() regAuthDto: RegAuthDto) {
    return this.authService.Reg(regAuthDto);
  }
  @UsePipes(ValidationPipe)
  @Post('login')
  Login(@Body() loginAuthDto: LoginAuthDto,@Res({passthrough:true}) res) {
    return this.authService.Login(loginAuthDto,res);
  }
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
  @UserRoles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() regAuthDto: RegAuthDto) {
    return this.authService.update(+id, regAuthDto);
  }
  @UserRoles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
