/**
 * @file Controller RESTful Web service API for messages resource
 */
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages/Message";
import {Express, Request, Response} from "express";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to create a new message from user1 to user2 instance</li>
 *     <li>GET /api/users/:uid/sent to retrieve all the messages instances sent by user</li>
 *     <li>GET /api/users/:uid/received to retrieve all the messages instances received by user</li>
 *     <li>DELETE /api/users/deletes/:mid to remove a particular message instance</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            // RESTful User Web service API
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userMessageUser);
            app.get("/api/users/:uid/sent", MessageController.messageController.listSentMessages);
            app.get("/api/users/:uid/received", MessageController.messageController.listReceivedMessages);
            app.delete("/api/users/deletes/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Creates a new message instance
     * @param {Request} req Represents request from client, including user1 id user2 id body
     * containing the JSON object for the new message to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userMessageUser = (req: Request, res: Response) =>
            MessageController.messageDao.userMessageUser(req.params.uid1,req.params.uid2, req.body)
                .then((message: Message) => res.json(message));

    /**
     * Retrieves the sent message by user's primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user's sent message to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the messages that matches the user ID
     */
    listSentMessages = (req: Request,res: Response) =>
            MessageController.messageDao.listSentMessages(req.params.uid)
                .then((messages: Message[]) => res.json(messages));

    /**
     * Retrieves the received message by user's primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user's received message to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the messages that matches the user ID
     */
    listReceivedMessages = (req: Request,res: Response) =>
                MessageController.messageDao.listReceivedMessages(req.params.uid)
                .then((messages: Message[]) => res.json(messages));

    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
            MessageController.messageDao.userDeletesMessage(req.params.mid)
                .then((status) => res.send(status));


};
