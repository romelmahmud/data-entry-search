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

// getProductsData when input change

function getProductData() {
  const idField = document.querySelector(".productId");

  const description =
    idField.parentElement.parentElement.querySelector(".description");
  const unitePrice =
    idField.parentElement.parentElement.querySelector(".unitePrice");
  const quantity =
    idField.parentElement.parentElement.querySelector(".quantity");

  // getting quantity and making it number
  const quantityValue = +quantity.value;
  console.log(quantityValue);
  const productID = idField.value;

  console.log(productID);
  fetch(`http://localhost:5000/products/${productID}`)
    .then((res) => res.json())
    .then((data) => {
      description.value = data.description;
      unitePrice.value = data.price;
    });
}
