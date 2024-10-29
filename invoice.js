const mainContainer = document.createElement("div");
mainContainer.classList.add("main-container");
document.body.appendChild(mainContainer);
const h3 = document.createElement("h3");
h3.innerHTML = "Total Order Receipt";
h3.classList.add("heading");
mainContainer.appendChild(h3);
const invoiceData = JSON.parse(localStorage.getItem("invoiceData"));
const itemsDetails = document.createElement("div");
itemsDetails.classList.add("section2");
mainContainer.appendChild(itemsDetails);
const name = document.createElement("div");
name.classList.add("items");
name.innerHTML = "Prodct Name";
const price = document.createElement("div");
price.classList.add("items");
price.innerHTML = "Price";

const quantity = document.createElement("div");
quantity.classList.add("items");
quantity.innerHTML = "Quantity";

const barcode = document.createElement("div");
barcode.classList.add("items");
barcode.innerHTML = "Barcode";

const total = document.createElement("div");
total.classList.add("items");
total.innerHTML = "Total";
itemsDetails.appendChild(name);
itemsDetails.appendChild(price);
itemsDetails.appendChild(quantity);
itemsDetails.appendChild(barcode);
itemsDetails.appendChild(total);

const displayInvoiceItems = () => {
  invoiceData.items.forEach((item) => {
    const itemRow = document.createElement("div");
    itemRow.classList.add("item-row");

    const productNameDiv = document.createElement("div");
    productNameDiv.classList.add("items");
    productNameDiv.innerHTML = item.productName;

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("items");
    priceDiv.innerHTML = item.price;

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("items");
    quantityDiv.innerHTML = item.quantity;

    const barcodeDiv = document.createElement("div");
    barcodeDiv.classList.add("items");
    barcodeDiv.innerHTML = item.barcode;

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("items");
    totalDiv.innerHTML = item.total;
    itemRow.appendChild(productNameDiv);
    itemRow.appendChild(priceDiv);
    itemRow.appendChild(quantityDiv);
    itemRow.appendChild(barcodeDiv);
    itemRow.appendChild(totalDiv);

    itemsDetails.appendChild(itemRow);
  });

  const summaryDiv = document.createElement("div");
  summaryDiv.classList.add("section1");

  summaryDiv.innerHTML = `
  <h3>Order Summary</h3>
  <p class="para">
    <span>Subtotal</span>
    <span>${invoiceData.totals.subTotal}</span>
  </p>
  <p class="para">
    <span>Sale Tax</span>
    <span>${invoiceData.totals.salesTax}</span>
  </p>
  <p class="para">
    <span>Discount</span>
    <span>${invoiceData.totals.discount}</span>
  </p>
  <p class="para">
    <span style="margin-right:-16px">Grand Total</span>
    <span>${invoiceData.totals.grandTotal}</span>
  </p>
`;

  mainContainer.appendChild(summaryDiv);
};

window.onload = displayInvoiceItems;
