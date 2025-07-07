const signupUser=async(formData)=>{
    try{
        const response=await fetch("http://localhost:5000/api/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(formData),
        });
        const result=await response.json();
        return result;
    }catch(error){
        console.log("Signup failed: ",error)
        throw error;
    }
};
export default signupUser;