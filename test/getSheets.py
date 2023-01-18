import sys
import gspread

def getSheets(cerdPath, sheetName) :
    account = gspread.service_account(cerdPath)
    sheet = account.open(sheetName)
    worksheetslist = sheet.worksheets()
    for worksheet in worksheetslist :
        print(worksheet.title)

def main() :
    cerdPath = sys.argv[1]
    sheetName = sys.argv[2]
    getSheets(cerdPath, sheetName)

if __name__ == "__main__" :
    main()
