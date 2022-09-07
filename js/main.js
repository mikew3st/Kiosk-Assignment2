/* Self-order Kiosk
  Assignment 2
  Author: Michael Westmacott, 2022.06.01: Created
*/

// delare constant variables like product information that will not change
const priceProductOne = 5;
const priceProductTwo = 25;
const priceProductThree = 40;
const priceProductFour = 60;
const productOneDescription = `Mouse Pad`;
const productTwoDescription = `Webcam`;
const productThreeDescription = `Keyboard`;
const productFourDescription = `Boombox`;
const GST = 0.13;
const docOutput = document.getElementById('myOutput');

// declare global variables that will be populated when user cals function on form submit
var subTotal = '';
var taxTotal = '';
var totalBill = '';
var customerFirstName = '';
var customerLastName = '';
var customerPhoneNumber = '';
var customerCardNumber = '';
var customerCardExpiryMonth = '';
var customerCardExpiryYear = '';
var orderQtyOne = 0;
var orderQtyTwo = 0;
var orderQtyThree = 0;
var orderQtyFour = 0;
var customerLastName = '';

// purpose is to pass input when user submits the form into variables
function submitForm() {
  customerFirstName = document.getElementById('customerFirstName').value;
  customerLastName = document.getElementById('customerLastName').value;
  customerPhoneNumber = document.getElementById('customerPhoneNumber').value;
  customerCardNumber = document.getElementById('customerCardNumber').value;
  customerCardExpiryMonth = document.getElementById(
    'customerCardExpiryMonth'
  ).value;
  customerCardExpiryYear = document.getElementById(
    'customerCardExpiryYear'
  ).value;
  orderQtyOne = document.getElementById('orderQtyOne').value;
  orderQtyTwo = document.getElementById('orderQtyTwo').value;
  orderQtyThree = document.getElementById('orderQtyThree').value;
  orderQtyFour = document.getElementById('orderQtyFour').value;

  customerFirstName = customerFirstName.trim();
  customerLastName = customerLastName.trim();

  formValidation();
  return false;
}

// purpose is to validate the users input and display errors
function formValidation() {
  let errors = '';
  let lettersRegex = /^[A-Za-z]+$/;
  //phone # expression taken from power point slides PROG8020_week04b. eConestoga.
  let phoneRegex = /^\(?(\d{3})\)?[\.\-\/\s]?(\d{3})[\.\-\/\s]?(\d{4})$/;
  let cardNumberRegex =
    /^([1-9][0-9]{3})[\-]?([0-9]{4})[\-]?([0-9]{4})[\-]?([0-9]{4})$/;
  let cardMonthRegex = /^(0[1-9]|1[0-2])$/;
  // check expiry year within 2022 - 2199
  let cardYearRegex = /^([2][0-1][2-9][2-9])$|^([2][0-1][3-9][0-9])$/;
  let qtyRegex = /^$|[0-9]+$/;

  // test input vs. validatons and output error message if failed
  if (!lettersRegex.test(customerFirstName)) {
    errors += `Please provide a first name! <br>`;
    document.getElementById('customerFirstName').style.backgroundColor =
      'yellow';
  } else {
    document.getElementById('customerFirstName').style.backgroundColor =
      'white';
  }
  if (!lettersRegex.test(customerLastName)) {
    errors += `Please provide a last name! <br>`;
    document.getElementById('customerLastName').style.backgroundColor =
      'yellow';
  } else {
    document.getElementById('customerLastName').style.backgroundColor = 'white';
  }
  if (!phoneRegex.test(customerPhoneNumber)) {
    errors += `Please provide a valid phone number! <br>`;
    document.getElementById('customerPhoneNumber').style.backgroundColor =
      'yellow';
  } else {
    document.getElementById('customerPhoneNumber').style.backgroundColor =
      'white';
  }
  if (!cardNumberRegex.test(customerCardNumber)) {
    errors += `Please provide a valid credit card number! <br>`;
    document.getElementById('customerCardNumber').style.backgroundColor =
      'yellow';
  } else {
    document.getElementById('customerCardNumber').style.backgroundColor =
      'white';
  }
  if (!cardMonthRegex.test(customerCardExpiryMonth)) {
    errors += `Please enter valid credit card expiry month! <br>`;
    document.getElementById('customerCardExpiryMonth').style.backgroundColor =
      'yellow';
  } else {
    document.getElementById('customerCardExpiryMonth').style.backgroundColor =
      'white';
  }
  if (!cardYearRegex.test(customerCardExpiryYear)) {
    errors += `Please enter valid credit card expiry year! <br>`;
    document.getElementById('customerCardExpiryYear').style.backgroundColor =
      'yellow';
  } else {
    document.getElementById('customerCardExpiryYear').style.backgroundColor =
      'white';
  }
  if (
    !qtyRegex.test(orderQtyOne) |
    !qtyRegex.test(orderQtyTwo) |
    !qtyRegex.test(orderQtyThree) |
    !qtyRegex.test(orderQtyFour)
  ) {
    errors += `Please enter a number for item quantity! <br>`;
  }
  if (
    (orderQtyOne < 0) |
    (orderQtyTwo < 0) |
    (orderQtyThree < 0) |
    (orderQtyFour < 0)
  ) {
    errors += `Please enter positive numbers only for item quantity! <br>`;
  }
  subTotal =
    orderQtyOne * priceProductOne +
    orderQtyTwo * priceProductTwo +
    orderQtyThree * priceProductThree +
    orderQtyFour * priceProductFour;
  if (subTotal < 10) {
    errors += `There is a minimum order value of $10! <br>`;
  }
  // Statement to generate and output receipt if there are no errors
  if (errors !== '') {
    docOutput.style.display = 'block';
    docOutput.style.color = 'yellow';
    docOutput.innerHTML = errors;
  } else {
    getReceipt();
  }

  //  when input passes validation populate and display the receipt table
  function getReceipt() {
    let receipt = '';
    taxTotal = subTotal * GST;
    totalBill = subTotal + taxTotal;
    subTotal = subTotal.toFixed(2);
    taxTotal = taxTotal.toFixed(2);
    totalBill = totalBill.toFixed(2);
    receipt += `
    <h2> Receipt </h2> <br>
    <table>
    <tr>
      <th>Name</th>
      <td>${customerFirstName + ' ' + customerLastName}</td>
      <th>Phone #</th>
      <td>${customerPhoneNumber}</td>
    </tr>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Unit Price</th>
      <th>Total Price</th>
    </tr>`;
    if (orderQtyOne > 0) {
      receipt += `
    <tr>
      <td>${productOneDescription}</td>
      <td>${orderQtyOne}</td>
      <td>$${priceProductOne}</td>
      <td>$${orderQtyOne * priceProductOne}</td>
    </tr>`;
    }
    if (orderQtyTwo > 0) {
      receipt += `
    <tr>
      <td>${productTwoDescription}</td>
      <td>${orderQtyTwo}</td>
      <td>$${priceProductTwo}</td>
      <td>$${orderQtyTwo * priceProductTwo}</td>
    </tr>`;
    }
    if (orderQtyThree > 0) {
      receipt += `
    <tr>
      <td>${productThreeDescription}</td>
      <td>${orderQtyThree}</td>
      <td>$${priceProductThree}</td>
      <td>$${orderQtyThree * priceProductThree}</td>
    </tr>`;
    }
    if (orderQtyFour > 0) {
      receipt += `
    <tr>
      <td>${productFourDescription}</td>
      <td>${orderQtyFour}</td>
      <td>$${priceProductFour}</td>
      <td>$${orderQtyFour * priceProductFour}</td>
    </tr>`;
    }
    receipt += `
    <tr>
      <th class="table-right" colspan="3">Sub Total</th>
      <td class="table-right" >$${subTotal}</td>
    </tr>
    <tr>
      <th class="table-right" colspan="3">GST</>
      <td class="table-right">$${taxTotal}</td>
    </tr>
    <tr>
      <th class="table-right" colspan="3">Total</th>
      <td class="table-right">$${totalBill}</td>
    </tr>
    </table> <br>`;

    // Edit DOM to make myOutput div visible and display receipt table
    docOutput.style.display = 'block';
    docOutput.style.color = 'white';
    docOutput.innerHTML = receipt;
  }
}

// Function called when clear submit button is clicked that hides output and styles input fields back to white background
function clearBtn() {
  docOutput.style.display = 'none';
  document.getElementById('customerFirstName').style.backgroundColor = 'white';
  document.getElementById('customerLastName').style.backgroundColor = 'white';
  document.getElementById('customerPhoneNumber').style.backgroundColor =
    'white';
  document.getElementById('customerCardNumber').style.backgroundColor = 'white';
  document.getElementById('customerCardExpiryMonth').style.backgroundColor =
    'white';
  document.getElementById('customerCardExpiryYear').style.backgroundColor =
    'white';
}
