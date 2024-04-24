import AxiosInstance from "../../helper/AxiosInstance";

// lấy danh sách bài viết all
export const getPostsAll = async () => {
  try {
    const response = await AxiosInstance().get(`/posts/get-all-posts`);
    // console.log('get post >>>>>>>>>>>>>>> Service GetPosts 8 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Lấy chi tiết một bài viết theo _id
export const getPostsDetail = async (_id) => {
  try {
    const response = await AxiosInstance().get(`/posts/get-detail-post/${_id}`);
    const res = [response];
    // console.log("get post >>>>>>>>>>>>>>> Service GetPosts 8 ", res);
    return res;
  } catch (error) {
    console.error(" >>>>>>>>> Error getPostsDetail posts: 11 s", error);
    throw error;
  }
};

// lấy danh sách bài viết theo typePosts
export const getPosts = async (idUsers) => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-posts-idObject/${idUsers}`
    );
    // console.log('get post >>>>>>>>>>>>>>> Service GetPosts 8 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

export const getPostsByUser = async (idUsers) => {
  try {
    const response = await AxiosInstance().get(
      `/posts/get-posts-by-user/${idUsers}`
    );
    // console.log('get post >>>>>>>>>>>>>>> Service GetPosts 8 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Error fetching posts: 11 s", error);
    throw error;
  }
};

// Lấy danh sách media theo idPosts
export const getMedia = async (idPosts) => {
  try {
    const response = await AxiosInstance().get(`/media/get-media/${idPosts}`);
    // console.log('get post >>>>>>>>>>>>>>> Service getMedia 8 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi get: 2333333 getMedia", error);
    throw error;
  }
};

// Lấy số lượng share
export const getShare = async (idPosts) => {
  try {
    const response = await AxiosInstance().get(`/posts/get-share/${idPosts}`);
    // console.log('get post >>>>>>>>>>>>>>> Service getShare 8 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi get: 35555555 getShares", error);
    throw error;
  }
};

// Lấy cảm xúc theo idPosts
export const getReaction = async (idPosts) => {
  try {
    const response = await AxiosInstance().get(
      `/reaction/getPostsId/${idPosts}`
    );
    // console.log('get post >>>>>>>>>>>>>>> Service getReaction 8 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi get: 4777777 getReaction", error);
    throw error;
  }
};

// Lấy danh sách comments theo idPosts
export const getComments = async (idPosts) => {
  try {
    const response = await AxiosInstance().get(
      `/comments/get-comment/${idPosts}`
    );
    // console.log('get post >>>>>>>>>>>>>>> Service getComments 8 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi get: 5999999 getComments", error);
    throw error;
  }
};

// Like bài viết theo idUsers và idPosts và type
export const likeByPost = async (idUsers, idPosts, type) => {
  try {
    const response = await AxiosInstance().post(
      `/reaction/add/${idUsers}/${idPosts}`,
      { type }
    );
    return response;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu API:", error);
    throw error;
  }
};

// upload bài viết
export const uploadPost = async (idUsers, postDetails) => {
  try {
    const response = await AxiosInstance().post(
      `/posts/add-posts/${idUsers}`,
      postDetails
    );
    // console.log('upload post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi upload bài viết : 11 s", error);
    throw error;
  }
};

// upload media
export const uploadMedia = async (idPosts, cbMediaType) => {
  try {
    const response = await AxiosInstance().post(
      `/media/add-media/${idPosts}`,
      cbMediaType
    );
    // console.log('upload post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi upload mediaaa : 11 s", error);
    throw error;
  }
};

// Upload ảnh status
export const uploadImageStatus = async (form) => {
  const response = await AxiosInstance("multipart/form-data").post(
    "media/upload-media",
    form
  );
  // console.log('>>>>>>>>>>>>>>>>>> 49 MEdiA media', response);
  return response;
};

// Like bài viết theo id
export const likePost = async (userId, postId) => {
  try {
    const response = await AxiosInstance().post(
      `/post/like/${postId}/${userId}`
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi like bài viết: 11 s", error.response);
    throw error;
  }
};

// Comment theo idUsers và idPosts
export const submitComments = async (userId, postId, content, image) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/add/${userId}/${postId}`,
      { content, image }
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response.data;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi comments bài viết: 11 s", error);
    throw error;
  }
};

// Comment theo idUsers, idPosts và idParent
export const submitCommentsC = async (
  userId,
  postId,
  parentId,
  content,
  parentUserName
) => {
  try {
    const response = await AxiosInstance().post(
      `/comments/add/${userId}/${postId}/${parentId}`,
      { content, parentUserName }
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response.data;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi commentsC bài viết: 11 s", error.response);
    throw error;
  }
};

// Xóa bài viết account
export const deletePostsAccount = async (id) => {
  try {
    const response = await AxiosInstance().delete(`/posts/delete-posts/${id}`);
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi xóa bài viết: 11 s", error.response);
    throw error;
  }
};

// Cập nhập objects edit posts
export const updateEditPostsObjects = async (idPosts, idObject) => {
  try {
    const response = await AxiosInstance().put(
      `/posts/update-objects-posts/${idPosts}/${idObject}`
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi xóa bài viết: 11 s", error.response);
    throw error;
  }
};

// Cập nhập edit posts
export const updateEditPosts = async (idPosts, idUsers, detailPosts) => {
  try {
    const response = await AxiosInstance().put(
      `/posts/update-posts/${idPosts}/${idUsers}`,
      detailPosts
    );
    // console.log('like post >>>>>>>>>>>>>>> 20 ', response);
    return response;
  } catch (error) {
    console.error(" >>>>>>>>> Lỗi Cập nhập edit posts : 11 s", error.response);
    throw error;
  }
};
