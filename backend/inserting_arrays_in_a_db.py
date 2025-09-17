from utils import custom_logger
from bson import ObjectId
logger=custom_logger()
def creating_preprocessing_arrays(users_collection,signup_db_object,object_id):
    logger.info("IN API-inserting_arrays_in_a_db")
    dict_to_be_updated={"id":{"_id": ObjectId(object_id)},"set_csv_data":{"$set": {"numerical_preprocessing": [],"text_preprocessing": []}}}
    result=signup_db_object.update_users(users_collection,dict_to_be_updated)
    return result