import postModel from "../Models/PostModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/UserModel.js";

// Create Post

export const createPost = async (req, res) => {

    const newPost = new postModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
}

// Get a Post

export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await postModel.findById(id);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json(error);

    }
}

// Update Post

export const updatePost = async (req, res) => {

    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(postId);

        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Updated suceesfully")

        }
        else {
            res.status(403).json('Action forbidden')
        }
    } catch (error) {
        res.status(500).json(error);

    }

}

// Delete Post

export const deletePost = async (req, res) => {

    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(postId);

        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Deleted suceesfully")

        }
        else {
            res.status(403).json('Action forbidden')
        }
    } catch (error) {
        res.status(500).json(error);

    }

}

// Like/Unlike Post

export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Liked Post")
        }

        else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Unliked Post");
        }

    } catch (error) {
        res.status(500).json(error);

    }
}

// Get Timeline Post

export const getTimelinePost = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const currentUserPosts = await postModel.find({ userId: userId });
      const followingPosts = await UserModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId)
          }
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts"
          }
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0
          }
        }
      ]);
  
      const allPosts = currentUserPosts.concat(...followingPosts[0].followingPosts);
      const sortedPosts = allPosts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
  
      res.status(200).json(sortedPosts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  