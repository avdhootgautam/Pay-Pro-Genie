const fetch_sample_data_for_table=async(jsonData)=>{
    try{
        const response=await fetch("http://localhost:5000/api/fetch_sample_data_for_table",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(jsonData),
            credentials:"include"
        })

        if (response.ok){
            const result=await response.json()
            return result
        }
    }
    catch(err){
        console.log("fetch_sample_data_for_table")
        throw err;
    }
}
export default fetch_sample_data_for_table;