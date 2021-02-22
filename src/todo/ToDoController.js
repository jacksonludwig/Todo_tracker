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
  }

  // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
  handleLoadList(listId) {
    // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
    this.model.loadList(listId);
    this.model.moveListToTop(listId); // move chosen to top of list of lists
  }
}
