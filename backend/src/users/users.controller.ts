import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import {UsersService} from './users.service';

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
    constructor(private readonly usersService : UsersService){}

    @Get() //  -> get/users or /users?role=value  ---this is a queryParameter ---
    findAll(@Query() role?:"INTERN" | "ENGINEER" | "ADMIN") {
        return this.usersService.findAll(role)
    }

    @Get(':id')//get/users/:id
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);//+id is a uranaric just as parseINT(id) connvert string to number
    }

    @Post()
    create(@Body() user: {
        name: string,
        email: string,
        role: "INTERN" | "ENGINEER" | "ADMIN"}) {
        return this.usersService.create(user);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {
        name: string,
        email: string,
        role: "INTERN" | "ENGINEER" | "ADMIN"}) {
        return this.usersService.update(+id,userUpdate)
    }

    @Delete(':id')
    removeOne(@Param() id: string) {
        return this.usersService.deleteOne(+id);
    }
}

