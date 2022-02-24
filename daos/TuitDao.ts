/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Users
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Uses TuitModel to retrieve all tuits document by a user from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuits are retrieved by a user from the database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Uses TuitModel to retrieve a tuit document by a user from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when tuit is retrieved by a user from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Inserts tuits instance into the database
     * @param {User} uid Instance of user who writes tuit into the database
     * @param {Tuit} tid Instance of tuit written into the database
     * @returns Promise To be notified when user writes a tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Updates tuits relation from the database.
     * @param {User} uid Instance of user who writes tuit into the database
     * @param {Tuit} tid Instance of tuit written into the database
     * @returns Promise To be notified when user updates a tuit into the database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});
    /**
     * Removes tuits relation from the database.
     * @param {User} uid Instance of user who has written tuit into the database
     * @returns Promise To be notified when user deletes a tuit is removed from the database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});
}