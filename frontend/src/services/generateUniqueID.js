const generateUniqueID=async()=>{
    try{
        const response=await fetch("http://localhost:5000/api/generate-unique-id",{
            method:"GET",
            credentials:"include"
        })
        if (!response.ok){
            throw new Error("Failed to generate unique id or (tsk_id)")
        }
        const unique_id=await response.json()
        return unique_id
    }catch(err){
        console.log("IN generateUniqueID ,error is :: ",err)
        throw err
    }
}

export default generateUniqueID;