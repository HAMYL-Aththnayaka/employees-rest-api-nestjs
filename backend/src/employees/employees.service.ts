import { Injectable } from '@nestjs/common';
import {Prisma} from '@prisma/client'
import { DatabaseService } from '../database/database.service';
import {Throttle,SkipThrottle} from '@nestjs/throttler';



@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService:DatabaseService){}
 async create(createEmployeeDto: Prisma.EmplooyeeCreateInput) {
    return this.databaseService.emplooyee.create({
      data:createEmployeeDto
    });
  }

 async findAll(role?:"INTERN"|"ENGINEER"|"ADMIN") {
    if(role){
      return this.databaseService.emplooyee.findMany({
      where:{
        role,
      }
    });
  }
    return this.databaseService.emplooyee.findMany();
  }

 async  findOne(id: number) {
    return this.databaseService.emplooyee.findUnique({
      where:{
        id,
      }
    });
  }

 async  update(id: number, updateEmployeeDto: Prisma.EmplooyeeUpdateInput) {
    return this.databaseService.emplooyee.update({
      where:{
        id,
      },
      data:updateEmployeeDto
    })
  }

 async remove(id: number) {
    return this.databaseService.emplooyee.delete({
      where:{
        id,
      }
    });
  }
}
