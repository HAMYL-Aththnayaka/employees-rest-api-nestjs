import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe ,ValidationPipe } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users') // decorator//  /users --> this is the parent route
export class UsersController {
    /*
        GET  /users
        GET  /users/:id
        POST /users
        PATCH /users/:id
        DELETE /users/:id
    */
    //adding the service and injecting it to the controller 
    constructor(private readonly usersService: UsersService) { }

    @Get() //  -> get/users or /users?role=value  ---this is a queryParameter ---
    findAll(@Query() role?: "INTERN" | "ENGINEER" | "ADMIN") {
        return this.usersService.findAll(role)
    }

    @Get(':id')//get/users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);//+id is a uranaric just as parseINT(id) connvert string to number
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateuserDto: UpdateUserDto) {
        return this.usersService.update(id, updateuserDto)
    }

    @Delete(':id')
    removeOne(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.deleteOne(id);
    }
}

