# Program to extract number
# of rows using Python
import xlrd

# Give the location of the file
loc = ("./table 5555.xls")
E= float(input("RIDGE H ="))
S = float(input("RIDGE W ="))
L = float(input("RIDGE L ="))

wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0) # 

# sheet.cell_value(j, start[1])
START = [7,4]

hw = E/S
lw = L/S
print('h/w',hw)
print('l/w',lw)
if hw <= 1/2:
    pass
elif hw <= 3/2:
    START[0]+=4
elif hw < 6:
    START[0]+=8
else:
    START[0]+=12

if START[0] < 19:
    if lw <= 3/2:
        pass
    elif lw <4:
        START[0]+=2
else:
    if lw == 3/2:
        pass
    elif lw == 1:
        START[0] += 2
    else:
        START[0] += 4
    
ABCD0 = []
ABCD90 = []
for i in range(4):
    ABCD0.append(float(sheet.cell_value(START[0], START[1]+i)))
    ABCD90.append(float(sheet.cell_value(START[0]+1, START[1]+i)))

print(ABCD0)
print(ABCD90)

print(ABCD0[0])
print(ABCD90[0])