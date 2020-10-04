import torch
import torch.nn as nn
import csv
import re
from torch.autograd import Variable

class LinearRegressionModel(nn.Module):
    def __init__(self, xdim, ydim):
        super(LinearRegressionModel, self).__init__() #this intializes the linear regression ML model from pytorch
        self.linear = nn.Linear(xdim, ydim) # defines the linear dimensions (in features/batch size)
        #in features is the dimensions of your tensor, and batch size is the number of tensors/inputs

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

date, state_hospital_data = getData("C:\VSCode Projects\MoreDickingAroundWithPython\estimated_inpatient_all_20201001_1424.csv", 'GA')

num_patients = []
time = []
for i in range(7):
    time.append([state_hospital_data[i][0]])
    num_patients.append([state_hospital_data[i][1]])

xData = Variable(torch.tensor(time)) #converts our data from a list into a tensor, which is just a glorifed form of multidimensional array (it will be one dimension in this case)
yData = Variable(torch.tensor(num_patients)) #Tensors are arrays of arrays! You need to remember that! A tensor can be 1 x 1 x 32 but since the transformation is 1x1 its fine 

model = LinearRegressionModel(1, 1)

criterion = torch.nn.MSELoss(size_average = False) #sets our loss function to mean squared error, which means that we will be measuring our loss thorugh the mean squared error of our line compared to our data
optimizer = torch.optim.SGD(model.parameters(), lr = 0.01) #sets our optimizer to stochastic gradient descent, fancy way of saying a randomized calculus based algorithm that minimizes MSE

for test in range(1000): #learning phase!
    optimizer.zero_grad() #zeros the optimizer gradient (effectively resets it)

    predicted_number_of_patients = model.linear(xData) #calculates the predicted number of patients 

    loss = criterion(predicted_number_of_patients, yData) #calculates how wrong the prediction is and stores it in our criterion object

    loss.backward() #performs a backward pass

    optimizer.step() #updates the weights


def test_num_patients_at_date(days_after_start):
    a = model(Variable(torch.tensor([[days_after_start]])))
    return a.item()

days_after = 14.0

print("There are "+ str(test_num_patients_at_date(days_after)) + " patients at the hospital " + str(days_after) + " days after the date of " + date)
print("Based off of this, you should order " + str(test_num_patients_at_date(days_after)/17) + " needles")

#both sides, ML for algorithm and front end/database for marketplace
#you can use express and react, shouldn't be too difficult
#track certain diseases, certain people, ages, all sorts of shit once we have valid data 

# start on simple layout and backend in react and express to have a system where you can upload a certain product/device for others
# to click on and buy
# start on simple ML algorithm to predict number of customers (don't worry about extra features, just focus on a simple 1:1 linreg model)

