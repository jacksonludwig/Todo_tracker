'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditTextTask_Transaction extends jsTPS_Transaction {
    constructor(initModel, event) {
        super();
				this.textField = event;
        this.model = initModel;
    }

		// getIdForCurrentNode() {
		// 	let parent = this.textField.target.parentNode.id;
		// 	return parent.replace(/\D/g, ""); // regex to extract just id
		// }

    doTransaction() {
			// TODO
    }

    undoTransaction() {
			// TODO
    }
}
