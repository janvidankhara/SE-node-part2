/**
 * @file Controller RESTful Web service API for bookmark resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark from user to tuit instance</li>
 *     <li>DELETE /api/users/:uid/unbookmarks/:tid to remove all bookmarked tuit by user</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the bookmarks instances made by user</li>
 *     <li>GET /api/tuits/:tid/bookmarks to retrieve all the users who bookmarked a tuit instance</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing message CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            // RESTful User Web service API
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUsers);
            app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUsersWhoBookmarkedTuits);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Creates a new bookmark instance
     * @param {Request} req Represents request from client, including user1 id user2 id
     * for the new bookmark to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Removes a bookmark instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid and parameter tid identifying the primary key of the bookmark to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid,req.params.tid)
            .then(status => res.json(status));

    /**
     * Retrieves the list of tuits bookmarked by user's primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the bookmark to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the bookmarks that matches the user ID
     */
    findAllTuitsBookmarkedByUsers = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUsers(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Retrieves the list of users who bookmarked a tuit by primary key
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the bookmark to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the bookmarks that matches the tuit ID
     */
    findAllUsersWhoBookmarkedTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersWhoBookmarkedTuits(req.params.tid)
            .then(bookmarks => res.json(bookmarks));
};