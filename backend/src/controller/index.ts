import { RequestHandler } from "express"
import * as model from "../model"
import * as service from "../services"
import { Prisma } from "../../prisma/generated/client"

export const ping:RequestHandler = (req,res) => {
    res.json({pong: true})
}
export const create:RequestHandler = async(req,res) => {
    try{
        const {titulo, descricao} = req.body;

        if(!titulo || !descricao){
            throw new Error("titulo ou descrição inválido")
        }
        const message = await service.create(titulo,descricao);

        res.json(message)
        console.log("message: ",message)

    }catch(err){

    if(err instanceof Error){

        console.log(err.message)

        return res.json({
            erro: err.message
        })
    }

    return res.json({
        erro: "Erro desconhecido"
    })
}
}
export const update:RequestHandler = async(req,res) => {
    try{
        const {id} = req.params as {id: string}
        if(!id) {
            throw new Error("ID inválido")
        }
        const updateMessage = await service.update(id);
        res.json({message: updateMessage})

    }catch(err){

    if(err instanceof Error){

        console.log(err.message)

        return res.json({
            erro: err.message
        })
    }

    return res.json({
        erro: "Erro desconhecido"
    })
}
}
export const findMany:RequestHandler = async(req,res) => {
    try{
        const messages = await service.findMany()
        res.json(messages)
        console.log("messages: ",messages)
    }catch(err){

    if(err instanceof Error){

        console.log(err.message)

        return res.json({
            erro: err.message
        })
    }

    return res.json({
        erro: "Erro desconhecido"
    })
}
}
export const findManyRead:RequestHandler = async(req,res) => {
    try{
        const messages = await service.findManyRead()
        res.json(messages)
        console.log("messages: ",messages)
    }catch(err){
        res.json({erro: "Erro no controller"})
        console.log("Ocorreu um erro:",err)
    }
}
export const findManyUnread:RequestHandler = async(req,res) => {
    try{
        const messages = await service.findManyUnread()
        res.json(messages)
        console.log("messages: ",messages)
    }catch(err){

    if(err instanceof Error){

        console.log(err.message)

        return res.json({
            erro: err.message
        })
    }

    return res.json({
        erro: "Erro desconhecido"
    })
}
}

export const del:RequestHandler = async(req,res) => {
        try{
        const {id} = req.params as {id: string}
        if(!id) {
            throw new Error("ID inválido")
        }
        const deleteMessage = await service.del(id);
        res.json({message: deleteMessage})
        
    }catch(err){

    if(err instanceof Error){

        console.log(err.message)

        return res.json({
            erro: err.message
        })
    }

    return res.json({
        erro: "Erro desconhecido"
    })
}
}