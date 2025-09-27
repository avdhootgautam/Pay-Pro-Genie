import yaml
import logging
import colorlog
import os
import pandas as pd
def read_config():
    with open("./config_backend.yaml","r") as file:
        config=yaml.safe_load(file)
    return config

def custom_logger():
    log_dir="./logs"
    if not os.path.exists(log_dir):
        os.mkdir(log_dir)

    #Create a logger
    logger=logging.getLogger("Mylogger")
    logger.setLevel(logging.DEBUG)
    if not logger.handlers:
        #Create a file handler and console handler for a logger
        file_handler=logging.FileHandler(os.path.join(log_dir,"app.log"))#Logs to a file
        console_handler=logging.StreamHandler()#Logs to console

        #Add the levels for the console and file
        file_handler.setLevel(logging.DEBUG)
        console_handler.setLevel(logging.DEBUG)

        #Now add the formatter for the file handlers
        color_formatter = colorlog.ColoredFormatter("%(log_color)s[%(asctime)s] [%(levelname)s] [%(name)s:%(lineno)d] - %(message)s%(reset)s")
        file_handler.setFormatter(color_formatter)
        console_handler.setFormatter(color_formatter)
        
        #Now add the handler to logger
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
    return logger 

logger=custom_logger()

def extract_file_information(csv_file_path):
    file_info={}

    file_size=os.path.getsize(csv_file_path)#Determine the file size of the csv file
    file_info["file_size"]=f"{file_size/(1024*1024):0.2f}MB"
    logger.info(f"This is the file size:{file_size}")

    df=pd.read_csv(csv_file_path)
    number_of_columns=df.shape[1]#Calcualting the number of columns
    file_info["number_of_columns"]=number_of_columns
    logger.info(f"This is the number_of_columns:{number_of_columns}")

    number_of_rows=df.shape[0]#Calculating the number of rows
    file_info["number_of_rows"]=number_of_rows
    logger.info(f"This is the number_of_rows:: {number_of_rows}")

    return file_info

def convert_dataframe_to_rows_and_columns_for_table(df):
    logger.info(f"IN UTILS")
    columns=[]
    columns.append({"field":"id","headerName":"id","width":90})
    
    # create the list of dict for all of the columns
    number_of_columns=df.columns
    logger.info(f"IN UTILS,Total number of columns received is:: {number_of_columns}")
    
    for col in df.columns:
        if df[col].dtype=="int64":
            # print(f"This is the column:: {col}")
            columns.append({"field":col,"headerName":col,"width":90,"type":"number"})
        else:
            columns.append({"field":col,"headerName":col,"width":90})
    

    # create the list of dict for all of the rows
    working_dict=df.to_dict(orient="records")
    index=1
    for element in working_dict:
        element["id"]=index
        index+=1
    #Here i will have to append the id as it is present in a column
    # print(f"This is the working dict:: {working_dict}")

    return working_dict,columns

def find_the_list_of_filenames(result_from_db):
    list_of_filenames=[]
    logger.info(f"In utils,This is the result from the db :: {result_from_db}")
    for key,value in result_from_db.items():
        print(f"This is the key::{key} and this is the value:: {value}")
        for element in value:
            list_of_filenames.append(element['fileInfo']['file_name'])
    print(f"This is the list of the filenames:: {list_of_filenames}")
    return list_of_filenames

def convert_list_of_dict_to_csv(filename,data):
    logger.info(f"In utils,this is the filename for which i am converting the list_of_dict to df:: {filename}")
    data_for_the_file=data['files'][0]['data']
    # logger.info(f"In utils,This is the data from where i will be extracting the list of dicts: {data_for_the_file}")
    object_id=str(data['_id'])

    # Convert back dict to df
    df=pd.DataFrame(data_for_the_file)

    #Save as csv
    path_for_saving_the_file=os.path.join("dataset_2",object_id,"previous")
    os.makedirs(path_for_saving_the_file,exist_ok=True)
    filename_to_save_csv=path_for_saving_the_file+"/"+filename
    df.to_csv(filename_to_save_csv,index=False)
    logger.debug(f"This is the data which will be direct")
    
    return df.head(10)