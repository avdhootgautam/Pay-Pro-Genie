from utils import custom_logger
from bson import ObjectId
from utils import find_the_list_of_filenames

def fetch_filenames_from_db(signup_db_object,users_collection,object_id,email):
    # Here only i will create the dict and query projection
    required_dict={"_id":ObjectId(object_id),"email":email}

    # Actually in a projection 1 represents to include that particualar filed while 0 doesn't
    projection= {"files.fileInfo.file_name": 1, "_id": 0}
    result=signup_db_object.find_users(users_collection,required_dict,projection)
    # print(f"This is the result:: {result}")
    list_of_filenames=find_the_list_of_filenames(result)
    return list_of_filenames