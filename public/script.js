document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const booksList = document.getElementById('books');
    const filterYear = document.getElementById('filter-year');
    const filterCategory = document.getElementById('filter-category');
    const applyFiltersButton = document.getElementById('apply-filters');
    const clearFiltersButton = document.getElementById('clear-filters');

    let books = JSON.parse(localStorage.getItem('books')) || [];

    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    function displayBooks(books) {
        booksList.innerHTML = '';
        books.forEach(book => {
            const bookItem = document.createElement('li');
            bookItem.textContent = `${book.title} by ${book.author} (${book.year}) - ${book.category}`;
            booksList.appendChild(bookItem);
        });
    }

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        const category = document.getElementById('category').value;

        const newBook = { title, author, year, category };
        books.push(newBook);
        saveBooks();
        displayBooks(books);
        bookForm.reset();
    });

    applyFiltersButton.addEventListener('click', () => {
        const year = filterYear.value;
        const category = filterCategory.value;
        const filteredBooks = books.filter(book => {
            return (!year || book.year === year) && (!category || book.category === category);
        });
        displayBooks(filteredBooks);
    });

    clearFiltersButton.addEventListener('click', () => {
        filterYear.value = '';
        filterCategory.value = '';
        displayBooks(books);
    });

    displayBooks(books);
});
