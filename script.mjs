import Book from "./book.mjs";

const form = document.querySelector('#addbook');

const arrLibrary = [];
const library = document.querySelector("#library");

//add some books to library so it doesn't look too empty
arrLibrary.push(new Book('The Hobbit', "J. R. R. Tolkien", 320, false), 
new Book("Moby Dick", 'Herman Melville', 378, false), 
new Book('The Extraordinary Journeys: Twenty Thousand Leagues Under the Sea', 'Jules Verne', 496, true));

const addBookButton = document.querySelectorAll('.addbookbtn');
const addBookForm = document.querySelector('.wrapper.addbook');

addBookButton.forEach(element => {element.addEventListener("click", function(){addBookForm.toggleAttribute("hidden")})})


//takes array of Book objects and calls for addBook method.
function populateLibrary(){
    arrLibrary.forEach(element => {
        addBook(element);
    });
}

//takes book object method from an array, 
function addBook(bookObj){
    const div = document.createElement('div');
    div.classList.add('card');
    div.dataset.id = bookObj.title + bookObj.author;
    for (const key in bookObj) {
        if (Object.hasOwnProperty.call(bookObj, key)) {
            const element = bookObj[key];
            let field;
            switch(typeof(element)){
                case 'boolean':
                    field = document.createElement('button');
                    element ? field.innerText = 'Read' : field.innerText = 'Not read';
                    field.addEventListener('click', () => {
                        bookObj.setRead(field);
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
    buttondelete.addEventListener('click', () => {deleteBook(bookObj, div.dataset.id)})
    div.appendChild(buttondelete);
    library.appendChild(div);
}

//add even listener to "Create Book button" and use it to validate form
const submitbtn = document.querySelector('#createbook');
submitbtn.addEventListener('click', ()=>{
    document.querySelector('#title').setCustomValidity('');
    if(form.checkValidity()){
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pagenum = Number(document.querySelector('#pagenum').value);
    const isRead = document.querySelector('#isread').checked;
    const book = new Book(title, author, pagenum, isRead);
        if (checkDuplicates(book)){
            document.querySelector('#title').setCustomValidity("Same book by this author is already in the library");
            document.querySelector('#title').reportValidity();
        } else {
            arrLibrary.push(book);
            form.reset();
            addBook(book);
            addBookForm.toggleAttribute("hidden");
        }
} else {
    form.reportValidity();
}
});


function checkDuplicates(book){
    let status = false;
    arrLibrary.forEach((element) => {
        if((book.title.toString() === element.title.toString())&&(book.author.toString() === element.author.toString())){
            status = true;
        }
    })
    return status;
 }


//deletes book from Dom and arrLibrary using ID made of book author and title
function deleteBook(book, id){
    const element = document.querySelector(`#library > div[data-id='${id}']`);
    element.remove();
    arrLibrary.splice(arrLibrary.indexOf(book), 1);
}

populateLibrary();
