# Program to extract number
# of rows using Python
import xlrd

# Give the location of the file
loc = ("./table 2222.xls")
R = float(input("RIDGE HEIGHT ="))
cata = int(input("cata ="))

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0) # 

start = [9,2]
ending = [23,2]
data = []
for i in range(ending[0]-start[0]):
    j = i+start[0]
    data.append(int(sheet.cell_value(j, start[1])))
i = 0
for j in range(len(data)-1):
    if R> data[j] and R<data[j+1]:
        i = j
        break
start0 = [start[0]+i,start[1]]
ending0 = [start0[0]+1,start0[1]]

# keys
print(sheet.cell_value(start0[0], start0[1])) # 20
print(sheet.cell_value(ending0[0], ending0[1])) # 30
start1 = [start[0]+i,start[1]+cata]
ending1 = [start1[0]+1,start1[1]]

# values
print(sheet.cell_value(start1[0], start1[1])) # 1.12
print(sheet.cell_value(ending1[0], ending1[1])) # 1.15

# Extracting number of rows
print(sheet.nrows)
