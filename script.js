
var domain = "https://my-json-server.typicode.com/nevena59/code-challenge";
// var outputEmployees = document.getElementById("outputEmployees");
// var outputSalaries = document.getElementById("outputSalaries");
var endResult = document.getElementById("endResult");

function getEmplFrom(callback)
{
    return new Promise((resolve, reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', domain + "/employees");
        xhr.onload = function(e)
        {
            if (this.status == 200)
            {
                // outputEmployees.innerHTML = xhr.response;
                resolve(e);
            } else {
                reject(e);
                callback(e);
            }
        }
        xhr.send();
    });
}

function abRmnSal(callback)
{
    return new Promise((resolve, reject)=>{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', domain + "/salaries");
        xhr.onload = function(e)
        {
            if (this.status == 200)
            {
                // outputSalaries.innerHTML = xhr.response;
                resolve(e);
            } else {
                reject(e);
                callback(e);
            }
        }
        xhr.send();
    });
}


function mergeEmployeesAndSalaries() {
    return Promise.all([getEmplFrom(), abRmnSal()]).then(function (values) {
      const employees = JSON.parse(values[0].target.response);
      const salaries = JSON.parse(values[1].target.response);
      const mergedArray = employees.map(function (employee) {
        const salaryObj = salaries.find(function (salary) {
          return salary.employeeId === employee.id;
        });
        const salary = salaryObj ? salaryObj.salary : null;
        return {
          id: employee.id,
          name: employee.name,
          salary: salary,
        };
      });
      return mergedArray;
    });
  }

function orderBySalary(sortOrder) {
    return mergeEmployeesAndSalaries().then(function (mergedArray) {
        mergedArray.sort(function(a, b) {
            if (sortOrder === 'ascending') {
              return a.salary - b.salary;
            } else if (sortOrder === 'descending') {
              return b.salary - a.salary;
            } else {
                console.log('Wrong input');
            }
          });
        return mergedArray;
    });
}

function getEmployees(sortOrder) {
    return orderBySalary(sortOrder).then(function(sortedArray) {
      document.getElementById("endResult").innerHTML = JSON.stringify(sortedArray);
      return sortedArray;
    }).catch(function(error) {
      console.log(error);
    });
  }
  
getEmployees('ascending').then(function(result) {
    console.log(result);
  });

// getEmployees('descending').then(function(result) {
//     console.log(result);
//   });
  
  