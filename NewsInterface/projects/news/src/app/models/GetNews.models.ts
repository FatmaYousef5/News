export interface GetNews{
    newsId : number,
    publicationDate : Date,
    creationDate : Date,
    newsContent : string,
    image : ArrayBuffer,
    authorId : number,
    name : string
    title : string
    section : number
    sectionName : string
}