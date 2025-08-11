 const HandleDelete = async (endpoint) => {
  const conf = confirm("Are You Sure To Delete");
  if (conf) {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return true;
    } catch (error) {
        // console.log(error)
        return false
    }
  }else{
     return false
  }
};
export default HandleDelete