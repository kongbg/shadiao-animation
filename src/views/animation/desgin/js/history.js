export default class History {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }

    record(action) {
        this.undoStack.push(action);
        this.redoStack.length = 0;
    }

    undo() {
        const action = this.undoStack.pop();
        if (action) {
            action.undoInfo.undo(action.undoInfo.params);
            this.redoStack.push(action);
        }
    }

    redo() {
        const action = this.redoStack.pop();
        if (action) {
            action.redoInfo.redo(action.redoInfo.params);
            this.undoStack.push(action);
        }
    }

}