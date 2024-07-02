export interface Plan {
    workType: string;
    languageOfWork: string;
    workTheme: string;
    discipline: string;
    pageCount: string;
    wishes: string;
    coverPageData: string;
    university?: string;
    authorName?: string;
    groupName?: string;
    teacherName?: string;
}


export interface Work{
    workTheme: string;
    pageCountDisplay: string;
    workTypeDisplay: string;
    languageOfWorkDisplay: string;
}