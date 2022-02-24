/**
 * @file Declares Message data type representing relationship between
 * users and user, as in user messages another user
 */
import User from "../users/User";

/**
 * @typedef Message Represents messages relationship between a user and a user,
 * as in user messages another user
 * @property {string} message User messages a user
 * @property {User} to sent to User
 * @property {User} from from a User
 * @property {Date} sentOn represents date on which message was sent
 */

export default interface Message {
     message: string,
     to: User,
     from: User,
     sentOn?: Date
};