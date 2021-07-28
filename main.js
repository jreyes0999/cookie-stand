'use strict';

// Constructor for City location objects.
class City {
  constructor(cityNameArg, minCustomersPerHourArg, maxCustomersPerHourArg, avgCookiesPerCustomerArg) {
    this.cityName = cityNameArg;
    this.minCustomersPerHour = minCustomersPerHourArg;
    this.maxCustomersPerHour = maxCustomersPerHourArg;
    this.avgCookiesPerCustomer = avgCookiesPerCustomerArg;
    this.cookiesSoldPerHour = [];
  }


  // Method for generating random number of customers per hour.
  randomCustomersPerHour() {
    return Math.ceil(
      Math.random() * (this.maxCustomersPerHour - this.minCustomersPerHour + 1) +
      this.minCustomersPerHour
    );
  }


  // Method for estimating cookies sold per hour.
  estCookiesSoldPerHour() {
    for (let i = 0; i < salesHours.length; i++) {
      this.cookiesSoldPerHour.push(
        Math.ceil(this.randomCustomersPerHour() * this.avgCookiesPerCustomer)
      );
    }
    return this.cookiesSoldPerHour;
  }


  // Method for adding hourly sales in to a daily total.
  estCookiesSoldPerDay() {
    let totalCookies = 0;
    for (let i = 0; i < this.cookiesSoldPerHour.length; i++) {
      totalCookies += this.cookiesSoldPerHour[i];
    }
    this.cookiesSoldPerHour.push(totalCookies);
    return this.cookiesSoldPerHour;
  }


  // Method to loop through and render each City object's data in the table.
  render() {
    let salesTable = document.getElementById('sales-table');
    let salesTableRow = document.createElement('tr');
    let tableDataName = document.createElement('td');
    tableDataName.textContent = this.cityName;
    salesTableRow.appendChild(tableDataName);
    for (let i = 0; i < this.cookiesSoldPerHour.length; i++) {
      var tableDataCookies = document.createElement('td');
      tableDataCookies.textContent = this.cookiesSoldPerHour[i];
      salesTableRow.appendChild(tableDataCookies);
    }
    salesTable.appendChild(salesTableRow);
  }
}


// Create new City objects from City constructor.
var seattle = new City('Seattle', 23, 65, 6.3, []);
var memphis = new City('Memphis', 3, 24, 1.2, []);
var chicago = new City('Chicago', 11, 38, 3.7, []);
var atlanta = new City('Atlanta', 20, 38, 2.3, []);
var houston = new City('Houston', 2, 16, 4.6, []);


// Create array to include each City object.
var cityArray = [seattle, memphis, chicago, atlanta, houston];


// Create array to include hours of operation.
var salesHours = ['6am','7am','8am','9am','10am','11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

// Create function to render sales hours information in table.
function renderSalesHours() {
  let hoursTableHead = document.getElementById('sales-table-hours');
  let hoursTableRow = document.createElement('tr');
  let hoursTableEmpty = document.createElement('th');
  hoursTableRow.appendChild(hoursTableEmpty);
  for (let i = 0; i < salesHours.length; i++) {
    let hoursTableData = document.createElement('th');
    hoursTableData.textContent = salesHours[i];
    hoursTableRow.appendChild(hoursTableData);
  }
  let hoursTableTotal = document.createElement('th');
  hoursTableTotal.textContent = 'Daily Location Total';
  hoursTableRow.appendChild(hoursTableTotal);
  hoursTableHead.appendChild(hoursTableRow);
}


// Create function to print daily global sales totals on table row.
function renderGlobalSalesTotals() {
  let totalTable = document.getElementById('global-daily-total');
  let totalTableRow = document.createElement('tr');
  let totalTableName = document.createElement('td');
  totalTableName.textContent = 'Totals';
  totalTableRow.appendChild(totalTableName);
  var globalTotal = 0;
  for (let i = 0; i < salesHours.length; i++) {
    var hourlyTotal = 0;
    for (let j = 0; j < cityArray.length; j++) {
      hourlyTotal += cityArray[j].cookiesSoldPerHour[i];
    }
    var totalTableData = document.createElement('td');
    totalTableData.textContent = hourlyTotal;
    totalTableRow.appendChild(totalTableData);
    globalTotal += hourlyTotal;
  }
  var grandTotalTableData = document.createElement('td');
  grandTotalTableData.textContent = globalTotal;
  totalTableRow.appendChild(grandTotalTableData);
  totalTable.appendChild(totalTableRow);
}


// Create function to loop through each City object to perform methods.
function calcAndRenderSales() {
  for (let i = 0; i < cityArray.length; i++) {
    cityArray[i].estCookiesSoldPerHour();
    cityArray[i].estCookiesSoldPerDay();
    cityArray[i].render();
  }
}

// Create function to add new City data to table from form.
function newCityData(e) {
  // Prevent default "submit" event 
  e.preventDefault();

  // Pull values from form input fields.
  var nameValue = document.getElementById('input-name').value;
  var minCustValue = document.getElementById('input-min-cust').value;
  var maxCustValue = document.getElementById('input-max-cust').value;
  var avgCookieValue = document.getElementById('input-avg-cookies').value;

  // Asign values in creation of new City instance.
  var newCity = new City(nameValue, minCustValue, maxCustValue, avgCookieValue);

  // Perform math on new City instance and push in to cityArray.
  newCity.estCookiesSoldPerHour();
  newCity.estCookiesSoldPerDay();
  newCity.render();
  cityArray.push(newCity);

  // Render new totals row with updated maths things.
  var totalTable = document.getElementById('global-daily-total');
  totalTable.removeChild(totalTable.childNodes[0]);
  renderGlobalSalesTotals();

  // Reset the input fields in the form.
  cityForm.reset();
}

// Grab form element from html and assign it to a variable.
var cityForm = document.getElementById('add-city');

// Create event listener on form element "submit" event.
cityForm.addEventListener('submit', newCityData);

// Function calls.
renderSalesHours();
calcAndRenderSales();
renderGlobalSalesTotals();
