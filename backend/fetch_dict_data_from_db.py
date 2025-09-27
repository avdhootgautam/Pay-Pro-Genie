'''
Arguments Needed:- 
'''
from bson import ObjectId
from utils import convert_list_of_dict_to_csv
def fetch_dict_from_db(signup_db_object,users_collection,object_id,email,filename):
    # Here only i will create the dict and query projection
    required_dict={"_id":ObjectId(object_id),"email":email}

    #Here i will write the projection for finding the data for the particular filename
    projection={
        "files":{
            "$elemMatch":{"fileInfo.file_name":filename}
        },
        "fullName":0,
        "email":0,
        "password":0,
        "numerical_preprocessing":0,
        "text_preprocessing":0
    }
    data=signup_db_object.find_users(users_collection,required_dict,projection)
    # print(f"This is the result i got:: {data}")
    sample_data=convert_list_of_dict_to_csv(filename,data)
    return sample_data