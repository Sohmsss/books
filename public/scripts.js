function deleteBook(id) {
  if (confirm('Are you sure you want to delete this book?')) {
    fetch(`/delete-book/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.reload();
      }
    })
    .catch(error => console.error('Error:', error));
  }
}

function editBook(id) {
  const bookCard = document.querySelector(`#book-${id}`);
  const title = bookCard.querySelector('.book-title').textContent;
  const notes = bookCard.querySelector('.notes').textContent;
  const rating = bookCard.querySelector('.rating-badge').textContent.split('/')[0];
  const isbn = bookCard.dataset.isbn;

  // Populate the form
  document.querySelector('input[name="title"]').value = title;
  document.querySelector('textarea[name="notes"]').value = notes;
  document.querySelector('input[name="rating"]').value = rating;
  document.querySelector('input[name="isbn"]').value = isbn || '';
  
  // Change form action and submit button
  const form = document.querySelector('.add-book-form');
  form.dataset.editId = id;
  document.querySelector('.submit-button').textContent = 'Update Book';
  
  // Scroll to form
  form.scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
  const form = document.querySelector('.add-book-form');
  form.reset();
  form.dataset.editId = '';
  document.querySelector('.submit-button').textContent = 'Add Book';
}

// Handle form submission
document.querySelector('.add-book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const editId = this.dataset.editId;
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  if (editId) {
    // Update existing book
    fetch(`/update-book/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        resetForm();
        window.location.reload();
      }
    })
    .catch(error => console.error('Error:', error));
  } else {
    // Add new book
    this.submit();
  }
}); 