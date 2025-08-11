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
import { useFetch } from "@/hooks/useFetch";
import { FaTrash } from "react-icons/fa";
import { showToast } from "@/helper/showToast";
import {  useState } from "react";
import  HandleDelete  from '@/helper/HandleDelete.js'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import usericon from '@/assets/images/user.png'
import moment from "moment";
import { getApiBaseUrl } from "@/helper/APIs.js";

const Users = () => {
  const [refreshData, setrefreshData] = useState(false);
  const {
    data:userData,
    loading,
    Error,
  } = useFetch(`${getApiBaseUrl()}/user/getalluser`,{
    method: "get",
    credentials: "include",
  },[refreshData]);

console.log("users",userData?.user)

  const handleDelete = async (id) => {
     const response = HandleDelete(`${getApiBaseUrl()}/user/deleteuser/${id}`,)
     if(response){
       setrefreshData(!refreshData)
       showToast('success', response.message)
      } else{
        showToast('error', response.message)
      }
  }

  if (loading) return <Loading />;
  return (
      <Card className="border-none mx-auto m-2 shadow-sm">
        <CardHeader>
          <div>
           <h1 className="text-3xl text-violet-500 font-bold mb-5">All Users</h1>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Role</TableHead>
                <TableHead className="font-bold">User</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Avatar</TableHead>
                <TableHead className="font-bold">Dated</TableHead>
                <TableHead className="font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData && userData?.user.length > 0 ?
              userData?.user.map(User => 
                
                <TableRow key={User?._id}>
                  <TableCell className={`font-bold ${User.role === 'Admin' ? 'text-green-600': 'text-violet-600'}`}>{User?.role}</TableCell>
                  <TableCell>{User?.name}</TableCell>
                  <TableCell>{User?.email}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={User?.avatar || usericon} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{moment(User?.createdAt).format("MMMM Do YYYY") }</TableCell>
                  <TableCell>
                    <div className=" flex gap-3">
                      <Button
                        onClick={()=>{
                          handleDelete(User?._id)
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
              
              :
              <TableRow>
                <TableCell>No Data Found</TableCell>
              </TableRow>
            }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
};

export default Users;
