import {Request, Response} from "express";
import Tuit from "../models/tuits/Tuit";

/**
 * @file Declares RESTful API for the resource tuit
 */
export default interface TuitControllerI {
    findAllTuits (req: Request, res: Response): void;
    findAllTuitsByUser (req: Request, res: Response): void;
    findTuitById (req: Request, res: Response): void;
    createTuitByUser (req: Request, res: Response): void;
    updateTuit (req: Request, res: Response): void;
    deleteTuit (req: Request, res: Response): void;
};