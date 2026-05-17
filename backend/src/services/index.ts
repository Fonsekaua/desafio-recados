import { createMessageSchema } from "../libs/zod"
import * as model from "../model"

export const create = async(titulo: string, descricao: string) => {

    const result = createMessageSchema.safeParse({
        titulo,
        descricao
    })

    if(!result.success){
        const error = result.error.format()

        console.log(error)

        return {
            success: false,
            error
        }
    }
    const message = await model.create(result.data);

        return {
            sucess: true,
            message
        }
}

export const update = async(id: string) => {
    try{
        const updateMessage = await model.update(id);
        return updateMessage
    }catch(err){
        console.log(err)
        throw err
    }
}

export const findMany = async() => {
    try{
        const manyMessages = await model.findMany()
        return manyMessages;

    }catch(err){
        console.log(err);
        return err;
    }
}
export const findManyRead = async() => {
    try{
        const manyMessagesRead = await model.findManyRead()
        return manyMessagesRead;

    }catch(err){
        console.log(err);
        return err;
    }
}
export const findManyUnread = async() => {
    try{
        const manyUnread = await model.findManyUnread()
        return manyUnread;

    }catch(err){
        console.log(err);
        return err;
    }
}
export const del = async(id: string) => {
    try{
        const deleteMessage = await model.del(id);
        return deleteMessage;
    }catch(err){
        console.log(err)
        throw err
    }
}