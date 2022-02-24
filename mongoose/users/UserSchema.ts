/**
 * @file Implements mongoose schema for users
 */

import mongoose from "mongoose";
import User from "../../models/users/User";
/**
 * @typedef User Represents user
 * @property {string} username username of user's tuiter account
 * @property {string} password password of user's tuiter account
 * @property {string} firstName firstName of user
 * @property {string} lastName lastName of user
 * @property {string} email email address of user
 * @property {string} profilePhoto profile picture of user
 * @property {string} headerImage header image or cover photo of user's page
 * @property {string} biography text written entry of user for user's page
 * @property {Date} dateOfBirth birth date of user
 * @property {enum} accountType type of account user has
 * @property {enum} maritalStatus marital status of user
 * @property {enum} location location of user through longitude and latitude
 * @property {number} salary represents user's salary
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000}
}, {collection: "users"});

export default UserSchema;