# Vending Machine Web App

The purpose of this project is to show proficiency in using HTML, CSS, JavaScript, and jQuery to create a browser-based user interface for an existing web service. You will show your ability to use these skills by building a page that allows a user to interact with a virtual Vending Machine via the supplied Vending Machine REST API.

In order to complete this project successfully, you will have to analyze and understand the Vending Machine API. The details of the API are outlined later in this document. It is highly recommended that you use Postman to explore the API before you begin coding!

## Requirements
Your assignment is to create an HTML page (and the associated CSS and JavaScript files) that matches the functionality outlined in the requirements below.

- Your lab must use Bootstrap and use the typical Bootstrap file structure.
- Your HTML file must be called home.html.
- Your JavaScript file must be called home.js.
- Use Postman to explore the API before you begin coding.
- Users must add money by clicking Add Dollar, Add Quarter, Add Dime, and Add Nickel – they must not be allowed to type in arbitrary money amounts.
- Items are selected by clicking on them. When an item is clicked, the ID of the item (shown in the upper left corner of each item display square) is shown in the Item: display box directly above the Make Purchase button.
- If an item is successfully vended, the Messages box displays “Thank you!!!”
- If the user attempts to vend an item for which there is no inventory the Messages box displays SOLD OUT!!!
- Clicking on the Change Return button will abandon a transaction. Any money in the Total $ In box will be returned in the Change box (as quarters, dimes, nickels, and pennies) and the Total $ In box will be cleared.  The Item and Messages boxes will be cleared as well.
- If the user attempts to bend an item for they have deposited insufficient funds, the Messages box displays Please insert: <amount short>

## Starting the Vending Machine Web Service
You were supplied with an executable JAR file containing the Vending Machine REST Web Service. This JAR file is similar to the one that has been used throughout the code-alongs for this section. As was the case for the code-alongs, you must start the web service before you can access it. To start the web service, navigate your command prompt to the directory of the jar file and type the following command into your shell:

java -jar VendingMachineRESTWebService.jar

## Verifying Vending Machine Web Service Startup
To verify that your web service started successfully, open Postman and send a GET request to localhost:8080/items. If the service is started, your response should contain a JSON array for a list of items in the vending machine.

## Initial State
Upon initial load, your page must display as shown in the initial state.

- The heading of the page should be Vending Machine with a horizontal rule beneath it
- The main content area should be divided into two sections, approximately 70% and 30% width:
- The left section should contain a list of items numbered by index from 1 to N
- Each item is a bordered square element containing the index, the name of the item, its price, and the quantity remaining
- The right section contains 3 forms with horizontal rules between them
- The top form contains an input field labeled 'Total $ In'. Beneath the input are four buttons labeled 'Add Dollar', 'Add Quarter', 'Add Dime', and 'Add Nickel'.
- The middle form contains an input labeled 'Messages' and an input labeled 'Item'. Beneath them is a button labeled 'Make Purchase'.
- The bottom form contains an input labeled 'Change'. Beneath is a button labeled 'Change Return'.

## Using the Vending Machine
Users should add money to the vending machine by pressing the 'Add *' buttons in the form on the right side. Each button should update the total in input field to keep a running total. The user can enter an item index for any item displayed then press the make purchase button.
