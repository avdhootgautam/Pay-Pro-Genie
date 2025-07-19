from flask import Flask,request,jsonify
from flask_cors import CORS
import os,sys
from werkzeug.utils import secure_filename#This is used to extract the filename
# Add the parent directory of `backend/` to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
#Now we can import like this
from database.signup_mongo import signup_mongo
debug_signup=False
debug_login=True
app=Flask(__name__)
CORS(app)
signup_db_object=signup_mongo();
users_collection=signup_db_object.create_db_connection("signup_db","users")
@app.route("/api/signup",methods=["POST"])
def sign_up():
    try:
        formData=request.get_json()
        if not formData:
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
        if debug_login:
            print(f"This is the email_presence::{email_presence} and type of the email_presence is::{type(email_presence)}")
        if email_presence :
            user_password_saved=email_presence["password"]
            user_fullName=email_presence["fullName"]
        else:
            return jsonify({"message":"User not registered. Please sign up first!!"}),404
        if user_password_saved==password_fetched:
            return jsonify({"message": "Logged in successfully!","email":email,"fullName":user_fullName}), 200
        else:
            return jsonify({"message":'Incorrect Credentials'}),401
    except Exception as e:
        return jsonify({"error in login":str(e)}),500
@app.route("/api/upload_dataset",methods=["POST"])
def upload_dataset():
    try:
        print(f"In a upload dataset api.")
        file=request.files.get("file");
        #When you are fetching the files from the backend then use files
        # print(f"This is the file:: {file}")
        dataset_directory_path="./dataset"
        if not os.path.exists(dataset_directory_path):
            os.mkdir(dataset_directory_path)
        filename_1=secure_filename(file.filename)
        file.save(f"{dataset_directory_path}/{filename_1}")
        if not file:
            return jsonify({"message":"File does not received at the backend"}),404
        return jsonify({"message":"File received at the backend"}),201
    except Exception as e:
        return jsonify({"message":"e"}),500
@app.route("/api/save-file",methods=["POST"])
def save_file():
    try:
        userData=request.get_json()
        # print(f"This is the formData received at the backend:: {formData}");
        user_presence=signup_db_object.find_users(users_collection,{"email":userData["email"]})
        print(f"This is for user is present or not:: {user_presence}")
        object_id
        return jsonify({"message":"file saved successfully!"}),201
    except Exception as e:
        return jsonify({"message":"doesn't received any formData"}),500
if __name__=="__main__":
    app.run(debug=True)
