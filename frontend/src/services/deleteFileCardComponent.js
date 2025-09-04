const DeleteFileCardComponent=async(json_data)=>{
    console.log("In a deleteFileCardComponent ,json_data is:: ",json_data)
    try
    {
        const response=await fetch("http://localhost:5000/api/delete-file-card",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(json_data),
        credentials:"include"
    })

    if (response.ok){
        const result=await response.json()
        return result
    }
    }catch(err){
        console.error(err)
    }

}
export default DeleteFileCardComponent;