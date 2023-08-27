import express from "express";
import {followUser, deleteUser, getUser, updateUser, UnfollowUser, getAllUser} from "../Controllers/UserController.js";
// import authMiddleWare from "../MiddleWare/autjMiddleWare.js";

const router = express.Router();

router.get('/', getAllUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', UnfollowUser)




export default router;