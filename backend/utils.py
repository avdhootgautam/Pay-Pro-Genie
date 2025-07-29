import yaml
import logging
import colorlog
import os
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
        console_handler.setLevel(logging.INFO)

        #Now add the formatter for the file handlers
        color_formatter = colorlog.ColoredFormatter("%(log_color)s[%(asctime)s] [%(levelname)s] [%(name)s:%(lineno)d] - %(message)s%(reset)s")
        file_handler.setFormatter(color_formatter)
        console_handler.setFormatter(color_formatter)
        
        #Now add the handler to logger
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
    return logger 