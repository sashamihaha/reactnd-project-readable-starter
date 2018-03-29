const authorization = { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' }

export const fetchCategories = () =>
  fetch('http://localhost:3001/categories', { method: 'get', headers: authorization })
    .then(data => data.json())

export const fetchPosts = () =>
  fetch('http://localhost:3001/posts', { method: 'get', headers: authorization })
    .then(data => data.json())

export const fetchCategoryPosts = (category) =>
  fetch(`http://localhost:3001/${category}/posts`, { method: 'get', headers: authorization })
    .then(data => data.json())

export const fetchPostDetails = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}`, { method: 'get', headers: authorization })
    .then(data => data.json())

export const addPost = (post) =>
  fetch(`http://localhost:3001/posts`, {
    method: 'post', headers: authorization,
    body: JSON.stringify({
      id: post.id,
      timestamp: post.timestamp,
      author: post.author,
      body: post.body,
      title: post.title,
      category: post.category
    })
  })

export const deletePost = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}`, { method: 'delete', headers: authorization })

export const editPost = (postId, body, timestamp) =>
  fetch(`http://localhost:3001/posts/${postId}`, {
    headers: authorization, method: "put",
    body: JSON.stringify({
      body: body,
      timestamp: timestamp
    })
  }
  )

export const updatePostVote = (postId, vote) =>
  fetch(`http://localhost:3001/posts/${postId}`, {
    headers: authorization, method: "POST",
    body: JSON.stringify({
      option: vote
    })
  }
  )

export const fetchComments = (postId) =>
  fetch(`http://localhost:3001/posts/${postId}/comments`, { method: 'get', headers: authorization })
    .then(data => data.json())

export const updateCommentVote = (commentId, vote) =>
  fetch(`http://localhost:3001/comments/${commentId}`, {
    headers: authorization, method: "POST",
    body: JSON.stringify({
      option: vote
    })
  }
  )

export const fetchCommentDetails = (commentId) =>
  fetch(`http://localhost:3001/comments/${commentId}`, { method: 'get', headers: authorization })
    .then(data => data.json())

export const addComment = (comment) =>
  fetch(`http://localhost:3001/comments`, {
    method: 'post', headers: authorization,
    body: JSON.stringify({
      id: comment.id,
      parentId: comment.parentId,
      timestamp: comment.timestamp,
      author: comment.author,
      body: comment.body,
      deleted: false,
      parentDeleted: false

    })
  })

export const deleteComment = (commentId) =>
  fetch(`http://localhost:3001/comments/${commentId}`, { method: 'delete', headers: authorization })

export const editComment = (commentId, body, timestamp) =>
  fetch(`http://localhost:3001/comments/${commentId}`, {
    headers: authorization, method: "put",
    body: JSON.stringify({
      body: body,
      timestamp: timestamp
    })
  }
  )