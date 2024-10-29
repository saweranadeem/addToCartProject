const add = document.getElementById("add");
const remove = document.getElementById("remove");
const barcodeInput = document.querySelector("#barcode");
add.disabled = true;
remove.disabled = true;

barcodeInput.addEventListener("input", () => {
  if (barcodeInput.value.trim() !== "") {
    add.disabled = false;
  } else {
    add.disabled = true;
  }
});

remove.addEventListener("click", () => {
  if (confirm("Do You want to cancel the order?")) {
    document.querySelector("#barcode").value = "";
    add.disabled = true;
    remove.disabled = true;
    const productRows = document.querySelectorAll(".rowField");
    productRows.forEach((row) => row.remove());
    const subTotalData = document.querySelectorAll(".subtotal");
    subTotalData.forEach((sub) => sub.remove());
  }
});

const itemData = [
  {
    productName: "Laptop",
    image: "laaaptop.webp",
    productPrice: "100.00",
    Barcode: "110011",
  },
  {
    productName: "Airbuds",
    image: "airbuds.webp",
    productPrice: "200.00",
    Barcode: "101011",
  },
  {
    productName: "Ipad",
    image: "ipad.jpg",
    productPrice: "300.00",
    Barcode: "110110",
  },
  {
    productName: "Phone",
    image: "phone.jpeg",
    productPrice: "400.00",
    Barcode: "111001",
  },
  {
    productName: "Airpods",
    image: "airpods.jpeg",
    productPrice: "500.00",
    Barcode: "101010",
  },
];
const showAction = () => {
  const existingCards = document.querySelector(".cards");
  if (existingCards) {
    existingCards.classList.toggle("hidden");
  } else {
    const cards = document.createElement("div");
    cards.classList.add("cards");

    itemData.forEach((product) => {
      const title = document.createElement("p");
      const image = document.createElement("img");
      const price = document.createElement("p");
      const Barcode = document.createElement("p");
      title.innerHTML = product.productName;
      image.src = product.image;
      image.classList.add("image");
      image.classList.add("item");
      title.classList.add("item");
      image.classList.add("item");
      price.classList.add("item");
      Barcode.classList.add("item");
      price.innerHTML = product.productPrice;
      Barcode.innerHTML = product.Barcode;
      const card = document.createElement("div");
      card.classList.add("card");
      card.appendChild(title);
      card.appendChild(image);
      card.appendChild(price);
      card.appendChild(Barcode);
      cards.appendChild(card);
      Barcode.addEventListener("click", () => {
        document.querySelector("#barcode").value = product.Barcode;
        add.disabled = false;
        remove.disabled = false;
      });
    });
    document.body.appendChild(cards);
  }
};
const displayProduct = (product) => {
  const existingRows = document.querySelectorAll(".rowField");
  for (let row of existingRows) {
    const rowBarcode = row.querySelector(".items:nth-child(4)").innerHTML;
    if (rowBarcode === product.Barcode) {
      const quantitySpan = row.querySelector(".quantity-container span");
      const totalDiv = row.querySelector(".items:last-child");
      const currentQty = parseInt(quantitySpan.innerHTML);
      quantitySpan.innerHTML = currentQty + 1;
      totalDiv.innerHTML = (
        parseFloat(product.productPrice) *
        (currentQty + 1)
      ).toFixed(2);
      return;
    }
  }

  let row = document.createElement("div");
  row.classList.add("rowField");

  const productName = document.createElement("div");
  productName.innerHTML = product.productName;
  productName.classList.add("items");

  const price = document.createElement("div");
  price.innerHTML = product.productPrice;
  price.classList.add("items");

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("items", "quantity-container", "disc");

  const quantity = document.createElement("span");
  quantity.style.width = "40px";
  quantity.style.height = "17px";
  quantity.innerHTML = "1";

  const total = document.createElement("div");
  total.innerHTML = product.productPrice;
  total.classList.add("items");

  const plsBtn = document.createElement("button");
  plsBtn.innerHTML = "+";
  plsBtn.classList.add("butns");
  plsBtn.onclick = () => {
    let currentQty = parseInt(quantity.innerHTML);
    currentQty++;
    quantity.innerHTML = currentQty;
    total.innerHTML = (parseFloat(product.productPrice) * currentQty).toFixed(
      2
    );

    calculateInvoice();
  };

  const minusBtn = document.createElement("button");
  minusBtn.innerHTML = "-";
  minusBtn.classList.add("butns");
  minusBtn.onclick = () => {
    let currentQty = parseInt(quantity.innerHTML);
    if (currentQty >= 1) {
      currentQty--;
      quantity.innerHTML = currentQty;
      total.innerHTML = (parseFloat(product.productPrice) * currentQty).toFixed(
        2
      );
    }
    if (currentQty === 0) {
      row.remove();
      const remainingRows = document.querySelectorAll(".rowField");
      if (remainingRows.length === 0) {
        const subTotalData = document.querySelectorAll(".subtotal");
        subTotalData.forEach((sub) => sub.remove());
        document.querySelector("#barcode").value = "";
        remove.disabled = true;
      }
    } else {
      calculateInvoice();
    }
  };

  quantityContainer.appendChild(minusBtn);
  quantityContainer.appendChild(quantity);
  quantityContainer.appendChild(plsBtn);

  const barcode = document.createElement("div");
  barcode.innerHTML = product.Barcode;
  barcode.classList.add("items");

  row.appendChild(productName);
  row.appendChild(price);
  row.appendChild(quantityContainer);
  row.appendChild(barcode);
  row.appendChild(total);

  document.querySelector(".section2").appendChild(row);
  remove.disabled = false;
};

const calculateInvoice = () => {
  const existingSubtotals = document.querySelectorAll(".subtotal");
  existingSubtotals.forEach((subtotal) => subtotal.remove());
  let totalAmount = 0;
  let totalSalesTax = 0;
  let totalDisc = 0;
  let grandTotal = 0;
  const rows = document.querySelectorAll(".rowField");
  rows.forEach((row) => {
    const price = parseFloat(
      row.querySelector(".items:nth-child(2)").innerHTML
    );
    const quantity = parseInt(
      row.querySelector(".quantity-container span").innerHTML
    );
    const totals = price * quantity;
    const salesTax = totals * 0.16;
    const disc = totals * 0.1;
    const finalTotal = totals + salesTax - disc;
    totalAmount += totals;
    grandTotal += finalTotal;

    totalSalesTax += salesTax;
    totalDisc += disc;
  });

  const subTotal = document.createElement("div");
  subTotal.classList.add("subtotal");
  const section3 = document.createElement("div");
  section3.classList.add("section3");
  const h3 = document.createElement("h3");
  h3.innerHTML = "Total Bill price";
  const sbTotal = document.createElement("div");

  sbTotal.innerHTML = "Sub Total";
  sbTotal.classList.add("item");
  const value1 = document.createElement("div");
  value1.innerHTML = `${totalAmount.toFixed(2)}`;
  value1.classList.add("item");
  const tax = document.createElement("div");
  tax.innerHTML = "SaleTax(16%)";
  tax.classList.add("item");
  const value2 = document.createElement("div");
  value2.innerHTML = `${totalSalesTax.toFixed(2)}`;
  value2.classList.add("item");

  const discount = document.createElement("div");
  discount.innerHTML = "Discount(10%)";
  discount.classList.add("item");
  const value3 = document.createElement("div");
  value3.innerHTML = `${totalDisc.toFixed(2)}`;
  value3.classList.add("item");
  const grandtotal = document.createElement("div");
  grandtotal.innerHTML = "Grand Total";
  grandtotal.classList.add("item");
  const value4 = document.createElement("div");
  value4.innerHTML = `${grandTotal.toFixed(2)}`;
  value4.classList.add("item");
  const button = document.createElement("button");
  button.innerHTML = "Confirm Order";
  button.classList.add("confirm");
  button.onclick = () => {
    if (confirm("Are you sure you want to confirm the order?")) {
      getInvoiceDetails();
      document.querySelector("#barcode").value = "";
      window.location.href = "invoice.html";
    }
  };

  document.body.appendChild(subTotal);
  subTotal.appendChild(h3);
  subTotal.appendChild(section3);
  section3.appendChild(sbTotal);
  section3.appendChild(value1);
  section3.appendChild(tax);
  section3.appendChild(value2);
  section3.appendChild(discount);
  section3.appendChild(value3);
  section3.appendChild(grandtotal);
  section3.appendChild(value4);
  subTotal.appendChild(button);
};

add.addEventListener("click", () => {
  const barcode = document.querySelector("#barcode").value;
  let productFind = itemData.find((product) => product.Barcode === barcode);
  if (productFind) {
    displayProduct(productFind);
    document.querySelector("#barcode").value = "";
    calculateInvoice();
  } else if (barcode == "") {
    alert("Enter a barcode");
  } else {
    alert("Product not found!");

    document.querySelector("#barcode").value = "";
  }

  const cards = document.querySelector(".cards");
  if (cards) {
    cards.classList.add("hidden");
  }
});
const getInvoiceDetails = () => {
  const invoiceData = {
    items: [],
    totals: {},
  };
  const rows = document.querySelectorAll(".rowField");
  rows.forEach((row) => {
    invoiceData.items.push({
      productName: row.querySelector(".items:nth-child(1)").innerHTML,
      price: row.querySelector(".items:nth-child(2)").innerHTML,
      quantity: row.querySelector(".quantity-container span").innerHTML,
      barcode: row.querySelector(".items:nth-child(4)").innerHTML,
      total: row.querySelector(".items:last-child").innerHTML,
    });
  });

  invoiceData.totals = {
    subTotal: document.querySelector(".section3 .item:nth-child(2)").innerHTML,
    salesTax: document.querySelector(".section3 .item:nth-child(4)").innerHTML,
    discount: document.querySelector(".section3 .item:nth-child(6)").innerHTML,
    grandTotal: document.querySelector(".section3 .item:nth-child(8)")
      .innerHTML,
  };

  localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
};
