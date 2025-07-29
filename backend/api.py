from flask import Flask,request,jsonify
from flask_cors import CORS
import os,sys
from werkzeug.utils import secure_filename#This is used to extract the filename
from bson import ObjectId#This is used to convert the string into ObjectId
import pandas as pd
from utils import read_config,custom_logger
# Add the parent directory of `backend/` to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
#Now we can import like this
from database.signup_mongo import signup_mongo
config=read_config()
logger=custom_logger()
debug_signup=False
debug_login=False
logger.info(f"IN A API FILE")
app=Flask(__name__)
CORS(app)
signup_db_object=signup_mongo()
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
        user_dict={
            "fullName":fullName,
            "email":email,
            "password":password
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
        formData=request.get_json()
        if not formData:
            return jsonify({"error":"Invalid or Missing JSON"}),400
        email=formData.get("email")
        password_fetched=formData.get("password")
        if debug_login:
            print(f"This is the formData received from the frontend::{formData}")
        email_presence=signup_db_object.find_users(users_collection,{"email":email})
        # customer_id_from_email=email_presence["_id"]
        user_password_saved=""
        user_fullName=""
        object_id=""
        if debug_login:
            print(f"This is the email_presence::{email_presence} and type of the email_presence is::{type(email_presence)}")
        if email_presence :
            user_password_saved=email_presence["password"]
            user_fullName=email_presence["fullName"]
            object_id=str(email_presence["_id"])
            # print(f"This is the object id::{object_id}")
        else:
            return jsonify({"message":"User not registered. Please sign up first!!"}),404
        if user_password_saved==password_fetched:
            # print(f"Last step of log in")
            return jsonify({"message": "Logged in successfully!","email":email,"fullName":user_fullName,"object_id":object_id}), 200
        else:
            return jsonify({"message":'Incorrect Credentials'}),401
    except Exception as e:
        return jsonify({"error in login":str(e)}),500
@app.route("/api/upload_dataset",methods=["POST"])
def upload_dataset():
    try:
        print(f"In a upload dataset api.")
        file=request.files.get("file");
        object_id=request.form.get("object_id")
        #When you are fetching the files from the backend then use files
        print(f"This is the file:: {file}")
        print(f"This is the obejct is received from the data:: {object_id} and the type of the data is ::{type(object_id)}")
        dataset_directory_path="./dataset"
        # if not os.path.exists(dataset_directory_path):
        #     os.mkdir(dataset_directory_path)
        path_for_saving_file=os.path.join(dataset_directory_path,object_id)
        if not os.path.exists(path_for_saving_file):
            os.makedirs(path_for_saving_file)
        filename_1=secure_filename(file.filename)
        full_save_path=os.path.join(path_for_saving_file,filename_1)
        #Actually file.save works differently as the path should already be created before putting the file in it
        file.save(full_save_path)
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
                return jsonify({"message":"Path for saving teh dataset doesn't exist"}),404
            print(f"This is the path for saving the dataset:: {path_for_saving_the_data}")
            for root,dirs,files in os.walk(path_for_saving_the_data):
                    for file in files:
                        print(f"This is the file :: {file}")
                        full_path_for_saving_the_file=os.path.join(path_for_saving_the_data,file)
                        csv_data=pd.read_csv(full_path_for_saving_the_file).to_dict(orient="records")
                        # print(f"This is the csv data:: {csv_data}")
                        filename_without_extension = file.rsplit(".", 1)[0]
                        print(f"This is the name of the file::{filename_without_extension} and the type is ::{type(filename_without_extension)}")
                        dict_to_be_updated={"id":{"_id": ObjectId(object_id)},"set_csv_data":{"$set": {filename_without_extension: csv_data}}}
                        result=signup_db_object.update_users(users_collection,dict_to_be_updated)
                        print(f"This is the result:: {result}")
        return jsonify({"message":"file saved successfully!"}),201
    except Exception as e:
        return jsonify({"message":"doesn't received any formData"}),500
if __name__=="__main__":
    app.run(debug=True)
