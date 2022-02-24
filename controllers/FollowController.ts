/**
 * @file Controller RESTful Web service API for follow resource
 */
import FollowDao from "../daos/FollowDao";
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/follows/:uid2 to create a new follow relation from user1 to user2 instance</li>
 *     <li>DELETE /api/users/:uid1/unfollows/:uid2 to remove a follow relation from user1 to user2 instance</li>
 *     <li>GET /api/users/:uid/following to retrieve all following of user instance</li>
 *     <li>GET /api/users/:uid/followers to retrieve all followers of user instance</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing message CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            // RESTful User Web service API
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.followController.userUnfollowsUser);
            app.get("/api/users/:uid/following", FollowController.followController.findFollowing);
            app.get("/api/users/:uid/followers", FollowController.followController.findFollowers);
        }
        return FollowController.followController;
    }

    private constructor() {}
    /**
     * Creates a new follow instance
     * @param {Request} req Represents request from client, including user1 id user2 id
     * for the new follow to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
            FollowController.followDao
            .userFollowsUser(req.params.uid1, req.params.uid2)
                .then(follow => res.json(follow));

    /**
     * Removes a follow instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid1 and parameter uid2 identifying the primary key of the follow to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
            FollowController.followDao
            .userUnfollowsUser(req.params.uid1, req.params.uid2)
                .then(status => res.json(status));

    /**
     * Retrieves the list of followers of user's primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user whose followers to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the follows that matches the user ID
     */
    findFollowers = (req: Request, res: Response) =>
            FollowController.followDao
            .findFollowers(req.params.uid)
                .then(follows => res.json(follows));

    /**
     * Retrieves the list of following of user's primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user whose following to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the follows that matches the user ID
     */
    findFollowing = (req: Request, res: Response) =>
            FollowController.followDao
            .findFollowing(req.params.uid)
                .then(follows => res.json(follows));

};
