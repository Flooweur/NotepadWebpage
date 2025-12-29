// Fullscreen Notepad Functionality

/**
 * Opens a notepad in fullscreen mode
 * @param {HTMLElement} notepadElement - The notepad element that was clicked
 */
function openNotepad(notepadElement) {
    const overlay = document.getElementById('fullscreen-overlay');
    const titleElement = document.getElementById('fullscreen-title');
    const contentElement = document.getElementById('fullscreen-content');
    
    // Get title from the clicked notepad
    const title = notepadElement.querySelector('.notepad-title').textContent;
    
    // Get full text from the clicked notepad
    const fullText = notepadElement.querySelector('.full-text').textContent;
    
    // Set the fullscreen content
    titleElement.textContent = title;
    contentElement.textContent = fullText;
    
    // Show the overlay
    overlay.classList.add('active');
    
    // Prevent body scrolling when overlay is open
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the fullscreen notepad view
 * @param {Event} event - The click event
 */
function closeNotepad(event) {
    // Stop event propagation to prevent reopening
    event.stopPropagation();
    
    const overlay = document.getElementById('fullscreen-overlay');
    
    // Hide the overlay
    overlay.classList.remove('active');
    
    // Restore body scrolling
    document.body.style.overflow = '';
}

// Close overlay when clicking outside the notepad
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('fullscreen-overlay');
    
    overlay.addEventListener('click', function(event) {
        // Only close if clicking directly on the overlay (not the notepad)
        if (event.target === overlay) {
            closeNotepad(event);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const overlay = document.getElementById('fullscreen-overlay');
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});
