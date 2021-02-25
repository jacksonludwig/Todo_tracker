'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import EditTextTask_Transaction from './transactions/EditTextTask_Transaction.js'
import EditDateText_Transaction from './transactions/EditDateText_Transaction.js'
import EditStatusText_Transaction from './transactions/EditStatusText_Transaction.js'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction.js'
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction.js'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction.js'

/**
* ToDoModel
*
* This class manages all the app data.
*/
export default class ToDoModel {
	constructor() {
		// THIS WILL STORE ALL OF OUR LISTS
		this.toDoLists = [];

		// THIS IS THE LIST CURRENTLY BEING EDITED
		this.currentList = null;

		// THIS WILL MANAGE OUR TRANSACTIONS
		this.tps = new jsTPS();

		// WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
		this.nextListId = 0;

		// WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
		this.nextListItemId = 0;

		// Keep track of if we should be enabling list controls or not
		this.listControlsEnabled = false;
	}

	/**
	* addItemToCurrentList
	*
	* This function adds the itemToAdd argument to the current list being edited.
	*
	* @param {*} itemToAdd A instantiated item to add to the list.
	*/
	addItemToCurrentList(itemToAdd) {
		this.currentList.addItem(itemToAdd);
		this.view.viewList(this.currentList);
	}

	/**
	* This function adds the itemToAdd argument to the current list being edited using a given position.
	*
	* @param {*} itemToAdd A instantiated item to add to the list.
	* @param {Number} index Where to add the new item.
	*
	* @author Jackson
	*/
	addItemToCurrentList(itemToAdd, index) {
		this.currentList.addItemToIndex(itemToAdd, index);
		this.view.viewList(this.currentList);
	}

	/**
	* addNewItemToCurrentList
	*
	* This function adds a brand new default item to the current list.
	*/
	addNewItemToCurrentList() {
		let newItem = new ToDoListItem(this.nextListItemId++);
		this.addItemToList(this.currentList, newItem);
		return newItem;
	}

	/**
	* addItemToList
	*
	* Function for adding a new item to the list argument using the provided data arguments.
	*/
	addItemToList(list, initDescription, initDueDate, initStatus) {
		let newItem = new ToDoListItem(this.nextListItemId++);
		newItem.setDescription(initDescription);
		newItem.setDueDate(initDueDate);
		newItem.setStatus(initStatus);
		list.addItem(newItem);
		if (this.currentList) {
			this.view.refreshList(list);
		}
	}

	/**
	* addNewItemTransaction
	*
	* Creates a new transaction for adding an item and adds it to the transaction stack.
	*/
	addNewItemTransaction() {
		let transaction = new AddNewItem_Transaction(this);
		this.tps.addTransaction(transaction);
	}

	/**
	* addNewList
	*
	* This function makes a new list and adds it to the application. The list will
	* have initName as its name.
	*
	* @param {*} initName The name of this to add.
	*/
	addNewList(initName) {
		let newList = new ToDoList(this.nextListId++);
		if (initName)
		newList.setName(initName);
		this.toDoLists.push(newList);
		this.view.appendNewListToView(newList);
		return newList;
	}

	/**
	* Adds a brand new default item to the current list's items list and refreshes the view.
	*/
	addNewItem() {
		let newItem = new ToDoListItem(this.nextListItemId++);
		this.currentList.items.push(newItem);
		this.view.viewList(this.currentList);
		return newItem;
	}

	/**
	* Makes a new list item with the provided data and adds it to the list.
	*/
	loadItemIntoList(list, description, due_date, assigned_to, completed) {
		let newItem = new ToDoListItem();
		newItem.setDescription(description);
		newItem.setDueDate(due_date);
		newItem.setAssignedTo(assigned_to);
		newItem.setCompleted(completed);
		this.addItemToList(list, newItem);
	}

	/**
	* Load the items for the listId list into the UI.
	*/
	loadList(listId) {
		let listIndex = -1;
		for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
			if (this.toDoLists[i].id === listId)
			listIndex = i;
		}
		if (listIndex >= 0) {
			let listToLoad = this.toDoLists[listIndex];
			this.currentList = listToLoad;
			this.view.viewList(this.currentList);
		}
	}

	/**
	* Redo the current transaction if there is one.
	*/
	redo() {
		if (this.tps.hasTransactionToRedo()) {
			this.tps.doTransaction();
		}
	}

	/**
	* Remove the itemToRemove from the current list and refresh.
	* @returns Index of removed item
	*/
	removeItem(itemToRemove) {
		let removedIndex = this.currentList.removeItem(itemToRemove);
		this.view.viewList(this.currentList);
		return removedIndex;
	}

	/**
	* Finds and then removes the current list.
	*/
	removeCurrentList() {
		let indexOfList = -1;
		for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
			if (this.toDoLists[i].id === this.currentList.id) {
				indexOfList = i;
			}
		}
		this.toDoLists.splice(indexOfList, 1);
		this.currentList = null;
		this.view.clearItemsList();
		this.view.refreshLists(this.toDoLists);
	}

	// WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
	setView(initView) {
		this.view = initView;
	}

	/**
	* Undo the most recently done transaction if there is one.
	*/
	undo() {
		if (this.tps.hasTransactionToUndo()) {
			this.tps.undoTransaction();
		}
	}

	// This works by simply swapping the chosen list and the top list.
	// Added by me.
	moveListToTop(selectedlistId) {
		let toDoLists = this.toDoLists;
		for (let i = 0; i < toDoLists.length; i++) {
			if (toDoLists[i].id == selectedlistId) {
				let removed = toDoLists[i];
				toDoLists.splice(i, 1); // remove selected and shift
				toDoLists.splice(0, 0, removed); // add it to top and shift
				this.view.refreshLists(toDoLists);
				break;
			}
		}
	}

	// These maybe should be moved to controller/view.
	// Helper functions that hide/show the list delete confirmation box.
	// Added by me.
	showListDeleteConfirm() {
		let popup = document.getElementById("deleteListPopup");
		popup.style.display = "block";
	}
	hideListDeleteConfirm() {
		let popup = document.getElementById("deleteListPopup");
		popup.style.display = "none";
	}

	/**
	* Returns list item object that matches a given list item id.
	* Null otherwise.
	*/
	getItemById(id) {
		for (let index = 0; index < this.currentList.items.length; index++) {
			const item = this.currentList.items[index];
			if (id === item.id) {
				return item;
			}
		}
		return null;
	}

	/**
	* Update task text for item.
	*/
	updateText(item, newText) {
		item.description = newText;
		this.view.viewList(this.currentList); // reload the list view
	}

	/**
	* Update date text for item.
	*/
	updateDate(item, newDate) {
		item.dueDate = newDate;
		this.view.viewList(this.currentList); // reload the list view
	}

	/**
	* Update status text for item.
	*/
	updateStatus(item, newStatus) {
		item.status = newStatus;
		this.view.viewList(this.currentList); // reload the list view
	}

	/**
	* Move list item up using item id.
	*/
	moveItemUp(id) {
		let toDoLists = this.toDoLists;
		for (let i = 0; i < toDoLists.length; i++) {
			for (let j = 0; j < toDoLists[i].items.length; j++) {
				if (toDoLists[i].items[j].id === id) {
					// TODO account for being top list
					let removed = toDoLists[i].items[j];
					toDoLists[i].items.splice(j, 1);
					toDoLists[i].items.splice(j - 1, 0, removed);
					this.view.viewList(this.currentList);
					break;
				}
			}
		}
	}

	/**
	* Move list item down using item id.
	*/
	moveItemDown(id) {
		let toDoLists = this.toDoLists;
		for (let i = 0; i < toDoLists.length; i++) {
			for (let j = 0; j < toDoLists[i].items.length; j++) {
				if (toDoLists[i].items[j].id === id) {
					// TODO account for being bottom list
					let removed = toDoLists[i].items[j];
					toDoLists[i].items.splice(j, 1);
					toDoLists[i].items.splice(j + 1, 0, removed);
					this.view.viewList(this.currentList);
					break;
				}
			}
		}
	}

	editTaskTextTransaction(oldText, newText, item) {
		let transaction = new EditTextTask_Transaction(this, oldText, newText, item);
		this.tps.addTransaction(transaction);
	}

	editDateTextTransaction(oldDate, newDate, item) {
		let transaction = new EditDateText_Transaction(this, oldDate, newDate, item);
		this.tps.addTransaction(transaction);
	}

	editStatusTextTransaction(oldStatus, newStatus, item) {
		let transaction = new EditStatusText_Transaction(this, oldStatus, newStatus, item);
		this.tps.addTransaction(transaction);
	}

	moveItemUpTransaction(id) {
		let transaction = new MoveItemUp_Transaction(this, id);
		this.tps.addTransaction(transaction);
	}
	moveItemDownTransaction(id) {
		let transaction = new MoveItemDown_Transaction(this, id);
		this.tps.addTransaction(transaction);
	}
	deleteItemTransaction(item) {
		let transaction = new DeleteItem_Transaction(this, item);
		this.tps.addTransaction(transaction);
	}

	closeList() {
		this.view.clearItemsList();
		this.view.obscureListControls();
	}

}
