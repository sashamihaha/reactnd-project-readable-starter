export const UPDATE_POSTS = 'UPDATE_POSTS'
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES'
export const UPDATE_CATEGORY_POSTS = 'UPDATE_CATEGORY_POSTS'
export const UPDATE_POST_SCORE = 'UPDATE_POST_SCORE'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const UPDATE_COMMENT_SCORE = 'UPDATE_COMMENT_SCORE'
export const UPDATE_COMMENT_DETAILS = 'UPDATE_COMMENT_DETAILS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const SORT_POSTS = 'SORT_POSTS'

export function updatePosts (posts) {
    return {
        type: UPDATE_POSTS,
        posts
    }
}

export function updateCategories (categories) {
    return {
        type: UPDATE_CATEGORIES,
        categories
    }
}

export function updateCategoryPosts (categoryPosts) {
    return {
        type: UPDATE_CATEGORY_POSTS,
        categoryPosts
    }
}

export function updatePostScore (post, vote) {
    return {
        type: UPDATE_POST_SCORE,
        post,
        vote
    }
}

export function addPostToState (post) {
    return {
        type: ADD_POST,
        post
    }
}

export function deletePostFromState (postId) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function editPostInState (postId, body, timestamp) {
    return {
        type: EDIT_POST,
        postId,
        body,
        timestamp
    }
}

export function sortPosts (sortBy) {
    return {
        type: SORT_POSTS,
        sortBy
    }
}

export function updateComments (comments) {
    return {
        type: UPDATE_COMMENTS,
        comments
    }
}

export function updateCommentScore (comment, vote) {
    return {
        type: UPDATE_COMMENT_SCORE,
        comment,
        vote
    }
}

export function updateCommentDetails (comment) {
    return {
        type: UPDATE_COMMENT_DETAILS,
        comment
    }
}

export function addCommentToState (comment) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export function deleteCommentFromState (comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

export function editCommentInState (parentId, commentId, body, timestamp) {
    return {
        type: EDIT_COMMENT,
        parentId,
        commentId,
        body,
        timestamp
    }
}