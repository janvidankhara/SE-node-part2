/**
 * @file Declares Follow data type representing
 * user follows, as in user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between two users,
 * as in a user follows a user
 * @property {User} userFollowed User being followed by a user
 * @property {User} userFollowing User following a user
 */

export default interface Follow{
    userFollowed: User,
    userFollowing: User
}