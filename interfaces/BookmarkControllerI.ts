import {Request, Response} from "express";
/**
 * @file Declares RESTful API for the resource bookmark
 */
export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUsers (req: Request, res: Response): void;
    findAllUsersWhoBookmarkedTuits (req: Request, res: Response): void;
};