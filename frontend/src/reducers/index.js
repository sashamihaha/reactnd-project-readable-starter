import { combineReducers } from 'redux'
import {
  UPDATE_POSTS,
  UPDATE_CATEGORIES,
  UPDATE_CATEGORY_POSTS,
  UPDATE_POST_DETAILS,
  UPDATE_POST_SCORE,
  UPDATE_COMMENTS,
  UPDATE_COMMENT_SCORE,
  UPDATE_COMMENT_DETAILS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  SORT_POSTS,
  sortPosts
} from '../actions'

function posts(state = null, action) {

  let newState
  let comment
  let post
  let commentParent
  let sortedPosts = {}

  switch (action.type) {
    case UPDATE_POSTS:
      let postsObj = {}
      action.posts.map(post => {
        postsObj[post.id] = post
      })
      return {
        ...state,
        postsObj
      }

    case SORT_POSTS:
      newState = { ...state }
      if (action.sortBy === "votescore") {
        const sortedIdArray = Object.keys(newState.postsObj).sort(function (a, b) { return newState.postsObj[b].voteScore - newState.postsObj[a].voteScore })
        let index = 0;
        sortedIdArray.map(id => (
          sortedPosts[Object.keys(newState.postsObj)[index]] = newState.postsObj[id],
          index++
        ))
        newState.postsObj = sortedPosts;
      }
      if (action.sortBy === "timestamp") {
        const sortedIdArray = Object.keys(newState.postsObj).sort(function (a, b) { return newState.postsObj[b].timestamp - newState.postsObj[a].timestamp })
        let index = 0;
        sortedIdArray.map(id => (
          sortedPosts[Object.keys(newState.postsObj)[index]] = newState.postsObj[id],
          index++
        ))
        newState.postsObj = sortedPosts;
      }
      return newState


    case UPDATE_POST_SCORE:
      newState = { ...state }
      action.vote === "upVote" ? newState.postsObj[action.post.id].voteScore++ : newState.postsObj[action.post.id].voteScore--
      return newState

    case UPDATE_COMMENTS:
      let comments = {}
      action.comments.map(comment => {
        if (!comments[comment.parentId]) comments[comment.parentId] = {};
        comments[comment.parentId][comment.id] = comment
      })
      return {
        ...state,
        comments
      }

    case UPDATE_COMMENT_SCORE:
      newState = { ...state }
      comment = newState.comments[action.comment.parentId][action.comment.id]
      action.vote === "upVote" ? comment.voteScore++ : comment.voteScore--
      return newState

    case UPDATE_COMMENT_DETAILS:
      const commentDetails = action.comment
      return {
        ...state,
        commentDetails
      }

    case ADD_POST:
      newState = { ...state }
      newState.postsObj[action.post.id] = action.post
      return newState

    case DELETE_POST:
      newState = { ...state }
      delete newState.postsObj[action.postId]
      return newState

    case EDIT_POST:
      newState = { ...state }
      post = newState.postsObj[action.postId]
      post.body = action.body
      post.timestamp = action.timestamp
      return newState

    case ADD_COMMENT:
      newState = { ...state }
      newState.comments[action.comment.parentId] ? "" : newState.comments[action.comment.parentId] = {};
      commentParent = newState.comments[action.comment.parentId]
      commentParent[action.comment.id] = action.comment
      return newState

    case DELETE_COMMENT:
      newState = { ...state }
      delete newState.comments[action.comment.parentId][action.comment.id]
      return newState

    case EDIT_COMMENT:
      newState = { ...state }
      comment = newState.comments[action.parentId][action.commentId]
      comment.body = action.body
      comment.timestamp = action.timestamp
      return newState

    default:
      return state
  }
}

function categories(state = null, action) {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function categoryPosts(state = null, action) {
  switch (action.type) {
    case UPDATE_CATEGORY_POSTS:
      return action.categoryPosts
    default:
      return state
  }
}

export default combineReducers({
  posts,
  categories,
  categoryPosts,
})