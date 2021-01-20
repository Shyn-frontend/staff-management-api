import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
