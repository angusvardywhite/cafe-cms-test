const galleryGrid = document.querySelector('#gallery-grid');

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function loadGallery() {
  try {
    const response = await fetch('/content/gallery.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Could not load gallery');
    const data = await response.json();
    const photos = data.photos || [];

    if (!photos.length) {
      galleryGrid.innerHTML = '<p class="empty-message">No photos have been added yet.</p>';
      return;
    }

    galleryGrid.innerHTML = photos.map((photo, index) => {
      const caption = escapeHtml(photo.caption || `Gallery image ${index + 1}`);
      if (photo.image) {
        return `<figure class="gallery-item">
          <img src="${escapeHtml(photo.image)}" alt="${escapeHtml(photo.alt || caption)}" loading="lazy">
          ${photo.caption ? `<figcaption>${caption}</figcaption>` : ''}
        </figure>`;
      }
      return `<figure class="gallery-item gallery-placeholder">
        <div class="image-placeholder"><span>Photo ${index + 1}</span><small>Upload through /admin</small></div>
        <figcaption>${caption}</figcaption>
      </figure>`;
    }).join('');
  } catch (error) {
    galleryGrid.innerHTML = '<p class="error-message">The gallery could not be loaded. Please try again shortly.</p>';
    console.error(error);
  }
}

loadGallery();
