from flask import Flask,request,jsonify,make_response
from flask_cors import CORS
import os,sys,bcrypt,datetime
from werkzeug.utils import secure_filename#This is used to extract the filename
from bson import ObjectId#This is used to convert the string into ObjectId
import pandas as pd
from utils import read_config,custom_logger,extract_file_information
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity,set_access_cookies,get_jwt

# Add the parent directory of `backend/` to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
#Now we can import like this
from database.signup_mongo import signup_mongo
from collections import defaultdict

config=read_config()
logger=custom_logger()

debug_signup=False
debug_login=False

logger.info(f"IN A API FILE")
app=Flask(__name__)
CORS(app,
     supports_credentials=True,
     origins=[config["cors"]["url_react"]]
)

#here i will initialise the jwt_manager 
app.config["JWT_SECRET_KEY"]=config["jwt"]["secret_key"]
# logger.debug(f"This is the secret key :: {config["jwt"]["secret_key"]}")
app.config["JWT_ACCESS_TOKEN_EXPIRES"]=datetime.timedelta(hours=config["jwt"]["access_token_expire_time"])
# logger.debug(f"This is the time for expiring token:: {config["jwt"]["access-token-expire-time"]} and type of the time is {type(config["jwt"]["access-token-expire-time"])}")
app.config["JWT_COOKIE_SECURE"]=config["jwt"]["jwt_cookie_secure"]
logger.warning(f"Change jwt cookie secure to true if gonna use it in production")
app.config["JWT_COOKIE_SAMESITE"]=config["jwt"]["jwt_cookie_samesite"]
app.config["JWT_TOKEN_LOCATION"]=config["jwt"]["jwt_token_location"]
jwt=JWTManager(app)

signup_db_object=signup_mongo()#declared a database
users_collection=signup_db_object.create_db_connection("signup_db","users")


@app.route("/api/signup",methods=["POST"])
def sign_up():
    try:
        formData=request.get_json()
        logger.info(f"Form data received is :: {formData}")

        if not formData:
            logger.error(f"Didn't received the formData")
            return jsonify({"error":"Invalid or Missing JSON"}),400
        
        if debug_signup:
            print(f"This is the formdata received from the frontend:: {formData}")

        fullName=formData.get("fullName")
        email=formData.get("email")
        password=formData.get("password")
        confirmPassword=formData.get("confirmPassword")

        if fullName=="" or email=="" or password=="" or confirmPassword=="":
            return jsonify({"message":"Empty Data not allowed!"}),404
        
        #Hash password using bcrypt
        hash_password=bcrypt.hashpw(password.encode("utf-8"),bcrypt.gensalt()).decode("utf-8")
        logger.info(f"This is the hashed_password:: {hash_password}")

        user_dict={
            "fullName":fullName,
            "email":email,
            "password":hash_password
        }

        #Check whether the user is present or not
        user_presence=signup_db_object.find_users(users_collection,{"email":email})
        if user_presence:
            return jsonify({"message":"User Already exists"}),409
        
        signup_db_object.insert_users(users_collection,user_dict)
        return jsonify({"message": "User registered successfully!"}),200
    
    except Exception as e:
        return jsonify({"error in signup":str(e)}),500


@app.route("/api/login",methods=["POST"])
def login():
    try:
        logger.info("IN LOGIN SERVICE")

        formData=request.get_json()
        logger.info(f"This is the formData received from the frontend::{formData}")
        if not formData:
            return jsonify({"error":"Invalid or Missing JSON"}),400
        
        email=formData.get("email")
        password_fetched=formData.get("password")
      
        email_presence=signup_db_object.find_users(users_collection,{"email":email})
        # customer_id_from_email=email_presence["_id"]
        user_password_saved=""
        user_fullName=""
        object_id=""
        logger.debug(f"This is the email_presence::{email_presence} and type of the email_presence is::{type(email_presence)}")
        
        if email_presence :
            user_password_saved=email_presence["password"]
            user_fullName=email_presence["fullName"]
            object_id=str(email_presence["_id"])
            # print(f"This is the object id::{object_id}")
        else:
            return jsonify({"message":"User not registered. Please sign up first!!"}),404
        
        #Verify Password 
        if bcrypt.checkpw(password_fetched.encode("utf-8"),user_password_saved.encode("utf-8")):
            #Creates JWT
            logger.info("Checking Password")
            access_token=create_access_token(identity=object_id,additional_claims={"email":email,"object_id":object_id,"fullName": user_fullName})
            logger.info(f"This is the access_token:: {access_token}")

            res=make_response(jsonify({"message": "Logged in successfully!"}))
            logger.info(f"This is the response :: {res}")
            #For sending the access token i will use set_access_cookies
            set_access_cookies(res,access_token) #JWT in HttpOnly cookies
            return res,200
        
        else:
            return jsonify({"message":'Incorrect Credentials'}),401
    except Exception as e:
        return jsonify({"error in login":str(e)}),500

@app.route("/api/me",methods=["GET"])
@jwt_required()
def me():
    logger.info("IN ME")
    try:
        objectId=get_jwt_identity()
        logger.debug(f"This is the objectID:: {objectId}")
        claims=get_jwt()
        logger.debug(f"This is the additional claims inside the cookies:: {claims}")

        return jsonify({"message":"Content received via cookies","object_id":objectId,"email":claims["email"],"fullName":claims["fullName"]}),201
    
    except Exception as e:
        logger.error(f"IN ME FOR TOKEN:: {e}")
        return jsonify({"message":e}),500

@app.route("/api/upload_dataset",methods=["POST"])
def upload_dataset():
    try:
        print(f"In a upload dataset api.")
        file=request.files.get("file")
        object_id=request.form.get("object_id")

        #When you are fetching the files from the backend then use files
        print(f"This is the file:: {file}")
        print(f"This is the obejct is received from the data:: {object_id} and the type of the data is ::{type(object_id)}")
        dataset_directory_path="./dataset"

        path_for_saving_file=os.path.join(dataset_directory_path,object_id)
        if not os.path.exists(path_for_saving_file):
            os.makedirs(path_for_saving_file)
        filename_1=secure_filename(file.filename)
        full_save_path=os.path.join(path_for_saving_file,filename_1)

        #Actually file.save works differently as the path should already be created before putting the file in it
        file.save(full_save_path)

        #Here i will update the element in a database for a particular object_id
        user_exist=signup_db_object.find_users(users_collection,{"_id": ObjectId(object_id)})
        if user_exist:
             dict_to_be_updated={"id":{"_id": ObjectId(object_id)},"set_csv_data":{"$set": {"files": []}}}
             result=signup_db_object.update_users(users_collection,dict_to_be_updated)
             logger.info(f'This is the result after updation:: {result}')

        if not file:
            return jsonify({"message":"File does not received at the backend"}),404
        return jsonify({"message":"File received at the backend"}),201
    except Exception as e:
        return jsonify({"message":e}),500
    

@app.route("/api/save-file",methods=["POST"])
def save_file():
    try:
        userData=request.get_json()
        # print(f"This is the formData received at the backend:: {userData}");
        # print(f"This is the object is before type change::{userData["object_id"]}")
        object_id=userData["object_id"]
        user_presence=signup_db_object.find_users(users_collection,{"_id": ObjectId(object_id)})
        # print(f'This is the user_presesnce::{user_presence}')
        # print(f"This is the object is before type change::{userData["object_id"]}")
        # print(f"This is the object id:: {ObjectId(userData["object_id"])}")
        # print(f"This is for user is present or not:: {user_presence}")
        if user_presence:
            path_for_saving_the_data=os.path.join("./dataset",object_id)
            if not os.path.exists(path_for_saving_the_data):
                return jsonify({"message":"Path for saving the dataset doesn't exist"}),404
            print(f"This is the path for saving the dataset:: {path_for_saving_the_data}")
            for root,dirs,files in os.walk(path_for_saving_the_data):
                    for file in files:
                        logger.info(f"This is the file :: {file}")
                        full_path_for_saving_the_file=os.path.join(path_for_saving_the_data,file)

                        #Extacting the file information
                        file_info=extract_file_information(full_path_for_saving_the_file)
                        file_info["file_name"]=file
                        logger.info(f"This is the file_info {file_info} for a file {file}")

                        csv_data=pd.read_csv(full_path_for_saving_the_file)#Here i read the data using pd
                        csv_data=csv_data.to_dict(orient="records")#Here i converted the data into records so that i can store it into a database
                       
                       
                        # If you want to update in a existing element then always use {$push}
                        dict_to_be_updated={"id":{"_id": ObjectId(object_id)},"set_csv_data":{"$push": {"files": {
                            "fileInfo": file_info,
                            "data": csv_data
                        }}}}

                        result=signup_db_object.update_users(users_collection,dict_to_be_updated)
                        print(f"This is the result:: {result}")

        return jsonify({"message":"file saved successfully!"}),201
    except Exception as e:
        return jsonify({"message":"doesn't received any formData"}),500
    

@app.route("/api/check-uploaded-file-exists",methods=['POST'])
def check_uploaded_file_exists():
    logger.info(f'IN A CHECK UPLOAD FILE EXIST')
    try:
        userData=request.get_json()
        logger.debug(f"This is the userData received from the frontend:: {userData}")

        #Now here i have written the query 
        #"$exists" =>This is used to check whether the files exists or not then after it will check for the files using "$not": { "$size": 0 }
        query = {
        "_id": ObjectId(userData["object_id"]),
        "files": {
            "$exists": True,
            "$not": { "$size": 0 }
        }
    }
        
        result=signup_db_object.find_users(users_collection,query)
        # logger.info(f'This is the result i have got for checking whether the file exist or not :{result}')
        if result:
            return jsonify({"message":"File Exist"}),201
        else :
            return jsonify({"message":"No files uploaded"}),201
    except Exception as e:
        logger.error(f"Error in a check_uploaded_file_exists:: {e}")
        return jsonify({"message":"Failed in checking whether the file exist or not"}),500

@app.route("/api/fetch_details_of_a_file",methods=["POST"])
def fetch_the_details_of_the_files():
    logger.info(f"IN A FETCH DETAILS OF A FILE")
    try:
        userData=request.get_json()
        logger.info(f"This is the data fetched from the frontend:: {userData}")
        user_presence=signup_db_object.find_users(users_collection,{"_id": ObjectId(userData["object_id"])})

        file_info=defaultdict(dict)
        if user_presence:
            logger.info(f"Type of the user_presence is:: {type(user_presence)} and the size of th dict is {len(user_presence)}")
            for key,value in user_presence.items():
                if key=="files":
                    logger.info(f"This is the files :: {len(value) } and the type of the value is {type(value)}")
                    index=0
                    for element in value:
                        # file_info.add(element['fileInfo'])
                        logger.info(f"This is the fileInfo for an element:: {element.get("fileInfo")}")
                        file_info[index]=element.get("fileInfo")
                        index+=1
        
        logger.info(f"This is the file_info for all the files stored in a databse for a particular user:; {file_info}")
        return jsonify({"message":"Successfully fetched the details of a file","data":file_info}),201
    except Exception as e:
        logger.error(f"Error in fetching the details of a file:: {e}")
        return jsonify({"message":f"Error in fetching the details of a file {e}"}),500

if __name__=="__main__":
    app.run(debug=True)
