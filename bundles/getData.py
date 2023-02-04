import json
import sys
import gspread
import string


def getData(cerdKey):
    account = gspread.service_account(cerdKey)
    spreadsheetList = account.list_spreadsheet_files()
    returnValue = []
    for sheet in spreadsheetList:
        worksheetList = account.open(sheet["name"]).worksheets()
        for worksheetnum, worksheet in enumerate(worksheetList):
            dataList = account.open(sheet["name"]).worksheet(worksheet.title).get_all_records()
            dataList = [{str(key): str(value) for key,value in data.items()} for data in dataList]
            for index, data in enumerate(dataList):
                data.update(
                    {"sheet": sheet["name"],
                     "worksheet": worksheet.title}
                )
                if data.get("Status"):
                    data.update(
                        {"index": f'{string.ascii_uppercase[list(data.keys()).index("Status")]}{index+2}'}
                    )
            returnValue += dataList
    returnValue = json.dumps(returnValue)
    print(returnValue)


def main():
    cerdKey = sys.argv[1]
    getData(cerdKey)


if __name__ == "__main__":
    main()
