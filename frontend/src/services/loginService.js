const loginuser=async(formData)=>{
    try{
       const response=await fetch("http://localhost:5000/api/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData),
            credentials:"include"
        });
        if (response.ok){
            const result=await response.json();
            console.log("This is the result ",result)
            return result;
        }
    }catch(err){
        console.error("Signup failed: ",err)
        throw err;
    }
}
export default loginuser;