/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of likes
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {User} uid1 Instance of user who messages another user into the database
     * @param {User} uid2 Instance of user who receives message from another user into the database
     * @param {Message} message Instance of message into the database
     * @returns Promise To be notified when user messages another user is inserted into the database
     */
    userMessageUser = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
            MessageModel.create({...message, to: uid2, from: uid1});

    /**
     * Retrieves a list of messages sent by user from the database
     * @param {User} uid Instance of user to be searched from the database
     * @returns Promise To be notified when the sent messages are retrieved from the database
     * database
     */
    listSentMessages = async (uid: string): Promise<Message[]> =>
            MessageModel.find({from: uid}).populate("message","to").exec();
    /**
     * Retrieves a list of messages received by user from the database
     * @param {User} uid Instance of user to be searched from the database
     * @returns Promise To be notified when the received messages are retrieved from the database
     * database
     */
    listReceivedMessages = async (uid: string): Promise<Message[]> =>
            MessageModel.find({to: uid}).populate("message","from").exec();
   /**
    * Removes messages relation from the database.
    * @param {Message} uid Instance of user who deletes a message from the database
    * @returns Promise To be notified when user deletes a message is removed from the database
    */
    userDeletesMessage = async (mid: string): Promise<any> =>
            MessageModel.deleteOne({_id: mid});

};