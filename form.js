/******* Client Side for building forms on page ************/
var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

if (typeof module != "undefined" && module.exports)
  module.exports = MOUNTAINS;

document.addEventListener('DOMContentLoaded', function(){document.body.appendChild(buildTable(MOUNTAINS));};

function buildTable(data) {
		var keys = Object.keys(data[0]);
		var table = document.createElement("table");
		
		var row = document.createElement("row");
		keys.forEach(function(field){
			var th = document.createElement("th");
			th.textContent = field;
			row.appendChild(th);
		});
		table.appendChild(row);
		data.forEach(function(item){
			row = document.createElement("tr");
			keys.forEach(function(field){
				var td = document.createElement("td");
				td.textContent = item[field];
				row.appendChild(td);
			});
			table.appendChild(row);
		});
		return table;
}