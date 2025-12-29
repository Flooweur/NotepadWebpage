# My Notepads

A static webpage with a Windows XP aesthetic, featuring a collection of notepads that can be viewed in fullscreen mode.

## Features

- **Windows XP Aesthetic**: Authentic Windows XP look and feel with the classic blue title bars, gradient buttons, and Tahoma-style fonts
- **Notepad Grid**: 2 notepads per row, responsive layout
- **Fullscreen View**: Click any notepad to view it in fullscreen with scrollable content
- **Easy to Customize**: Simple structure to add more notepads

## How to Add a New Notepad

To add a new notepad, copy the following template into the `<main class="notepad-grid">` section of `index.html`:

```html
<div class="notepad" onclick="openNotepad(this)">
    <div class="notepad-titlebar">
        <span class="notepad-title">YOUR TITLE HERE</span>
        <div class="titlebar-buttons">
            <button class="btn-minimize">_</button>
            <button class="btn-maximize">□</button>
            <button class="btn-close">×</button>
        </div>
    </div>
    <div class="notepad-menu">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
    </div>
    <div class="notepad-content">
        <p class="preview-text">YOUR PREVIEW TEXT HERE...</p>
        <p class="full-text" style="display: none;">YOUR FULL TEXT HERE...</p>
    </div>
</div>
```

Replace:
- `YOUR TITLE HERE` - with the notepad's title
- `YOUR PREVIEW TEXT HERE...` - with a short preview (shown in the grid)
- `YOUR FULL TEXT HERE...` - with the full content (shown in fullscreen)

## File Structure

```
/
├── index.html    # Main HTML structure
├── styles.css    # Windows XP styling
├── script.js     # Fullscreen functionality
└── README.md     # This file
```

## Deployment

This site is designed to be hosted on GitHub Pages. Simply push to your repository and enable GitHub Pages in the repository settings.

## Usage

1. Open `index.html` in a browser or deploy to GitHub Pages
2. Click on any notepad to open it in fullscreen
3. Click the red X button or press Escape to close the fullscreen view
4. Click outside the notepad to close it as well
