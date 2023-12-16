

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getDatabase , ref, push , onValue,remove} from  "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

const appSettings = {
    databaseURL:"https://myfirstapp-960a9-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database,"shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-btn")
const shoppingListEL = document.getElementById("shopping-list")


addBtn.addEventListener("click", function () {
    let inputVal = inputFieldEl.value
    push(shoppingListInDB , inputVal)
    clearInputFieldEl()
    
})

onValue(shoppingListInDB,function(snapshot){

    if(snapshot.exists()) {

    let snapArray = Object.entries(snapshot.val())
    // shoppingListEL.innerHTML = ""
    clearShoppingListEl()
    for(let r=0; r<snapArray.length; r++){
        let currentItem = snapArray[r]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItenToShoppingListEl(currentItem)
        // console.log(snapArray[r])
    }
    }else{
        shoppingListEL.innerHTML = "No itemms here.. yet"
    }


})
function clearShoppingListEl(){
    shoppingListEL.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendItenToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database,`shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEL.append(newEl)


}
