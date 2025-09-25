const fetchListOfFilenames=async(payload)=>{
    console.log("This is the payload received from the frontend:: ",payload)
    try{
        const response=await fetch("http://localhost:5000/api/find-list-of-filenames",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(payload),
            credentials:"include"
        })
        if (response.ok){
            const result =await response.json()
            return result
        }
    }
    catch(err){
        console.error("Error in a service, fetchListOfFilenames and the error is ",{err})
        throw err
    }
}
export default fetchListOfFilenames;