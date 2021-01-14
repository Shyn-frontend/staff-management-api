import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseBoolPipe } from 'src/shared/pipes/parse-boolean.pipe';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('UserEntity')
export class UserController {
  // @Get(':id')
  // findOne(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('sort', ParseBoolPipe) sort: boolean
  // ) {
  //   return 'Get single user';
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   console.log(createUserDto);
  //   return 'create user';
  // }
}
