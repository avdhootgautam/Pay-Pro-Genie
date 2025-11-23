const preprocessingService=async(payload)=>{
    try{
        const response=await fetch("http://localhost:5000/api/preprocessing",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(payload),
            credentials: "include"
        });
        if (response.ok){
            const result=await response.json();
            console.log("This is the result ",result)
            return result;
        }
    }
    catch(err){
        console.error("Preprocessing Failed: ",err)
        throw err;
    }
}
export default preprocessingService;