/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of bookmarked tuit
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}
    /**
     * Inserts bookmark instance into the database
     * @param {User} uid Instance of user to be inserted into the database
     * @param {Tuit} tid Instance of tuit to be inserted into the database
     * @returns Promise To be notified when user bookmarked tuit is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});

    /**
     * Removes bookmarked tuit from the database.
     * @param {User} uid Instance of user to be removed from the database
     * @param {Tuit} tid Instance of tuit to be removed from the database
     * @returns Promise To be notified when user is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy:uid, bookmarkedTuit:tid});

    /**
     * Retrieves all bookmarked tuits by the given user
     * @param {User} uid Instance of user to be searched from the database
     * @returns Promise To be notified when the users are retrieved from the database
     * database
     */
    findAllTuitsBookmarkedByUsers = async (uid: string): Promise<Bookmark[]> =>
            BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Retrieves all users who bookmarked a tuit
     * @param {Tuit} tid Instance oftuit to be searched from the database
     * @returns Promise To be notified when the users are retrieved from the database
     * database
     */
    findAllUsersWhoBookmarkedTuits = async (tid: string): Promise<Bookmark[]> =>
            BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedBy")
            .exec();
};