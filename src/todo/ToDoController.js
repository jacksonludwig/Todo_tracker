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
    document.getElementById("delete-list-button").onmousedown = function() {
      appModel.removeCurrentList();
    }
    document.getElementById("add-item-button").onmousedown = function() {
      appModel.addNewItemTransaction();
    }
  }

  // This works by simply swapping the chosen list and the top list.
  moveListToTop(selectedlistId) {
    let toDoLists = this.model.toDoLists;
    for (let i = 0; i < toDoLists.length; i++) {
      if (toDoLists[i].id == selectedlistId) {
        // TODO
      }
    }
  }

  // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
  // ** This will be where we need to bring our currently selected list to the top
  handleLoadList(listId) {
    // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
    this.model.loadList(listId);
    this.moveListToTop(listId);
  }
}
