import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
 * @file Declares API for Follow related data access object methods
 */

export default interface FollowDaoI{
        userFollowsUser (uid1: string, uid2: string): Promise<Follow>;
        userUnfollowsUser (uid1: string, uid2: string): Promise<any>;
        findFollowers (uid: string): Promise<Follow[]>;
        findFollowing (uid: string): Promise<Follow[]>;
}