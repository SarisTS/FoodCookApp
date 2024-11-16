const foodInput = document.getElementById("food_input");
const saveBtn = document.querySelector("#saveBtn");
const foodList = document.getElementById("food_list");
const imagePart = document.querySelector(".image_part");
const count = document.querySelector(".count");

document.addEventListener("DOMContentLoaded",()=>{
    const fetchFoodItem = [...JSON.parse(localStorage.getItem("Food"))]
    fetchFoodItem.forEach((item)=>{
        const list = document.createElement("li");
        list.className = "food_item";
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        div1.innerText = item.foodItem;
        div2.innerHTML = '<i class="bi bi-x" onclick="remove(event)"></i>';
        list.append(div1);
        list.append(div2);
        foodList.append(list);
        refreshUI();
    })
})

handleFoodInput = ()=>{
    if(foodInput.value != ""){
        const list = document.createElement("li");
        list.className = "food_item";
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        div1.innerText = foodInput.value;
        div2.innerHTML = '<i class="bi bi-x" onclick="remove(event)"></i>';
        list.append(div1);
        list.append(div2);
        foodList.append(list);
        localStorage.setItem("Food", JSON.stringify([...JSON.parse(localStorage.getItem("Food")||"[]"),{foodItem : foodInput.value}]));
        foodInput.value = "";
    }
    else if(foodInput.value === ""){
        alert("Enter your food before saving.!")
    }
    refreshUI()
}

saveBtn.addEventListener("click", handleFoodInput);

function remove(event){
    removeList = event.target.parentNode.parentNode;
    removeList.remove(); 
    const fetchFoodItem = [...JSON.parse(localStorage.getItem("Food"))]
    fetchFoodItem.forEach((item)=>{
        if(item.foodItem === removeList.innerText){
            fetchFoodItem.splice(fetchFoodItem.indexOf(item),1)
        }
    localStorage.setItem("Food", JSON.stringify(fetchFoodItem))
    })
    refreshUI();
}

foodInput.addEventListener("keyup", (event)=>{
    if(event.key === "Enter"){
        handleFoodInput();
    }
})

foodInput.addEventListener("keyup",(event)=>{
    if(event.key === "keyZ"){
        foodInput.value = "";
    }
})

function refreshUI(){
    if(foodList.children.length > 0){
        imagePart.hidden = true;
        count.innerText = `Food Count : ${foodList.children.length}`;
    }
    else{
        imagePart.hidden = false;
        count.innerText = "";
    }
}