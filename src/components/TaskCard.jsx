"use client"

import { useRouter } from "next/navigation";

const TaskCard = ({datos}) => {

    const router = useRouter()

    return(
    <>
    <ul role="list" className="divide-y divide-gray-100" >
      {datos.map((response, index)=><li key={index} className="flex justify-between gap-x-6 py-5 hover:cursor-pointer hover:bg-slate-100 px-5" onClick={() => router.push('task/edit/' + response.id)}>
        <div className="flex min-w-0 gap-x-4">      
        <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{response.title}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{response.description}</p>
        </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{new Date(response.createdAt).toLocaleDateString()}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">ID <time dateTime="2023-01-23 13:23">{response.id}</time></p>
        </div>
        </li> )}
        </ul>
    </>
    )
}
export default TaskCard