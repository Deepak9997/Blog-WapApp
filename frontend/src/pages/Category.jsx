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
import { getApiBaseUrl } from "@/helper/APIs.js";
import { RouteAddCategory, RouteEditCategory, RouteSignin } from "@/helper/routes";
import { useFetch } from "@/hooks/useFetch";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { showToast } from "@/helper/showToast";
import { useEffect, useState } from "react";
import HandleDelete from "@/helper/HandleDelete.js";
import { useSelector } from "react-redux";

const Category = () => {
  const user = useSelector((state) => state.user);

  const [refreshData, setrefreshData] = useState(false);
  const {
    data: Categorydata,
    loading,
    Error,
  } = useFetch(
    `${getApiBaseUrl()}/category/allcategory`,
    {
      method: "get",
      credentials: "include",
    },
    [refreshData]
  );
 
  const handleDelete = async (id) => {
    const response = HandleDelete(
      `${getApiBaseUrl()}/category/delete/${id}`
    );
    if (response) {
      setrefreshData(!refreshData);
      showToast("success", response.message);
    } else {
      showToast("error", response.message);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <Card className="border-none mx-auto m-2 shadow-sm">
        <CardHeader>
          {user && user.isLoggedIn ? (
            <div>
              <Button asChild>
                <Link to={RouteAddCategory}>Add Category</Link>
              </Button>
            </div>
          ) : (
            <div>
              <Button asChild>
                <Link to={RouteSignin}>Sign In</Link>
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Slug</TableHead>
                <TableHead className="font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Categorydata && Categorydata.category.length > 0 ? (
                Categorydata?.category.map((category) => (
                  <TableRow key={category?._id}>
                    <TableCell>{category?.name}</TableCell>
                    <TableCell>{category?.slug}</TableCell>
                    <TableCell>
                      <div className=" flex gap-3">
                        <Button
                          className="hover:bg-violet-500 hover:text-white"
                          variant="outline"
                          asChild
                        >
                          <Link to={RouteEditCategory(category?._id)}>
                            <FaRegEdit />
                          </Link>
                        </Button>
                        <Button
                          onClick={() => {
                            handleDelete(category?._id);
                          }}
                          className="hover:bg-red-500 hover:text-white"
                          variant="outline"
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>No Data Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Category;
