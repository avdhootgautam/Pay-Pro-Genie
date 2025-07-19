const save_file_from_backend=async(Data)=>{
    try{
        console.log(Data)
        console.log(Data.email)
        const response=await fetch("http://127.0.0.1:5000/api/save-file",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(Data)
        });
        if (response.ok){
            const result=await response.json();
            return result;
        }
    }
    catch(err){
        alert("Error while saving the file !! ")
    }
}
export default save_file_from_backend;