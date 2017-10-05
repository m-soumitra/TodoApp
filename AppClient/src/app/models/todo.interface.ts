export class Todo {
    id: number;
    title: string;
    isComplete: boolean;
    constructor(id: number, title: string, isComplete?: boolean) {
        this.id = id;
        this.title = title;
        this.isComplete = isComplete;
    }
}
