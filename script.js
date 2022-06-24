function Book(title, author, pagenum, isRead){
    this.title = title
    this.author = author
    this.pagenum = pagenum
    this.isRead = isRead
}

Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pagenum} pages, ${this.isRead ? 'already read' : 'not read yet'}.`
}
Book.prototype.changeRead = function(button){
    this.isRead = (this.isRead ? false : true);
    this.isRead ? button.innerText = 'Read' : button.innerText = 'Not read';
    
}

const form = document.querySelector('#addbook');

const Library = [];
const library = document.querySelector("#library");

const testBook = new Book("testBook", 'testAuthor', 200, false);
const testBook2 = new Book("testBook2", 'testAuthor2', 100, true);


Library.push(testBook, testBook2);

const addBookButton = document.querySelectorAll('.addbookbtn');
const addBookForm = document.querySelector('.wrapper.addbook');

addBookButton.forEach(element => {element.addEventListener("click", function(){addBookForm.toggleAttribute("hidden")})})


//takes array of Book objects and creates cards for library HTML element
function populateLibrary(arr){
    library.innerHTML = "";
    arr.forEach(element => {
        addBook(element, arr);
    });
}

function addBook(bookObj, arr){
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = arr.indexOf(bookObj);
    for (const key in bookObj) {
        if (Object.hasOwnProperty.call(bookObj, key)) {
            const element = bookObj[key];
            let field;
            switch(typeof(element)){
                case 'boolean':
                    field = document.createElement('button');
                    element ? field.innerText = 'Read' : field.innerText = 'Not read';
                    field.addEventListener('click', () => {
                        bookObj.changeRead(field);
                    });
                    break;
                case 'number':
                    field = document.createElement('p');
                    field.innerText = `${element} pages long`;
                    break;
                default:
                    field = document.createElement('p');
                    field.innerText = element;
            }
            field.classList = `${key}`;
            div.appendChild(field);
        }
    }
    const buttondelete = document.createElement('button');
    buttondelete.classList = 'delete';
    buttondelete.innerText = 'delete book';
    buttondelete.addEventListener('click', () => {deleteBook(arr, div.dataset.id)})
    div.appendChild(buttondelete);
    library.appendChild(div);
}


const submitbtn = document.querySelector('#createbook');
submitbtn.addEventListener('click', ()=>{
    //submitbtn.preventDefault();
    if(form.checkValidity()){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pagenum = Number(document.querySelector('#pagenum').value);
    const isRead = document.querySelector('#isread').checked;
    const book = new Book(title, author, pagenum, isRead);
    Library.push(book);
    form.reset();
    populateLibrary(Library);
} else {
    form.reportValidity();
}
});

function deleteBook(arr, book){
    arr.splice(book, 1);
    populateLibrary(arr);
}

populateLibrary(Library);
