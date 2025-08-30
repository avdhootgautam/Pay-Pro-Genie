const userData=async()=>{
    try{
        console.log("IN userData")
        const res=await fetch("http://127.0.0.1:5000/api/me",{
        method:"GET",
        credentials:"include"
    })
    if(!res.ok){
        throw new Error("Failed to fetch user data")
    }
    
    const data=await res.json()
    console.log("IN userData service, the data of the user is :: ",data?.message)
    
    return data;
    }
    catch (err){
    console.log("Error in fetching the details from me:: ",err)
    throw err
}
}
export default userData;
