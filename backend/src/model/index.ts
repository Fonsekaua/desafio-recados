import { Prisma } from "../../prisma/generated/client"
import { prisma } from "../libs/prisma"


export const findUnique = async (id: string) => {
    try{

        const numericId = Number(id)

        if(isNaN(numericId)){
            throw new Error("ID inválido")
        }

        const message = await prisma.recados.findUnique({
            where: {
                id: numericId
            }
        })

        return message;

    }catch(err){

        console.log(err)

        throw err
    }
}

export const create = async(data: Prisma.RecadosCreateInput) => {
    try{
        const message = await prisma.recados.create({
        data
    })
        return message;
    }catch(err){
        return err
    }
}
export const update = async(id: string) => {
    try{
        const numericId = Number(id)
        if(isNaN(numericId)){
            throw new Error("ID inválido")
        }
        const search = await findUnique(id)

        if(!search){
            throw new Error("Recado não encontrado")
        }
        if(search.lido) {
            throw new Error("Recado já foi lido!!")
        }
        const updateMessage = await prisma.recados.update({
            where: {
                id: search.id
            },
            data: {
                lido: true
            }
        })

        return updateMessage;

    }catch(err){
        console.log(err)
        throw err
    }
}

export const findMany = async() => {
    try{
        const message = await prisma.recados.findMany({
            orderBy: {
                id:"asc"
            }
        })
        return message;
    }catch(err){
        console.log(err);
        return err;
    }
}
export const findManyRead = async() => {
    try{
        const message = await prisma.recados.findMany({
            orderBy: {
                id:"asc"
            },
            where: {
                lido: true
            }
        })
        return message;
    }catch(err){
        console.log(err);
        return err;
    }
}
export const findManyUnread = async() => {
    try{
        const message = await prisma.recados.findMany({
            orderBy: {
                id:"asc"
            },
            where: {
                lido: false
            }
        })
        return message;
    }catch(err){
        console.log(err);
        return err;
    }
}
export const del = async(id: string) => {
    try{
        const numericId = Number(id)
        if(isNaN(numericId)){
            throw new Error("ID inválido")
        }
        const search = await findUnique(id)

        if(!search){
            throw new Error("Recado não encontrado")
        }

        const deleteMessage = await prisma.recados.delete({
            where: {
                id: search.id
            }
        })

        return deleteMessage;

    }catch(err){
        console.log(err)
        throw err
    }
}