import gspread
import sys


def changeState(cerdPath, sheetName, worksheet, index):
    account = gspread.service_account(cerdPath)
    sheet = account.open(sheetName)
    worksheet = sheet.worksheet(worksheet)
    worksheet.update(index, "Downloaded")


def main():
    cerdPath = sys.argv[1]
    sheetName = sys.argv[2]
    workSheet = sys.argv[3]
    index = sys.argv[5]
    changeState(cerdPath, sheetName, workSheet, index)


if __name__ == "__main__":
    main()
