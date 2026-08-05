import {CreateUserDto} from './create-user.dto';
import {PartialType} from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto){

}
//Create DTO → expects all required fields.
//Update DTO (PartialType) → every field is optional, and only the fields you send are checked.