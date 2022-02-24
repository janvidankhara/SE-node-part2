/**
 * @file Implements mongoose schema for sections
 */
import mongoose, {Schema} from "mongoose";
import Section from "./Section";
/**
 * @typedef Section Represents sections of courses
 * @property {string} name represents name of the section
 * @property {number} seats represents number of seats available in this section
 * @property {string} room represents room identity
 * @property {number} startTime represents startTime of the section
 * @property {number} duration represents time limit of the section
 * @property {Course} course represents which course is being taught
 */
const SectionSchema = new mongoose.Schema<Section>({
    name: String,
    seats: Number,
    room: String,
    startTime: Number,
    duration: Number,
    course: {type: Schema.Types.ObjectId, ref: "CourseModel"}
}, {collection: "sections"});
export default SectionSchema;