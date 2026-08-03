import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post } from '@nestjs/common';

@Controller('users') // decorator//  /users --> this is the parent route
export class UsersController {
    /*
        GET  /users
        GET  /users/:id
        POST /users
        PATCH /users/:id
        DELETE /users/:id
    */
    @Get() // decorator -> get.users
    findAll() {
        return [];
    }

    @Get(':id')//get/users/:id
    findOne(@Param('id') id: string) {
        return { id }
    }

    @Post()
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }

    @Delete(':id')
    removeOne(@Param() id: string) {
        return { message: `${id} removes` };
    }
}

