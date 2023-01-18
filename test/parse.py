import sys
import gspread

def openSpreadSheet(cerdPath) :
    account = gspread.service_account(cerdPath)
    listOfSheets = [data['name'] for data in account.list_spreadsheet_files()]
    for sheet in listOfSheets :
        print(sheet)

def main() :
    cerdPath = sys.argv[1]
    openSpreadSheet(cerdPath)

if __name__ == "__main__" :
    main()
