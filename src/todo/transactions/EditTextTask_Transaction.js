'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

export default class EditTextTask_Transaction extends jsTPS_Transaction {
    constructor(initModel) {
        super();
        this.model = initModel;
    }

    doTransaction() {
			// TODO
    }

    undoTransaction() {
			// TODO
    }

		// getIdForCurrentNode() {
		// 	let parent = this.textField.target.parentNode.id;
		// 	return parent.replace(/\D/g, ""); // regex to extract just id
		// }
}
