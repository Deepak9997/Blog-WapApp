
export const RouteIndex = "/";
export const RouteSignin = "/signin";
export const RouteSignup = "/signup";
export const Routeusers = "/users";
export const RouteProfile = "/profile";


export const RouteCategory = "/category";
export const RouteAddCategory = "/addcategory";
export const RouteShowCategory = "/showcategory";
export const RouteEditCategory =  (category_id) => `/category/edit/${category_id}`;
export const RouteDeleteComment =  (id) => `/comment/delete/${id}`;


export const Routeblog = "/blogs";
export const RouteAddblog = "/addblog";
export const RouteEditblog =  (blog_id) => `/blog/edit/${blog_id}`;
export const RouteShowSingleBlog =  (id) => `/blog/ShowSingleBlog/${id}`;
export const RouteBlogByCategory =  (category_id) => `/blog/category/${category_id}`;
export const RouteBlogBySearch = (q) => {
    if (q) {
        return `/search?q=${q}`;
    } else {
        return `/search`;
    }
};
// export const RouteEditComment =  (id) => `/blog/editcomment/${id}`;
export const RouteEditComment = (id, blogid) => {
  return `/blog/editcomment/${id}?blog=${blogid}`;
};
export const RouteUsers = '/users'

  