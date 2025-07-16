const upload_dataset=async(formData)=>{
    try{
        const response=await fetch("http://localhost:5000/api/upload_dataset",{
            method:"POST",
            // headers:{"Content-Type":"application/json"},
            body:formData
            //Here we are not using headers and JSON.stringfy because its already done in a formData
        });
        if (response.ok){
            const result=await response.json();
            return result;
        }
    }catch(err){
        alert("Error while uploading the files of a dataset")
        throw err
    }
}
export default upload_dataset;