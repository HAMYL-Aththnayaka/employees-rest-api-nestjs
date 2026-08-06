import { ConsoleLogger, Injectable } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import * as fs from 'fs';
import {promises as fsPromises} from 'fs';
import * as path from 'path';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
    async logtofile(entry){
        const formattedEntry = `${Intl.DateTimeFormat('en-Us',{
            dateStyle:'short',
            timeStyle:'short',
            timeZone:'Asia/Colombo',
        }).format(new Date())}\t${entry}\n`

        try{
            //if already does not exists file path
            if(!fs.existsSync(path.join(__dirname,'..','..','logs'))){
                //makes a new directory
                await fsPromises.mkdir(path.join(__dirname,'..','..','logs'))
            }
            //if already exists

            // logs : dirname eka
            //myLogFile: file name eka
            await fsPromises.appendFile(path.join(__dirname,'..','..','logs','myLogFile.log'),formattedEntry)
        }catch(err){
            if(err instanceof Error){
                console.log(err.message);
            }
        }
    }

    //log ekk hadanawa
    log(message:any,context?:string){
    //text file ekaka log ekak liyawenawa
        const entry = `${context}\t${message}`

        //need to use this becauese the fucntion is inside the same class
        //if it is outside the class we dont need to use the key word "this"
        this.logtofile(entry);
        super.log(message,context)
    }

    error(message:any,stackContext?:string){
        const entry = `${stackContext}\t${message}`
        this.logtofile(entry);
        super.error(message,stackContext)
    }
}
