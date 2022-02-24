/**
 * @file Declares Tuit data type representing
 * a tuit, as in user tuits a tuit
 */
import User from "../users/User";
/**
 * @typedef Tuit Represents tuits bu a user,
 * as in user tuits a tuit
 * @property {string} tuit User writes a tuit
 * @property {User} postedBy tuit posted by User
 * @property {Date} postedOn tuit posted on a date
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};