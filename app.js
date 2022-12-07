// function makeNavigable(
//   tableId = "navigableTable",
//   activeCell = 0,
//   focus_navTable_onLoad = true
// ) {
//   var navTable = document.getElementById(tableId);

//   navTable.setAttribute("tabindex", -1);

//   navTable.addEventListener("focus", function () {
//     var focusedTable = document.querySelector("#" + tableId + ":focus");
//     if (focusedTable) {
//       focusedTable.style.outline = "none";
//     }
//   });

//   if (focus_navTable_onLoad) {
//     navTable.focus();
//   }

//   var cells = navTable.querySelectorAll("tr td");

//   var active = activeCell;

//   makeCellActive();

//   // write 1,2,3... in the 'td's and add clickListener
//   for (var i = 0; i < cells.length; i++) {
//     if (!cells[i].innerHTML) {
//       cells[i].innerHTML = i;
//     }
//     cells[i].addEventListener("click", function (e) {
//       active = Array.prototype.indexOf.call(cells, e.target);
//       makeCellActive();
//     });
//   }

//   navTable.addEventListener("keydown", function (e) {
//     if (e.keyCode == 37 || 38 || 39 || 40) {
//       calculateActiveCell(e);
//       makeCellActive();
//       return false;
//     }
//   });

//   function calculateActiveCell(e) {
//     var rows = navTable.querySelectorAll("tr").length;
//     var columns = navTable.querySelectorAll("tr")[0].childElementCount;

//     if (e.keyCode == 37) {
//       //move left or wrap
//       active = active > 0 ? active - 1 : active;
//     }
//     if (e.keyCode == 38) {
//       // move up
//       active = active - columns >= 0 ? active - columns : active;
//     }
//     if (e.keyCode == 39) {
//       // move right or wrap
//       active = active < cells.length - 1 ? active + 1 : active;
//     }
//     if (e.keyCode == 40) {
//       // move down
//       active = active + columns <= cells.length - 1 ? active + columns : active;
//     }
//   }

//   function makeCellActive() {
//     var activeTDs = navTable.querySelectorAll(".active");
//     for (var i = 0; i < activeTDs.length; i++) {
//       activeTDs[i].classList.remove("active");
//     }
//     cells[active].classList.add("active");
//   }
// }

// makeNavigable();

// const productID = document.querySelectorAll(".productId");
// for (let i = 0; i < productID.length; i++) {
//   productID[i].addEventListener("keyup", function (e) {
//     console.log("clicked");
//   });
// }

let initialUnitePrice = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    e.preventDefault();

    const tableBody = document.getElementById("table_body");

    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<td scope="row">
    <input
      class="form-control productId"
      type="text"
      placeholder="example 001.."
      aria-label="productId input"
    />
  </td>
  <td>
    <input
      type="text"
      readonly
      class="form-control-plaintext description"
      id="staticEmail2"
      value=""
    />
  </td>
  <td>
    <input
      type="text"
      readonly
      class="form-control-plaintext unitePrice"
      id="staticEmail2"
      value=""
    />
  </td>
  <td>
    <input
      class="form-control quantity"
      type="number"
      min="01"
      placeholder=""
      aria-label="quantity"
    />
  </td>
  <td class="subtotal">SubTotal</td>
  <td>
    <button type="button" class="btn btn-danger">Delete</button>
  </td>`;

    tableBody.appendChild(tableRow);

    const productIDs = document.querySelectorAll(".productId");
    for (let i = 0; i < productIDs.length; i++) {
      productIDs[i].addEventListener("keyup", function (e) {
        const idField = productIDs[i];

        const description =
          idField.parentElement.parentElement.querySelector(".description");
        const unitePrice =
          idField.parentElement.parentElement.querySelector(".unitePrice");
        const subtotal =
          idField.parentElement.parentElement.querySelector(".subtotal");

        const productID = idField.value;

        console.log(productID);
        fetch(`http://localhost:5000/products/${productID}`)
          .then((res) => res.json())
          .then((data) => {
            description.value = data.description;
            unitePrice.value = data.price;
            initialUnitePrice = data.price;
            subtotal.innerHTML = data.price;
          });
      });
    }

    let previous_value;

    const quantities = document.querySelectorAll(".quantity");
    const subtotals = document.querySelectorAll(".subtotal");

    for (let i = 0; i < quantities.length; i++) {
      quantities[i].addEventListener("change", function (e) {
        if (
          subtotals[i].innerHTML === "" ||
          subtotals[i].innerHTML === "SubTotal"
        ) {
          return;
        }
        const quantityValue = +quantities[i].value;
        const subtotalValue = +subtotals[i].innerHTML;

        console.log(previous_value, quantityValue, subtotalValue);

        if (previous_value < quantityValue) {
          subtotals[i].innerHTML = initialUnitePrice * quantityValue;
        } else if (previous_value > quantityValue) {
          subtotals[i].innerHTML = subtotalValue - initialUnitePrice;
        }
        previous_value = quantityValue;
      });
    }
  }
});
