/**
 * @file Implements mongoose schema for follows
 */
import mongoose,{Schema} from "mongoose";
import Follow from "../../models/follows/Follow";
/**
 * @typedef Follow Represents follows for users
 * @property {User} userFollowed User being followed by a user
 * @property {User} userFollowing User following a user
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
 }, {collection: "follows"});

export default FollowSchema;