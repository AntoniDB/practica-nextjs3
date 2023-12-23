import { NextResponse } from "next/server";
import {prisma} from '../../../libs/prisma'

export async function GET(){
    const data = await prisma.task.findMany() //listar todos los elementos de la tabla tasks    
    return NextResponse.json(data)
}

export async function POST(request){
    const {title, description} = await request.json() //desestructurado  //title y description se pasan a la solicitud post mediante body
    const newTask = await prisma.task.create({
        data: {
            title,
            description,
        },
    })
    return NextResponse.json(newTask)
}