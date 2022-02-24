/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follow
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Inserts follow instance into the database
     * @param {User} uid1 Instance of user who follows into the database
     * @param {User} uid2 Instance of user to be followed into the database
     * @returns Promise To be notified when user follows another user is inserted into the database
     */
    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
            FollowModel
                    .create({userFollowed: uid2, userFollowing: uid1});

    /**
     * Removes follow relation from the database.
     * @param {User} uid1 Instance of user following into the database
     * @param {User} uid2 Instance of user followed into the database
     * @returns Promise To be notified when user follows another user is removed from the database
     */
    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
            FollowModel
                    .deleteOne({userFollowed:uid2, userFollowing: uid1});

    /**
     * Retrieves all followers of user from the database
     * @param {User} uid Instance of user to be searched from the database
     * @returns Promise To be notified when the users are retrieved from the database
     * database
     */
    findFollowers = async (uid: string): Promise<Follow[]> =>
            FollowModel
                    .find({userFollowed: uid})
            .populate("userFollowing")
        .exec();

    /**
     * Retrieves all following of user from the database
     * @param {User} uid Instance of user to be searched from the database
     * @returns Promise To be notified when the users are retrieved from the database
     * database
     */
    findFollowing = async (uid: string): Promise<Follow[]> =>
            FollowModel
                    .find({userFollowing:uid})
            .populate("userFollowed")
        .exec();
};