from pymongo import MongoClient
class signup_mongo():
    def __init__(self):
        self.MONGO_URI="mongodb://localhost:27017/"
    def create_db_connection(self,name_of_database,name_of_a_collection):
        client = MongoClient(self.MONGO_URI)
        db=client[name_of_database]
        #Define collection for the users in a database
        users_collection=db[name_of_a_collection]
        return users_collection
    def insert_users(self,users_collection,user_dict):
        users_collection.insert_one(user_dict)
        return 
    def find_users(self,users_collection,email_dict):
        user_presence=users_collection.find_one(email_dict)
        return user_presence
    
if __name__=="__main__":
    object1=login_mongo()