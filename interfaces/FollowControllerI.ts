import {Request, Response} from "express";
/**
 * @file Declares RESTful API for the resource follow
 */
export default interface FollowControllerI {
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    findFollowers (req: Request, res: Response): void;
    findFollowing (req: Request, res: Response): void;
};