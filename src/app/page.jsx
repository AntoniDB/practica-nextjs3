import TaskCard from "@/components/TaskCard"
import {prisma} from '../../src/libs/prisma'
import { NextResponse } from "next/server"

async function listTaks() {
  const ref = await prisma.task.findMany()
  return ref
  //  const req = await fetch('http://localhost:3000/api/tasks')
  //  const data = await req.json()
  //  return data
}

const HomePage = async () => {

  const datos = await listTaks()
    
  return(
    <div className="container mx-auto px-4">      
        <TaskCard datos={datos}/>
    </div>
  )
}
export default HomePage

