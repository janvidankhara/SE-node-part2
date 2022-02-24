/**
 * @file Implements mongoose schema for message
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";
/**
 * @typedef Message Represents messages between user
 * @property {string} message text written in message
 * @property {User} to represents user to whom message was sent
 * @property {User} from represents user from whom message was sent
 * @property {Date} sentOn represents date on which message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;