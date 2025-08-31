const fetch_details_of_file=async(jsonData)=>{
    console.log("This is the json data received ::"+{jsonData})
    const response=await fetch("http://localhost:5000/api/fetch_details_of_a_file",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(jsonData),
        credentials:"include"
    });
    if (response.ok){
       const result= await response.json();
       return result;
    }
}
export default fetch_details_of_file;