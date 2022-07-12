export default class Book{
    constructor(title, author, pagenum, isRead){
    this.title = title
    this.author = author
    this.pagenum = pagenum
    this.isRead = isRead
}

info(){
    return `${this.title} by ${this.author}, ${this.pagenum} pages, ${this.isRead ? 'already read' : 'not read yet'}.`;
}

setRead(button){
    this.isRead = (this.isRead ? false : true);
    this.isRead ? button.innerText = 'Read' : button.innerText = 'Not read';

}

}