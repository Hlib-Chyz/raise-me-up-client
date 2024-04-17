export interface IPaginationState {
    currentPage: string;
    pages: IPage[];
}

export interface IPage {
    readonly _id: string;
    name: string;
    heading: string;
    topText: string;
    bottomText: string;
    list: IListItem[];
}

export interface IListItem {
    bold: string;
    regular: string;
}
