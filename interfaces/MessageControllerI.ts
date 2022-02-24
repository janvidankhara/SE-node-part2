import {Request, Response} from "express";

/**
 * @file Declares RESTful API for the resource message
 */
export default interface MessageControllerI {
    userMessageUser(req: Request, res: Response): void;
    listSentMessages(req: Request, res: Response): void;
    listReceivedMessages(req: Request, res: Response): void;
    userDeletesMessage(req: Request, res: Response): void;
};


