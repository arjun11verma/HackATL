import torch
import torch.nn as nn
import csv
import re
from torch.autograd import Variable

class LinearRegressionModel(nn.Module):
    def __init__(self, xdim, ydim):
        super(LinearRegressionModel, self).__init__()
        self.linear = nn.Linear(xdim, ydim) 
    def forward(self, x):
        y_prediction = self.linear(x)
        return y_prediction
def getData(link, state):
    l = []
    count = 0
    yearBase = 0
    with open(link, 'r') as csvfile:
        reader = csv.reader(csvfile, delimiter = ' ')
        for row in reader:
            a = re.split(",", row[0], 2)
            if(a[0] == state):
                b = re.split("\"", a[2], 2)
                c = re.split("-", a[1])
                for i in range(3):
                    c[i] = float(c[i])
                t = (c[0] * 365 + c[1] * 30 + c[2])
                if(count == 0):
                    yearBase = t
                    date = a[1]
                l.append([t, float(re.sub(",", "", b[1]))])
                count += 1
    for i in range(len(l)):
        l[i][0] -= yearBase
    return date, l

date, state_hospital_data = getData("C:\VSCode Projects\HackATL\HospitalDataAnalysis\estimated_inpatient_all_20201001_1424.csv", 'GA')

num_patients = []
time = []
for i in range(7):
    time.append([state_hospital_data[i][0]])
    num_patients.append([state_hospital_data[i][1]])

xData = Variable(torch.tensor(time)) 
yData = Variable(torch.tensor(num_patients)) 

model = LinearRegressionModel(1, 1)

criterion = torch.nn.MSELoss(size_average = False) 
optimizer = torch.optim.SGD(model.parameters(), lr = 0.01)
for test in range(1000): #learning phase
    optimizer.zero_grad() #zeros the optimizer gradient (effectively resets it)
    predicted_number_of_patients = model.linear(xData) #calculates the predicted number of patients 
    loss = criterion(predicted_number_of_patients, yData) #calculates how wrong the prediction is and stores it in our criterion object
    loss.backward() #performs a backward pass
    optimizer.step() #updates the weights
def test_num_patients_at_date(days_after_start):
    a = model(Variable(torch.tensor([[days_after_start]])))
    return a.item()

days_after = 14.0
patients_per_needle = 17.0

print("There are "+ str(round(test_num_patients_at_date(days_after), 0)) + " patients at the hospital " + str(days_after) + " days after the date of " + date)
print("Based off of this, you should order " + str(round(test_num_patients_at_date(days_after)/patients_per_needle, 0)) + " needles, assuming that you use one needle per " + str(patients_per_needle) + " patients daily.")

