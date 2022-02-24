/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Retrieves all users who liked a tuit from the database
     * @param {Tuit} tid Instance of tuit to be searched from the database
     * @returns Promise To be notified when the users are retrieved from the database
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Retrieves all users who liked a tuit from the database
     * @param {User} uid Instance of user to be searched from the database
     * @returns Promise To be notified when the tuits are retrieved from the database
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Inserts like instance into the database
     * @param {User} uid Instance of user who likes tuit into the database
     * @param {Tuit} tid Instance of tuit liked into the database
     * @returns Promise To be notified when user likes a tuit is inserted into the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Removes likes relation from the database.
     * @param {User} uid Instance of user who liked tuit into the database
     * @param {Tuit} tid Instance of tuit liked into the database
     * @returns Promise To be notified when user unlikes a tuit is removed from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
}