import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
            FollowModel
                    .create({userFollowed: uid2, userFollowing: uid1});

    userUnfollowsUser = async (uid1: string, uid2: string): Promise<any> =>
            FollowModel
                    .deleteOne({userFollowed:uid2, userFollowing: uid1});

    findFollowers = async (uid: string): Promise<Follow[]> =>
            FollowModel
                    .find({userFollowed: uid})
            .populate("userFollowing")
        .exec();

    findFollowing = async (uid: string): Promise<Follow[]> =>
            FollowModel
                    .find({userFollowing:uid})
            .populate("userFollowed")
        .exec();
};