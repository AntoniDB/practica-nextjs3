"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const NewPage = ({params}) => {

    console.log(params)
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleOnChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleOnChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    useEffect(()=>{
        if(params.id){            
        fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
            setTitle(data.title)
            setDescription(data.description)
        })
        }
    },[])

const borrar = async () => {
    const data = await fetch(`/api/tasks/${params.id}`,{
        method: 'DELETE',
    })
    const dat = await data.json()
    router.refresh()
    router.push('/')
}

const onSubmit = async (e) =>{
    e.preventDefault()
    
    if(params.id){
        const ref = await fetch(`/api/tasks/${params.id}`,{
            method: 'PUT',
            body: JSON.stringify({title, description}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await ref.json()
        console.log(data)
    }else{
        const res = await fetch('/api/tasks',{
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        console.log(data)
    }
    router.refresh()
    router.push('/')
}

    return(
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={onSubmit} className="bg-slate-800 p-10 rounded w-1/4">
                <label htmlFor="title" className="font-bold text-sm text-white">Título de la tarea</label>
                <input type="text" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Titulo" id="title" onChange={handleOnChangeTitle} value={title}/>
                <label htmlFor="description" className="font-bold text-sm text-white">Descripción de la tarea</label>
                <textarea row="3" className="border border-gray-400 p-2 mb-4 w-full text-black" placeholder="Describe tu tarea" id="description" onChange={handleOnChangeDescription} value={description}/>
                <button type="submit" className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear</button>
                {params.id ? <button type="button" className="bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded ml-3" onClick={borrar}>Eliminar</button>:null}
            </form>
        </div>
    )
}
export default NewPage