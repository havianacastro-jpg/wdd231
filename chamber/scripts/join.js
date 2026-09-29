document.addEventListener('DOMContentLoaded', () => {
    // Assign current timestamp to hidden field
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Modal handling using <dialog> element
    const infoLinks = document.querySelectorAll('.info-link');
    infoLinks.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const dialog = document.getElementById(targetId);
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dialog = button.closest('dialog');
            if (dialog) {
                dialog.close();
            }
        });
    });
});