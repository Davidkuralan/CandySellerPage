let myForm = document.querySelector("#my-Form");
let priceInput = document.querySelector("#price");
let productInput = document.querySelector("#product");
let categoryInput = document.querySelector("#category");
let cottonCandyItemInput = document.querySelector("#cottonCandy");
let caramelItemInput = document.querySelector("#Caramel");
let chocolateItemInput = document.querySelector("#Chocolate");

myForm.addEventListener("submit", saveToStorage);

function saveToStorage(e) {
  e.preventDefault();
  let priceAdd = priceInput.value;
  let productAdd = productInput.value;
  let categoryAdd = categoryInput.value;

  let obj = { priceAdd, productAdd, categoryAdd };

  axios
    .post(`http://localhost:8000/add-product`, obj)
    .then((response) => {      
      addItem(response.data.ProductAdded);
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h3> Something Went Wrong </h3>";
      console.log(error);
    });
}
function addItem(obj) {

  let priceAdd = obj.sellingPrice;
  let productAdd = obj.productName;
  let categoryAdd = obj.category;

  let li = document.createElement("li");

  li.textContent =
    li.textContent +
    obj.sellingPrice +
    "     " +
    obj.productName +
    "    " +
    obj.category;
  
  switch (categoryAdd) {
    case "cottoncandy":
      const cottonCandy = document.getElementById("cottonCandy");
      cottonCandy.appendChild(li);
      li.id = cottonCandy.id;
      break;

    case "caramel":
      const Caramel = document.getElementById("Caramel");
      Caramel.appendChild(li);
      li.id = Caramel.id;
      break;

    case "chocolate":
      const Chocolate = document.getElementById("Chocolate");
      Chocolate.appendChild(li);
      li.id = Chocolate.id
      break;
    default:
      console.error(`Invalid category: ${category}`);
  }

  let deletebtn = document.createElement("button");
  deletebtn.className = "btn btn-outline-dark";
  deletebtn.appendChild(document.createTextNode("Delete Expense"));
  li.append(deletebtn);

  deletebtn.onclick = (e) => {
    deleteProduct(e, obj.id);
  };

  myForm.reset();
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:8000/get-products")
    .then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        addItem(response.data[i]);
      }
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h3> Something Went Wrong </h3>";
      console.log(error);
    });
});

function deleteProduct(e, obj_id) {
  console.log(obj_id)

  const deletedItem = e.target.parentElement;
  const parentUl = deletedItem.parentElement;

  console.log(deletedItem)
  console.log(parentUl)
  
  parentUl.removeChild(deletedItem)

  axios
    .delete(`http://localhost:8000/delete-product/${obj_id}`)
    .then((response) => {
      console.log("inside axios delete function");
    })
    .catch((error) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h3> Something Went Wrong </h3>";
      console.log(error);
    });
  myForm.reset();
}