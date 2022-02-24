/**
 * @file Implements mongoose schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";
/**
 * @typedef Bookmark Represents user bookmarks
 * @property {Tuit} bookmarkedTuit user bookmarked tuit
 * @property {User} bookmarkedBy bookmarked tuits by user
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"}
}, {collection: "bookmarks"});
export default BookmarkSchema;