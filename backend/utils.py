import yaml
def read_config():
    with open("./config_backend.yaml","r") as file:
        config=yaml.safe_load(file)
    return config