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
			appModel.handleUndoRedoControls();
		}

		document.getElementById("redo-button").onmousedown = function() {
			appModel.redo();
			appModel.handleUndoRedoControls();
		}

		document.getElementById("add-item-button").onmousedown = function() {
			if (appModel.listControlsEnabled) {
				appModel.addNewItemTransaction();
				appModel.handleUndoRedoControls();
			}
		}
		document.getElementById("delete-list-button").onmousedown = function() {
			if (appModel.listControlsEnabled) {
				appModel.showListDeleteConfirm();
			}
		}
		document.getElementById("close-list-button").onmousedown = function () {
			if (appModel.listControlsEnabled) {
				appModel.closeList();
				appModel.clearTransactionStack();
			}
		}

		document.getElementById("confirmDeleteSpan").onmousedown = function () {
			appModel.removeCurrentList();
			appModel.hideListDeleteConfirm();
		}
		document.getElementById("cancelDeleteSpan").onmousedown = function () {
			appModel.hideListDeleteConfirm();
		}

		// Handle move up/down/delete
		document.getElementById("todo-list-items-div").addEventListener('DOMNodeInserted', function () {
			let items = document.getElementsByClassName("list-item-control material-icons");
			// skip first three because they're the list control buttons
			for (let i = 3; i < items.length; i++) {
				if (items[i].onclick === null) {
					items[i].onclick = function () {
						let id = Number(items[i].parentNode.parentNode.id.replace(/\D/g, "")); // get id of clicked item
						if (items[i].innerHTML === "keyboard_arrow_up") {
							appModel.moveItemUpTransaction(id);
						} else if (items[i].innerHTML === "keyboard_arrow_down") {
							appModel.moveItemDownTransaction(id);
						} else {
							let listItem = appModel.getItemById(id);
							appModel.deleteItemTransaction(listItem);
						}
						appModel.handleUndoRedoControls();
					}
				}
			}
		});

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
						appModel.handleUndoRedoControls();
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
						appModel.handleUndoRedoControls();
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
						appModel.handleUndoRedoControls();

						// make sure the colors are correct
						let selected = document.getElementById('status-' + id);
						if (oldStatus === 'complete') {
							selected.style.color = '#f5bc75';
						} else {
							selected.style.color = '#8ed4f8';
						}
					}
				}
			}
		});
	}

	enableListControls() {
		this.model.listControlsEnabled = true;
	}

	disableListControls() {
		this.model.listControlsEnabled = false;
	}

	// PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
	handleLoadList(listId) {
		// UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
		this.model.loadList(listId);
		this.model.moveListToTop(listId); // move chosen to top of list of lists
	}
}
