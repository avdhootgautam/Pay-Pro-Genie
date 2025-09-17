const create_empty_preprocessing_arrays= async (jsonData) => {
    try{
    const response=await fetch("http://localhost:5000/api/creating-preprocessing-arrays",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(jsonData),
            credentials:"include"
        })
    if (response.ok){
        const result=await response.json()
        return result
    }
    else{
        console.log("Error in api/creating-preprocessing-arrays")
    }
    }catch(err){
        console.log("IN create_empty_preprocessing_arrays:: ",err)
    }
    
}

export default create_empty_preprocessing_arrays;