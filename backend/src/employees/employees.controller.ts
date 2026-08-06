import { Controller, Get, Post, Body, Patch, Param, Delete , Query} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import {Prisma} from '@prisma/client'
import { Throttle,SkipThrottle } from '@nestjs/throttler';
import {MyLoggerService} from '../my-logger/my-logger.service';

//to record the ip address
import {Ip} from "@nestjs/common"



@SkipThrottle()//thottle (rate) limit eka skip karanawa
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  //atana tiayana context eka metanin yawanwa
  private readonly logger = new MyLoggerService(EmployeesController.name)

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmplooyeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }
 
  @SkipThrottle({ default:false})//me method ekata ratelimit eka aye watenawa
  @Get()
  findAll(@Ip() ip:string,@Query('role')role?:"INTERN"|"ENGINEER"|"ADMIN") {
    
    //to loging the ip address + a message
    this.logger.log(`Request for All Employess\t ${ip}`)
    return this.employeesService.findAll(role);
  } 
 
  @Throttle({short:{ttl:1000,limit:1}})//methana new rate limit ekak danawa short kiana eka overright karala alut ekk danawa
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string,  @Body() updateEmployeeDto: Prisma.EmplooyeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
 