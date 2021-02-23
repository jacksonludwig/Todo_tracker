'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditDateText_Transaction extends jsTPS_Transaction {
	constructor(initModel, oldDate, newDate, item) {
		super();
		this.model = initModel;
		this.oldDate = oldDate;
		this.newDate = newDate;
		this.item = item;
	}

	doTransaction() {
		this.model.updateDate(this.item, this.newDate);
	}

	undoTransaction() {
		this.model.updateDate(this.item, this.oldDate);
	}
}
