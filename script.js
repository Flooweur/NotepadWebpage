// Fonctionnalité de bloc-notes en plein écran

/**
 * Ouvre un bloc-notes en mode plein écran
 * @param {HTMLElement} notepadElement - L'élément bloc-notes cliqué
 */
function openNotepad(notepadElement) {
    const overlay = document.getElementById('fullscreen-overlay');
    const titleElement = document.getElementById('fullscreen-title');
    const contentElement = document.getElementById('fullscreen-content');
    const menuElement = document.getElementById('fullscreen-menu');
    
    // Récupérer le titre du bloc-notes cliqué
    const title = notepadElement.querySelector('.notepad-title').textContent;
    
    // Récupérer le texte complet du bloc-notes cliqué
    const fullText = notepadElement.querySelector('.full-text').textContent;
    
    // Définir le contenu en plein écran
    titleElement.textContent = title;
    contentElement.textContent = fullText;
    
    // Générer les boutons d'annexes
    generateAnnexButtons(notepadElement, menuElement);
    
    // Afficher la superposition
    overlay.classList.add('active');
    
    // Empêcher le défilement du body quand la superposition est ouverte
    document.body.style.overflow = 'hidden';
}

/**
 * Génère les boutons d'annexes dans la barre de menu
 * @param {HTMLElement} notepadElement - L'élément bloc-notes source
 * @param {HTMLElement} menuElement - L'élément menu où ajouter les boutons
 */
function generateAnnexButtons(notepadElement, menuElement) {
    // Vider le menu existant
    menuElement.innerHTML = '';
    
    // Récupérer les données d'annexes
    const annexesData = notepadElement.getAttribute('data-annexes');
    
    if (!annexesData) {
        // Pas d'annexes - afficher un message
        const noAnnexes = document.createElement('span');
        noAnnexes.className = 'no-annexes';
        noAnnexes.textContent = 'Aucune annexe';
        menuElement.appendChild(noAnnexes);
        return;
    }
    
    try {
        const annexes = JSON.parse(annexesData);
        
        if (annexes.length === 0) {
            const noAnnexes = document.createElement('span');
            noAnnexes.className = 'no-annexes';
            noAnnexes.textContent = 'Aucune annexe';
            menuElement.appendChild(noAnnexes);
            return;
        }
        
        // Créer un bouton pour chaque annexe
        annexes.forEach((annex, index) => {
            const button = document.createElement('button');
            button.className = 'annex-btn';
            button.textContent = annex.name || `Annexe ${index + 1}`;
            button.onclick = (event) => {
                event.stopPropagation();
                openAnnex(annex.name || `Annexe ${index + 1}`, annex.path);
            };
            menuElement.appendChild(button);
        });
    } catch (e) {
        console.error('Erreur lors du parsing des annexes:', e);
        const errorSpan = document.createElement('span');
        errorSpan.className = 'no-annexes';
        errorSpan.textContent = 'Erreur de chargement des annexes';
        menuElement.appendChild(errorSpan);
    }
}

/**
 * Ouvre une fenêtre d'annexe avec l'image
 * @param {string} name - Le nom de l'annexe
 * @param {string} path - Le chemin vers l'image
 */
function openAnnex(name, path) {
    const annexOverlay = document.getElementById('annex-overlay');
    const annexTitle = document.getElementById('annex-title');
    const annexImage = document.getElementById('annex-image');
    
    annexTitle.textContent = name;
    annexImage.src = path;
    annexImage.alt = name;
    
    annexOverlay.classList.add('active');
}

/**
 * Ferme la fenêtre d'annexe
 * @param {Event} event - L'événement de clic
 */
function closeAnnex(event) {
    event.stopPropagation();
    
    const annexOverlay = document.getElementById('annex-overlay');
    annexOverlay.classList.remove('active');
}

/**
 * Ferme la vue plein écran du bloc-notes
 * @param {Event} event - L'événement de clic
 */
function closeNotepad(event) {
    // Arrêter la propagation pour éviter la réouverture
    event.stopPropagation();
    
    const overlay = document.getElementById('fullscreen-overlay');
    
    // Masquer la superposition
    overlay.classList.remove('active');
    
    // Restaurer le défilement du body
    document.body.style.overflow = '';
}

// Fermer les superpositions en cliquant à l'extérieur
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('fullscreen-overlay');
    const annexOverlay = document.getElementById('annex-overlay');
    
    overlay.addEventListener('click', function(event) {
        // Fermer seulement si on clique directement sur la superposition (pas sur le bloc-notes)
        if (event.target === overlay) {
            closeNotepad(event);
        }
    });
    
    annexOverlay.addEventListener('click', function(event) {
        // Fermer seulement si on clique directement sur la superposition (pas sur la fenêtre)
        if (event.target === annexOverlay) {
            closeAnnex(event);
        }
    });
    
    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // D'abord fermer l'annexe si elle est ouverte
            if (annexOverlay.classList.contains('active')) {
                annexOverlay.classList.remove('active');
                return;
            }
            
            // Sinon fermer le bloc-notes
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});
