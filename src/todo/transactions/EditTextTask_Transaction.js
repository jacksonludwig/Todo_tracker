'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditTextTask_Transaction extends jsTPS_Transaction {
	constructor(initModel, oldText, newText, item) {
		super();
		this.model = initModel;
		this.oldText = oldText;
		this.newText = newText;
		this.item = item;
	}

	doTransaction() {
		this.model.updateText(this.item, this.newText);
	}

	undoTransaction() {
		this.model.updateText(this.item, this.oldText);
	}
}
