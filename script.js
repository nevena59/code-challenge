
var domain = "https://my-json-server.typicode.com/nevena59/code-challenge";
var outputDiv = document.getElementById("output");

function getEmplFrom(callback)
{
	return new Promise((reject, resolve)=>{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', domain + "/employees");
		xhr.onload = function(e)
		{
			if (this.status == 200)
			{
				reject(e);
				callback(e);
			}
            outputDiv.innerHTML = xhr.response;
			resolve(e);
		}

		xhr.send();
	});
}

getEmplFrom(function() {
    console.log('@@@@');
  });

function abRmnSal()
{
	//TODO returns salaries from json

}


function getEmployees()
{

	//TODO should be exposed function which returns array of employees => for example [{id:"id", "name":"test", "salary":""}]
}