import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getApiBaseUrl } from '@/helper/APIs.js';
import { RouteAddblog, RouteEditblog, RouteSignin } from "@/helper/routes";
import { useFetch } from "@/hooks/useFetch";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { showToast } from "@/helper/showToast";
import { useEffect, useState } from "react";
import HandleDelete from "@/helper/HandleDelete.js";
import moment from "moment";
import { useSelector } from "react-redux";

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const [refreshData, setrefreshData] = useState(false);
  const {
    data: blogdata,
    loading,
    Error,
  } = useFetch(
    `${getApiBaseUrl()}/blog/AllblogofUser`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );

  const handleDelete = async (id) => {
    const response = HandleDelete(
      `${getApiBaseUrl()}/blog/delete/${id}`
    );
    if (response) {
      setrefreshData(!refreshData);
      showToast("success", response.message);
    } else {
      showToast("error", response.message);
    }
  };


  {if (loading) return <Loading />}
  return (
    <>
      <Card className="border-none mx-auto m-2 shadow-sm">
        <CardHeader>
          <div>
            {user && user.isLoggedIn ? (
              <Button asChild>
                <Link to={RouteAddblog}>Add blog</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to={RouteSignin}>Sign In</Link>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Blog Title</TableHead>
                <TableHead className="font-bold">Slug</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Created At</TableHead>
                <TableHead className="font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogdata &&
                blogdata?.blog?.length > 0 ?
                blogdata?.blog.map((blog) =>
                   (
                    <TableRow key={blog?._id}>
                      <TableCell>{blog?.title}</TableCell>
                      <TableCell>{blog?.slug}</TableCell>
                      <TableCell>{blog?.category.name}</TableCell>
                      <TableCell>
                        {moment(blog?.createdAt).format("MMMM Do YYYY")}
                      </TableCell>
                      <TableCell>
                        <div className=" flex gap-3">
                          <Button
                            className="hover:bg-violet-500 hover:text-white"
                            variant="outline"
                            asChild
                          >
                            <Link to={RouteEditblog(blog?._id)}>
                              <FaRegEdit />
                            </Link>
                          </Button>
                          <Button
                            onClick={() => {
                              handleDelete(blog?._id);
                            }}
                            className="hover:bg-red-500 hover:text-white"
                            variant="outline"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                  ):
                  <TableRow className="p-10 flex items-center justify-center">
                      <TableCell className="text-2xl ">No Data Found</TableCell>
                  </TableRow>
                  }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Blogs;
