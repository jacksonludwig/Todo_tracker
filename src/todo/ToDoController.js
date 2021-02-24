'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {
	constructor() { }

	setModel(initModel) {
		this.model = initModel;
		let appModel = this.model;

		// SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
		document.getElementById("add-list-button").onmousedown = function() {
			appModel.addNewList();
		}

		document.getElementById("undo-button").onmousedown = function() {
			appModel.undo();
		}

		document.getElementById("redo-button").onmousedown = function() {
			appModel.redo();
		}

		document.getElementById("add-item-button").onmousedown = function() {
			appModel.addNewItemTransaction();
		}

		document.getElementById("delete-list-button").onmousedown = function() {
			appModel.showListDeleteConfirm();
		}
		document.getElementById("confirmDeleteSpan").onmousedown = function () {
			appModel.removeCurrentList();
			appModel.hideListDeleteConfirm();
		}
		document.getElementById("cancelDeleteSpan").onmousedown = function () {
			appModel.hideListDeleteConfirm();
		}

		// Handle task edits
		document.getElementById("todo-list-items-div").addEventListener('DOMNodeInserted', function () {
			let items = document.getElementsByClassName("task-col");
			for (let index = 0; index < items.length; index++) {
				const item = items[index];
				if (item.onblur === null) {
					item.onblur = function(event) {
						let id = Number(item.parentNode.id.replace(/\D/g, "")); // get id of clicked item
						let listItem = appModel.getItemById(id);
						let oldText = listItem.description; // old val currently in model
						let newText = event.target.value; // new value entered into field
						if (newText === "") {
							event.target.value = oldText;
						} else if (oldText !== newText) {
							appModel.editTaskTextTransaction(oldText, newText, listItem);
						}
					}
				}
			}
		});

		// Handle date edits
		document.getElementById("todo-list-items-div").addEventListener('DOMNodeInserted', function () {
			let items = document.getElementsByClassName("due-date-col");
			for (let index = 0; index < items.length; index++) {
				const item = items[index];
				if (item.onchange === null) {
					item.onchange = function(event) {
						let id = Number(item.parentNode.id.replace(/\D/g, "")); // get id of clicked item
						let listItem = appModel.getItemById(id);
						let oldDate = listItem.dueDate;
						let newDate = event.target.value;
						appModel.editDateTextTransaction(oldDate, newDate, listItem);
					}
				}
			}
		});

		// Handle status edits
		document.getElementById("todo-list-items-div").addEventListener('DOMNodeInserted', function () {
			let items = document.getElementsByClassName("status-col");
			for (let index = 0; index < items.length; index++) {
				const item = items[index];
				if (item.onchange === null) {
					item.onchange = function(event) {
						let id = Number(item.parentNode.id.replace(/\D/g, "")); // get id of clicked item
						let listItem = appModel.getItemById(id);
						let oldStatus = listItem.status;
						let newStatus = event.target.value;
						appModel.editStatusTextTransaction(oldStatus, newStatus, listItem);
					}
				}
			}
		});
	}

	// PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
	handleLoadList(listId) {
		// UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
		this.model.loadList(listId);
		this.model.moveListToTop(listId); // move chosen to top of list of lists
	}
}
