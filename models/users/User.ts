/**
 * @file Declares User data type representing
 * a user, as in user who uses tuiter
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";
/**
 * @typedef User Represents messages relationship between a user and a user,
 * as in user messages another user
 * @property {ObjectId} id id of user type object
 * @property {string} username username of a user's account
 * @property {string} password password of a user's account
 * @property {string} firstName user's firstName
 * @property {string} lastName user's lastName
 * @property {string} email user's email address
 * @property {string} profilePhoto user's profile picture
 * @property {string} headerImage user profile cover photo
 * @property {string} biography user's biography
 * @property {Date} dateOfBirth birth date of user
 * @property {AccountType} accountType account type of user
 * @property {MaritalStatus} maritalStatus marital status of user
 * @property {Location} location location of user in terms of longitude and latitude
 * @property {number} salary salary of user
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};