'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class MoveItemUp_Transaction extends jsTPS_Transaction {
	constructor(initModel, id) {
		super();
		this.model = initModel;
		this.id = id;
	}

	doTransaction() {
		this.model.moveItemUp(this.id);
	}

	undoTransaction() {
		this.model.moveItemDown(this.id);
	}
}
