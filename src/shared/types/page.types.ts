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

export interface IPageState {
    pages: IPage[];
    currentPage: IPage | null | undefined;
    isShowPopup: boolean;
    isShowEditPopup: boolean;
}
