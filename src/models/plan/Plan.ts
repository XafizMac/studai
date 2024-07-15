export interface Plan {
    id: string;
    workType: string;
    languageOfWork: string;
    workTheme: string;
    discipline: string;
    pageCount: string;
    wishes: string;
    coverPageData: string;
    university: string;
    authorName: string;
    groupName: string;
    teacherName: string;
    author: string;
    context: object;
    file: string;
    subtopics: string[];
    status: string;
}

export interface Work {
    workTheme: string;
    pageCountDisplay: string;
    workTypeDisplay: string;
    languageOfWorkDisplay: string;
    status: string;
    file: string;
    id: number;
}