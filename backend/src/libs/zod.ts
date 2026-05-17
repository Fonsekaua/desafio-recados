import z from "zod";

export const createMessageSchema = z.object({
    titulo: z.string().nonempty("Título é obrigatório"),
    descricao: z.string().nonempty("Descrição é obrigatória")
})

