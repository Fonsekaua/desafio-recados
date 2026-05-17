import { Router } from "express";
import * as controller from "../controller";

const app = Router();
app.get('/ping',controller.ping)
app.get('/messages', controller.findMany)
app.get('/messages/read', controller.findManyRead)
app.get('/messages/unread', controller.findManyUnread)
app.post('/messages', controller.create)
app.patch('/messages/:id/read', controller.update)
app.delete('/messages/:id', controller.del)


export default app