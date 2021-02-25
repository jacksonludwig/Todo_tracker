'use strict'

/**
* ToDoView
*
* This class generates all HTML content for the UI.
*/
export default class ToDoView {
	constructor() { }

	// ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
	appendNewListToView(newList) {
		// GET THE UI CONTROL WE WILL APPEND IT TO
		let listsElement = document.getElementById("todo-lists-list");

		// MAKE AND ADD THE NODE
		let newListId = "todo-list-" + newList.id;
		let listElement = document.createElement("div");
		listElement.setAttribute("id", newListId);
		listElement.setAttribute("class", "todo_button");
		listElement.appendChild(document.createTextNode(newList.name));
		listsElement.appendChild(listElement);

		// SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
		let thisController = this.controller;
		listElement.onmousedown = function() {
			thisController.handleLoadList(newList.id);
		}
	}

	// Run when no list is in view
	obscureListControls() {
		let items = document.getElementsByClassName("main-list-control");
		for (let index = 0; index < items.length; index++) {
			items[index].style.opacity = .25;
		}
		this.controller.disableListControls();
	}

	// Run when a list is in view
	enableListControls() {
		let items = document.getElementsByClassName("main-list-control");
		for (let index = 0; index < items.length; index++) {
			items[index].style.opacity = 1.0;
		}
		this.controller.enableListControls();
	}

	/**
	 * Remove all items from view
	 */
	clearItemsList() {
		let itemsListDiv = document.getElementById("todo-list-items-div");
		// BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
		let parent = itemsListDiv;
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
		this.obscureListControls();
	}

	// REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
	refreshLists(lists) {
		// GET THE UI CONTROL WE WILL APPEND IT TO
		let listsElement = document.getElementById("todo-lists-list");
		listsElement.innerHTML = "";

		for (let i = 0; i < lists.length; i++) {
			let list = lists[i];
			this.appendNewListToView(list);
		}
	}

	generateListElementIncomplete(listItem) {
		return "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
			+ "<input type='text' class='task-col' value='" + listItem.description + "'/>"
			+ "<input type='date' class='due-date-col' value='" + listItem.dueDate + "'/>"
			+ "<select name='status' class='status-col'>"
			+ "<option value='incomplete' selected>" + listItem.status + "</option>"
			+ "<option value='complete'>complete</option>"
			+ "</select>"
			+ "<div class='list-controls-col'>"
			+ " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
			+ " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
			+ " <div class='list-item-control material-icons'>close</div>"
			+ " <div class='list-item-control'></div>"
			+ " <div class='list-item-control'></div>"
			+ "</div>";
	}

	generateListElementComplete(listItem) {
		return "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
			+ "<input type='text' class='task-col' value='" + listItem.description + "'/>"
			+ "<input type='date' class='due-date-col' value='" + listItem.dueDate + "'/>"
			+ "<select name='status' class='status-col'>"
			+ "<option value='complete' selected>" + listItem.status + "</option>"
			+ "<option value='incomplete'>incomplete</option>"
			+ "</select>"
			+ "<div class='list-controls-col'>"
			+ " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
			+ " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
			+ " <div class='list-item-control material-icons'>close</div>"
			+ " <div class='list-item-control'></div>"
			+ " <div class='list-item-control'></div>"
			+ "</div>";
	}

	// LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
	viewList(list) {
		// WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
		let itemsListDiv = document.getElementById("todo-list-items-div");

		// GET RID OF ALL THE ITEMS
		this.clearItemsList();

		for (let i = 0; i < list.items.length; i++) {
			// NOW BUILD ALL THE LIST ITEMS
			let listItem = list.items[i];
			let listItemElement = "";
			if (listItem.status === "complete") {
				listItemElement = this.generateListElementComplete(listItem);
			} else {
				listItemElement = this.generateListElementIncomplete(listItem);
			}
			itemsListDiv.innerHTML += listItemElement;
		}
		this.enableListControls();
	}

	// THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
	setController(initController) {
		this.controller = initController;
	}
}
