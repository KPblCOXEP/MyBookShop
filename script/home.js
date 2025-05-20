window.onload = () => {
    fetch('http://localhost:3000/api/books')
            .then(res => res.json())
            .then(data => {
                // выводим книги на страницу
                console.log(data);
            });


            const url_book = 'http://localhost:3000/api/books';
            fetch(url_book)
            .then((response) => {
            if (!response.ok) {
                throw new Error("Error loading books");
            }
            return response.json();
            })
            .then((books) => {
            const listContainer = document.getElementById("book-list");

            books.forEach((book) => {
                const card = document.createElement("div");
                card.className = "book-card";

                card.innerHTML = `
                <img src="${book.image_url}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Price:</strong> ${book.price} ₽</p>
                <p>${book.short_description || ''}</p>
                <a href="book.html?id=${book.id}">More</a>
                `;

                listContainer.appendChild(card);
            });
            })
            .catch((error) => {
            alert("Error loading books: " + error.message);
            });


            function searchBooksByTitle(searchTerm) {
                fetch(`http://localhost:3000/api/books/search?title=${encodeURIComponent(searchTerm)}`)
                    .then(res => res.json())
                    .then(data => {
                    const listContainer = document.getElementById("book-list");
                    listContainer.innerHTML = ''; // очищаем предыдущий список

                    if (data.length === 0) {
                        listContainer.innerHTML = '<p>Книги не найдены</p>';
                        return;
                    }

                    data.forEach(book => {
                        const card = document.createElement("div");
                        card.className = "book-card";
                        card.innerHTML = `
                            <img src="${book.image_url}" alt="${book.title}">
                            <h3>${book.title}</h3>
                            <p><strong>Author:</strong> ${book.author}</p>
                            <p><strong>Price:</strong> ${book.price} ₽</p>
                            <p>${book.short_description || ''}</p>
                            <a href="book.html?id=${book.id}">More</a>
                        `;
                        listContainer.appendChild(card);
                    });
                    
                    })
                    .catch(error => {
                    alert('Ошибка при поиске книг: ' + error.message);
                    });
            }
};