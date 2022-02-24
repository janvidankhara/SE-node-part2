/**
 * @file Implements mongoose schema for tuits
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";
/**
 * @typedef Tuit Represents tuits by user
 * @property {string} tuit text entry of tuit by user
 * @property {User} postedBy represents who tuited the tuit
 * @property {Date} postedOn represents when tuit was posted
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;