const fetch_details_of_file=async(jsonData)=>{
    console.log("This is the json data received ::"+{jsonData})
    const response=await fetch("http://127.0.0.1:5000/api/fetch_details_of_a_file",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(jsonData)
    });
    if (response.ok){
       const result= await response.json();
       return result;
    }
}
export default fetch_details_of_file;