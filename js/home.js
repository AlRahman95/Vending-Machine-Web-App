var inputedMoney = 0;

$(document).ready(function () {

    loadVendingItems();    
    
    $('#add-dollar-button').on('click', function () {
        inputedMoney += 1;
        messageBox("You added a Dollar");
        updateMoneyBox(inputedMoney);
    });

    $('#add-quarter-button').on('click', function () {
        inputedMoney += .25;
        messageBox("You added a Quarter")
        updateMoneyBox(inputedMoney);
    });

    $('#add-dime-button').on('click', function () {
        inputedMoney += .10;
        messageBox("You added a Dime");
        updateMoneyBox(inputedMoney);
    });

    $('#add-nickel-button').on('click', function () {
        inputedMoney += .05;
        messageBox("You added a Nickel")
        updateMoneyBox(inputedMoney);
    });

    $('#purchase-button').click(function () {
        makePurchase();
    });

    $('#return-change').on('click', function () {
        returnChange();
    });
})

function loadVendingItems() {
    var vendingDiv = $('#vending-items');
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function (vendingItemsArray) {
            vendingDiv.empty();

            $.each(vendingItemsArray, function (index, item) {
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var vendingInfo = '<div class="vending-items col-sm-4" onclick="selectedItem('+ id +','+ name +')" role="button" id="item-'+ id +'" style="text-align: center; margin-bottom: 30px; margin-top 30px">';
                vendingInfo += '<p style ="text-align: left">' + id + '</p>';
                vendingInfo += '<p><b>' + name + '</b></p>';
                vendingInfo += '<p>$' + price + '</p>';
                vendingInfo += '<p> Quantity Left: ' + quantity + '</p>';
                vendingInfo += '</div>';
                vendingDiv.append(vendingInfo);
            });
        },
        error: function () {
            alert("Failure Calling The Web Service. Please try again later.");
        }
    });
}

function selectedItem(id, name) {
    $('#item-to-vend').val(id + ": " + name);
}

function messageBox(message) {
    $('#vending-message').val(message);
}

function updateMoneyBox(money) {
    $('#money-input').empty();
    $('#money-input').val(money.toFixed(2));
}

function makePurchase() {
    var money = $('#money-input').val();
    var item = $('#item-to-vend').val();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/money/' + money + '/item/' + item,
        success: function (returnMoney) {
            var change = $('#change-input-box');
            $('#vending-message').val("Item vended. Thank you!");
            var pennies = returnMoney.pennies;
            var nickels = returnMoney.nickels;
            var quarters = returnMoney.quarters;
            var dimes = returnMoney.dimes;
            var returnMessage = "";
            if (quarters != 0) {
                returnMessage += quarters + ' Quarter/s ';              
            }
            if (dimes != 0) {
                returnMessage += dimes + ' Dime/s ';                     
            }
            if (nickels != 0) {
                returnMessage += nickels + ' Nickel/s ';                 
            }
            if (pennies != 0) {
                returnMessage += pennies + ' Penny/ies ';              
            }
            if (quarters == 0 && dimes == 0 && nickels == 0 && pennies == 0) {
                returnMessage += "There is no change";                  
            }
            change.val(returnMessage);                                 
            $('#money-input').val('');
            loadVendingItems();
            inputedMoney = 0;
        },
        error: function (error) {
            var errorMessage = error.responseJSON.message;
            messageBox(errorMessage);
        }
    });
}

function returnChange() {
    var inputMoney = $('#money-input').val();
    var money = $('#money-input').val();

    var quarter = Math.floor(money / 0.25);
    money = (money - quarter * 0.25).toFixed(2);
    var dime = Math.floor(money / 0.10);
    money = (money - dime * 0.10).toFixed(2);
    var nickel = Math.floor(money / 0.05);
    money = (money - nickel * 0.05).toFixed(2);
    var penny = Math.floor(money / 0.01);
    money = (money - penny * 0.01).toFixed(2);

    var returnMessage = "";
    var vendingMessage = "";

    if (quarter != 0) {
        returnMessage += quarter + ' Quarter/s ';    
    }   
    if (dime != 0) {
        returnMessage += dime + ' Dime/s ';      
    }
    if (nickel != 0) {
        returnMessage += nickel + ' Nickel/s ';      
    }
    if (penny != 0) {
        returnMessage += penny + ' Penny/ies ';                   
    }
    if (quarter == 0 && dime == 0 && nickel == 0 && penny == 0) {
        returnMessage += "There is no change.";   
        vendingMessage = "No money was inputted.";             
    } else {
        vendingMessage = "Transaction cancelled. Money inputted ($" + inputMoney + ") is returned through change.";
    }

    inputedMoney = 0;
    messageBox("");
    $('#vending-message').val(vendingMessage);
    $('#change-input-box').val(returnMessage);
    $('#item-to-vend').val('');
    $('#money-input').val('');   
}

