'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class DeleteItem_Transaction extends jsTPS_Transaction {
	constructor(initModel, item) {
		super();
		this.model = initModel;
		this.item = item;
		this.deleteLocation = 0;
	}

	doTransaction() {
		this.deleteLocation = this.model.removeItem(this.item);
	}

	undoTransaction() {
		this.model.addItemToCurrentList(this.item, this.deleteLocation);
	}
}
