from flask import Flask,request,jsonify
from flask_cors import CORS
import os,sys
# Add the parent directory of `backend/` to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
#Now we can import like this
from database.signup_mongo import signup_mongo
debug=True
app=Flask(__name__)
CORS(app)
@app.route("/api/signup",methods=["POST"])
def sign_up():
    try:
        formData=request.get_json()
        if not formData:
            return jsonify({"error":"Invalid or Missing JSON"}),400
        if debug:
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
        signup_db_object=signup_mongo();
        users_collection=signup_db_object.create_db_connection("signup_db","users")
        #Check whether the user is present or not
        user_presence=signup_db_object.find_users(users_collection,{"email":email})
        if user_presence:
            return jsonify({"message":"User Already exists"}),409
        signup_db_object.insert_users(users_collection,user_dict)
        return jsonify({"message": "User registered successfully!"}),201
    except Exception as e:
        return jsonify({"error in signup":str(e)}),500

if __name__=="__main__":
    app.run(debug=True)
