// Fungsi untuk mengambil data user
function getDataUser() {
    const dataUser = localStorage.getItem('user');

    if (dataUser) {
        const conData = JSON.parse(dataUser);

        const imgElm = document.getElementById('img_user');
        imgElm.src = conData.imgUrl;

        const usernameElm = document.getElementById('username');
        usernameElm.innerHTML = conData.username;
    } else {
        window.location.href = 'login.html';
    }
};

// Fungsi untuk mengambil data buku dari localStorage
function getBooks() {
    const booksJSON = localStorage.getItem('books');
    return booksJSON ? JSON.parse(booksJSON) : [];
}

// Fungsi untuk menyimpan data buku ke localStorage
function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Fungsi untuk menampilkan buku sesuai dengan pencarian
function searchBooks() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const unfinishedBooksList = document.getElementById('unfinishedBooks');
    const finishedBooksList = document.getElementById('finishedBooks');

    unfinishedBooksList.innerHTML = '';
    finishedBooksList.innerHTML = '';

    const books = getBooks();

    books.forEach((book) => {
        const title = book.title.toLowerCase();

        if (title.includes(searchInput)) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <b>${book.title}</b> oleh ${book.author} (${book.year})
                <button onclick="${book.isComplete ? 'moveToUnfinished' : 'moveToFinished'}(${book.id})">${book.isComplete ? 'Belum Selesai' : 'Selesai'}</button>
                <button onclick="deleteBook(${book.id})">Hapus</button>
            `;

            if (book.isComplete) {
                finishedBooksList.appendChild(listItem);
            } else {
                unfinishedBooksList.appendChild(listItem);
            }
        }
    });
}

// Fungsi untuk menampilkan buku pada rak yang sesuai
function displayBooks() {
    const unfinishedBooksList = document.getElementById('unfinishedBooks');
    const finishedBooksList = document.getElementById('finishedBooks');

    unfinishedBooksList.innerHTML = '';
    finishedBooksList.innerHTML = '';

    const books = getBooks();

    books.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <b>${book.title}</b> oleh ${book.author} (${book.year})
            <button onclick="${book.isComplete ? 'moveToUnfinished' : 'moveToFinished'}(${book.id})">${book.isComplete ? 'Belum Selesai' : 'Selesai'}</button>
            <button onclick="deleteBook(${book.id})">Hapus</button>
        `;

        if (book.isComplete) {
            finishedBooksList.appendChild(listItem);
        } else {
            unfinishedBooksList.appendChild(listItem);
        }
    });
}

// Fungsi untuk menambahkan buku baru
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value);
    const isComplete = document.getElementById('isComplete').checked;

    const books = getBooks();

    const book = {
        id: Date.now(),
        title,
        author,
        year,
        isComplete,
    };

    books.push(book);
    saveBooks(books);

    displayBooks();

    // Reset input fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('isComplete').checked = false;
}

// Fungsi untuk memindahkan buku ke rak "Selesai Dibaca"
function moveToFinished(id) {
    const books = getBooks();

    const index = books.findIndex((book) => book.id == id);

    if (index !== -1) {
        books[index].isComplete = true;
        saveBooks(books);
        displayBooks();
    }
}

// Fungsi untuk memindahkan buku dari rak "Selesai Dibaca" ke "Belum Selesai Dibaca"
function moveToUnfinished(id) {
    const books = getBooks();

    const index = books.findIndex((book) => book.id == id);

    if (index !== -1) {
        books[index].isComplete = false;
        saveBooks(books);
        displayBooks();
    }
}

// Fungsi untuk menghapus buku
function deleteBook(id) {
    const books = getBooks();

    const index = books.findIndex((book) => book.id == id);

    if (index !== -1) {
        books.splice(index, 1);
        saveBooks(books);
        displayBooks();
    }
}

getDataUser();
displayBooks();

// Fungsi menghapus data di Local Storage ketika Logout
function onLogout() {
    localStorage.removeItem('user');
    localStorage.removeItem('books');
    window.location.href = 'login.html';
}


