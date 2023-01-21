import sys
import json
from docxtpl import DocxTemplate

def toDocx(templatePath:str, content:str, outputPath:str) :
    content = json.loads(content)
    template = DocxTemplate(templatePath)
    print(content)
    template.render(content)
    template.save(outputPath+"/"+"test.docx")
    print("Success")

def main():
    templatePath = sys.argv[1]
    content = sys.argv[2]
    outputPath = sys.argv[3]
    toDocx(templatePath, content, outputPath)

if __name__ == "__main__": 
    main()