'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditStatusText_Transaction extends jsTPS_Transaction {
	constructor(initModel, oldStatus, newStatus, item) {
		super();
		this.model = initModel;
		this.oldStatus = oldStatus;
		this.newStatus = newStatus;
		this.item = item;
	}

	doTransaction() {
		this.model.updateStatus(this.item, this.newStatus);
	}

	undoTransaction() {
		this.model.updateStatus(this.item, this.oldStatus);
	}
}
