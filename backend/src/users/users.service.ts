import { Injectable } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {NotFoundException} from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Yasas",
            "email": "yasas@y.com",
            "role": "INTERN"
        },
        {
            "id": 2,
            "name": "Kasun",
            "email": "kasun.p@y.com",
            "role": "ENGINEER"
        },
        {
            "id": 3,
            "name": "Nimal Silva",
            "email": "nimal.s@y.com",
            "role": "ADMIN"
        },
        {
            "id": 4,
            "name": "Amaya Fernando",
            "email": "amaya.f@y.com",
            "role": "INTERN"
        },
        {
            "id": 5,
            "name": "Tharindu Jay",
            "email": "tharindu.j@y.com",
            "role": "ENGINEER"
        },
        {
            "id": 6,
            "name": "Sahan Wijesinghe",
            "email": "sahan.w@y.com",
            "role": "ADMIN"
        },
        {
            "id": 7,
            "name": "Dilan Perera",
            "email": "dilan.p@y.com",
            "role": "INTERN"
        },
        {
            "id": 8,
            "name": "Ravindu Kumar",
            "email": "ravindu.k@y.com",
            "role": "ENGINEER"
        }
    ]

    findAll(role?: "INTERN" | "ENGINEER" | "ADMIN") {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role);
            if (rolesArray.length === 0){
                throw new NotFoundException("This is a Invalid Role !")
            }
            return rolesArray;
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(u => u.id === id);
        if(!user){
            throw new NotFoundException("User Not Found !"); 
        }
        return user;
    }

    create(createUserDto:CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1, ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }


    update(id: number, updateUserDto:UpdateUserDto) {
        this.users = this.users.map((u)=>{
            if(u.id === id){
                return {...u , ...updateUserDto}
            }
            return u;
        })
        return this.findOne(id);
    }

    deleteOne(id:number){
        const removeUser = this.findOne(id);
        this.users=this.users.filter(u=>u.id === id);

        return removeUser;
    }
}
