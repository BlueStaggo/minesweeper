export enum SpaceContent {
    mine = "💣",
    empty = "",
    one = "1",
    two = "2",
    three = "3",
    four = "4",
    five = "5",
    six = "6",
    seven = "7",
    eight = "8"
}

export enum SpaceContext {
    hidden = "Hidden",
    revealed = "Revealed",
    flagged = "Flagged"
}

export default interface AbstractSpace {
    content: SpaceContent;
    context: SpaceContext;
}
