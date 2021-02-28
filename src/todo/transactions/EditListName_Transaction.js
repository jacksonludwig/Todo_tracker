'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditListNameTransaction_Transaction extends jsTPS_Transaction {
	constructor(initModel, oldText, newText, list) {
		super();
		this.model = initModel;
		this.oldText = oldText;
		this.newText = newText;
		this.list = list;
	}

	doTransaction() {
		this.model.updateListName(this.list, this.newText);
	}

	undoTransaction() {
		this.model.updateListName(this.list, this.oldText);
	}
}
