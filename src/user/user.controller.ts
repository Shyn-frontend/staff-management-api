import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseBoolPipe } from 'src/shared/pipes/parse-boolean.pipe';
import { CreateUserParamsDto } from './dto/create-user-params.dto';

@Controller('users')
@ApiTags('User')
export class UserController {
  // @Get(':id')
  // findOne(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Query('sort', ParseBoolPipe) sort: boolean
  // ) {
  //   return 'Get single user';
  // }

  // @Post()
  // create(@Body() createUserDto: CreateUserParamsDto) {
  //   console.log(createUserDto);
  //   return 'create user';
  // }
}
