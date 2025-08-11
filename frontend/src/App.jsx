import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout/Layout';
import { RouteAddblog, RouteAddCategory, Routeblog, RouteBlogBySearch, RouteCategory,  RouteIndex, RouteProfile, RouteShowCategory, RouteShowSingleBlog, RouteSignin, RouteSignup, RouteUsers,} from './helper/routes';
import Index from './pages/index';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Category from './pages/Category';
import AddCategory from './pages/AddCategory';
import EditCategory from './pages/EditCategory';
import Blogs from './pages/Blogs/Blogs';
import Addblog from './pages/Blogs/Addblog';
import Editblog from './pages/Blogs/Editblog';
import ShowSingleBlog from './pages/ShowSingleBlog';
import EditComment from './pages/Comment/EditComment';
import ShowComments from './pages/Comment/ShowComments';
import BlogByCategory from './pages/Blogs/BlogByCategory';
import SearchBlog from './pages/Blogs/SearchBlog';
import Users from './pages/users';

const App = () => {

  return (
    <div>
       <BrowserRouter>
          <Routes>
            <Route path={RouteIndex} element={<Layout />}>
                <Route index element={<Index />} />
                <Route path={RouteProfile} element={<Profile />} />
                 
                 {/* Category */}
                <Route path={RouteCategory} element={<Category/>} />
                <Route path={RouteAddCategory} element={<AddCategory/>} />
                <Route path="/category/edit/:category_id" element={<EditCategory/>} />
                <Route path={RouteShowCategory} element={<Category/>} />

                {/* Blogs */}
                <Route path={Routeblog} element={<Blogs/>} />
                <Route path={RouteAddblog} element={<Addblog/>} />
                <Route path="/blog/edit/:blog_id" element={<Editblog/>} />
                <Route path="/blog/ShowSingleBlog/:id" element={<ShowSingleBlog/>} />
                <Route path="/blog/category/:category_id" element={<BlogByCategory/>} />
                
                <Route path={RouteBlogBySearch()} element={<SearchBlog/>} />
                <Route path="/blog/editcomment/:id" element={<EditComment/>} />

                {/* Users */}
                <Route path={RouteUsers} element={<Users />} />

                        
            </Route>
            <Route path={RouteSignin} element={<Signin />} />
            <Route path={RouteSignup} element={<Signup />} />
            {/* <Route path={Routeusers} element={<Users />} /> */}
          </Routes>
       </BrowserRouter>
    </div>
  );
};

export default App;
