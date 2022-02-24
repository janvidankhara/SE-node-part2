import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
   userMessageUser(uid1: string, uid2: string, message: Message): Promise<Message>;
   listSentMessages(uid: string): Promise<Message[]>;
   listReceivedMessages(uid: string): Promise<Message[]>;
   userDeletesMessage(mid: string): Promise<any>;
};