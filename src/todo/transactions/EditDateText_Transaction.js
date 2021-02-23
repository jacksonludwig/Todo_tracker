'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditDateText_Transaction extends jsTPS_Transaction {
	constructor(initModel, oldDate, newDate, id) {
		super();
		this.model = initModel;
		this.oldDate = oldDate;
		this.newDate = newDate;
		this.id = id;
	}

	doTransaction() {
		this.model.updateDateById(this.id, this.newDate);
	}

	undoTransaction() {
		this.model.updateDateById(this.id, this.oldDate);
	}
}
