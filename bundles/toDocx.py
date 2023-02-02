import sys
import os
import json
from docxtpl import DocxTemplate

def toDocx(templatePath:str, content:str, outputPath:str, name:str) :
    content = json.loads(content)
    template = DocxTemplate(templatePath)
    print(content)
    template.render(content)
    if not os.path.exists(outputPath+f"/{content['sheet']}") :
        os.makedirs(outputPath+f"/{content['sheet']}")
    if not os.path.exists(outputPath+f"/{content['sheet']}/{content['worksheet']}") :
        os.makedirs(outputPath+f"/{content['sheet']}/{content['worksheet']}")
    template.save(outputPath+f"/{content['sheet']}/{content['worksheet']}/"+f"{name}.docx")
    print("Success")

def main():
    templatePath = sys.argv[1]
    content = sys.argv[2]
    outputPath = sys.argv[3]
    name = sys.argv[4]
    toDocx(templatePath, content, outputPath, name)

if __name__ == "__main__": 
    main()
