const check_file_exists=async(jsonData)=>{
        console.log("This is the json data received"+jsonData)
        const response=await fetch("http://localhost:5000/api/check-uploaded-file-exists",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(jsonData),
            credentials:"include"
        });
        if (response.ok){
            const result=await response.json();
            return result;
        }
}
export default check_file_exists;