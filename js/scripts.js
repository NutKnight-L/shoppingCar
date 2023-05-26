var items = document.getElementsByClassName("item");
var minusBtn = document.getElementsByClassName("minus");
var plusBtn = document.getElementsByClassName("plus");
var paymentTable = document.getElementById("paymentTable");
var totalMoney = document.getElementsByClassName("totalMoney")[0];
var index = 0;
var memory = 0;
var sumPrice = 0;
var count=0;
var tds = document.getElementsByTagName("td");
var isAllCheckBox=document.getElementById("isAllCheckBox");
var checkboxs=document.getElementsByName("checkbox");
console.log();

for (let i = 0; i < minusBtn.length; i++) {
    minusBtn[i].onclick = function () {
        var Amount = items[i].getElementsByTagName("li")[4].getElementsByTagName("span")[0];
        var Store = items[i].getElementsByTagName("li")[3].textContent.replace(/[^\d.]/g, "");
        if (Amount.textContent != "0") {
            Amount.textContent = eval(Amount.textContent) - 1;
            Store++;
            items[i].getElementsByTagName("li")[3].textContent = "库存:" + Store;
        }
    }
}

for (let i = 0; i < plusBtn.length; i++) {
    plusBtn[i].onclick = function () {
        var Amount = items[i].getElementsByTagName("li")[4].getElementsByTagName("span")[0];
        var Store = items[i].getElementsByTagName("li")[3].textContent.replace(/[^\d.]/g, "");
        Amount.textContent = eval(Amount.textContent) + 1;
        Store--;
        items[i].getElementsByTagName("li")[3].textContent = "库存:" + Store;
    }
}

function addItem(n) {
    var itemName = items[n].getElementsByTagName("li")[0].textContent;
    var itemPrice = eval(items[n].getElementsByTagName("li")[2].textContent.replace(/[^\d.]/g, ""));
    var itemStore = eval(items[n].getElementsByTagName("li")[3].textContent.replace(/[^\d.]/g, ""));
    var itemAmount = eval(items[n].getElementsByTagName("li")[4].getElementsByTagName("span")[0].textContent);
    var newStore = itemStore - itemAmount;
    //Against-Re-Add
    if (tds.length > 6) {
        for (let i = 0; i < index; i++) {
            // console.log("执行了"+i+"次");
            if (itemName == tds[7 + i * 6].innerText) {
                memory = 1;
                tds[9 + i * 6].textContent = eval(tds[9 + i * 6].textContent) + itemAmount;
                tds[10 + i * 6].textContent = "￥" + eval(tds[9 + i * 6].textContent) * itemPrice;
                items[n].getElementsByTagName("li")[3].textContent = "库存:" + newStore;
                items[n].getElementsByTagName("span")[0].textContent="1";
                break;
            } else {
                memory = 0;
            }
        }
    }

    //create
    if (itemAmount != 0 && memory == 0) {
        var newItemTr = document.createElement("tr");
        paymentTable.appendChild(newItemTr);

        //checkbox
        var newItemCheckbox = document.createElement("td");
        var newCheckBox = document.createElement("input");
        newCheckBox.setAttribute("type", "checkbox");
        newCheckBox.setAttribute("checked", "checked");
        newCheckBox.setAttribute("name", "checkbox");
        newCheckBox.setAttribute("onclick", "isChecked(this)");
        newItemCheckbox.appendChild(newCheckBox);
        //name
        var newItemName = document.createElement("td");
        newItemName.textContent = itemName;
        //price
        var newItemPrice = document.createElement("td");
        newItemPrice.textContent = "￥" + itemPrice;
        //store
        var newItemAmount = document.createElement("td");
        newItemAmount.textContent = itemAmount;
        //sum
        var newItemSumPrice = document.createElement("td");
        newItemSumPrice.textContent = "￥" + itemPrice * itemAmount;
        //del
        var newItemDelBtn = document.createElement("td");
        var newDelBtn = document.createElement("input");
        newDelBtn.setAttribute("type", "button");
        newDelBtn.setAttribute("value", "删除 X");
        newDelBtn.setAttribute("onclick", "deleteTr(this)");
        newDelBtn.setAttribute("name", "delbtn");
        newDelBtn.setAttribute("id", "del" + index);
        newDelBtn.setAttribute("class", "delbtn");
        newItemDelBtn.appendChild(newDelBtn);

        newItemTr.appendChild(newItemCheckbox);
        newItemTr.appendChild(newItemName);
        newItemTr.appendChild(newItemPrice);
        newItemTr.appendChild(newItemAmount);
        newItemTr.appendChild(newItemSumPrice);
        newItemTr.appendChild(newItemDelBtn);
        index++;

        items[n].getElementsByTagName("span")[0].textContent="1";
        isCheckBoxChecked();
        //Refresh Store
        items[n].getElementsByTagName("li")[3].textContent = "库存:" + newStore;
    }

    //Refresh Price
    sumPrice = 0;
    isCheckBoxChecked();
    totalMoney.textContent = "￥" + sumPrice;
}

function deleteTr(obj) {
    //console.log(document.getElementsByName("delbtn")[0].parentNode.parentNode);
    var thisTr = obj.parentNode.parentElement;
    var itemTotalPrice = eval(thisTr.childNodes[4].textContent.replace(/[^\d.]/g, ""));
    var itemTotalAmount = eval(thisTr.childNodes[3].textContent);
    var newPrice = eval(totalMoney.textContent.replace(/[^\d.]/g, "")) - itemTotalPrice;
    totalMoney.textContent = "￥" + newPrice;
    if(index==1&&isAllCheckBox.checked==true){
        isAllCheckBox.checked=false;
    }
    index--;
    thisTr.remove();
    if (index == 0) {
        memory = 0;
    }
}

function isChecked(obj) {
    // console.log(obj.checked);
    if (obj.checked) {
        console.log("hello");
        sumPrice = 0;
        isCheckBoxChecked();
        totalMoney.textContent = "￥" + sumPrice;
    } else {
        // console.log(obj.parentNode.parentElement);
        var thisTr = obj.parentNode.parentElement;
        var itemTotalPrice = eval(thisTr.childNodes[4].textContent.replace(/[^\d.]/g, ""));
        var newPrice = eval(totalMoney.textContent.replace(/[^\d.]/g, "")) - itemTotalPrice;
        totalMoney.textContent = "￥" + newPrice;
        isAllCheckBox.checked=false;
    }
}

function isCheckBoxChecked(){
    count=0;
    for (let i = 0; i < index; i++) {
        if(checkboxs[i].checked){
            count++;
            sumPrice += eval(tds[10 + 6 * i].textContent.replace(/[^\d.]/g, ""));
        }
    }
    if(count==index){
        isAllCheckBox.checked=true;
    }
}

function isAllCheckBoxChecked(obj){
    if(obj.checked){
        sumPrice = 0;
        for (let i = 0; i < index; i++) {
            sumPrice += eval(tds[10 + 6 * i].textContent.replace(/[^\d.]/g, ""));
            checkboxs[i].checked=true;
        }
        totalMoney.textContent = "￥" + sumPrice;
    } else{
        sumPrice=0;
        totalMoney.textContent = "￥" + sumPrice;
        for (let i = 0; i < index; i++) {
            checkboxs[i].checked=false;
        }
    }
}