'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditTextTask_Transaction extends jsTPS_Transaction {
	constructor(initModel, oldText, newText, id) {
		super();
		this.model = initModel;
		this.oldText = oldText;
		this.newText = newText;
		this.id = id;
	}

	doTransaction() {
		this.model.updateTextById(this.id, this.newText);
	}

	undoTransaction() {
		this.model.updateTextById(this.id, this.oldText);
	}
}
