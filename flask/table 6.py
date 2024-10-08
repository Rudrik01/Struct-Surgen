# Program to extract number
# of rows using Python
import xlrd

# Give the location of the file
loc = ("./table 6666.xls")
E = float(input("RIDGE H ="))
S = float(input("RIDGE W ="))
A = float(input("RIDGE apha ="))

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0) # 

# sheet.cell_value(j, start[1])
START = [9,3]

hw = E/S
print('h/w',hw)

if hw <= 1/2:
    pass
elif hw <= 3/2:
    START[0]+=7
elif hw < 6:
    START[0]+=14
print(START)

alpha_dc = {0:0,5:1,10:2,20:3,30:4,45:5,60:6}
for k in alpha_dc.keys():
    if A == 0:
        break
    if A==60:
        START[0]+=5
        break
    if A <= k:
        START[0]+=alpha_dc[k]-1
        break
print(START)
ABCD0 = []
ABCD90 = []
for i in range(4):
    ABCD0.append(float(sheet.cell_value(START[0], START[1]+i)))
    ABCD90.append(float(sheet.cell_value(START[0]+1, START[1]+i)))
print(ABCD0)
print(ABCD90)


XX = float(sheet.cell_value(START[0], START[1]-1))
XY = float(sheet.cell_value(START[0]+1, START[1]-1))
print(XX,XY)

Z1 = ((A-XX) * ((ABCD90[0])-(ABCD0[0])))/((XY-XX))
Z2 = ((A-XX) * ((ABCD90[1])-(ABCD0[1])))/((XY-XX))
Z1 = Z1 + ABCD0[0]
Z2 = Z2 + ABCD0[1]
print(Z1)
print(Z2)