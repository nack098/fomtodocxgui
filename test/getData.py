import sys
import gspread

def getData(cerdPath, sheetName, worksheetName) :
    account = gspread.service_account(cerdPath)
    sheet = account.open(sheetName)
    worksheet = sheet.worksheet(worksheetName)
    records = worksheet.get_all_records()
    for record in records :
        print(record)

def main() :
    cerdPath = sys.argv[1]
    sheetName = sys.argv[2]
    worksheetName = sys.argv[3]
    getData(cerdPath, sheetName, worksheetName)

if __name__ == "__main__" :
    main()
