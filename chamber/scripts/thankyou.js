document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById('thankyou-results');

    if (container) {
        const fields = [
            { key: 'fname', label: 'First Name' },
            { key: 'lname', label: 'Last Name' },
            { key: 'orgtitle', label: 'Organizational Title' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Mobile Phone' },
            { key: 'organization', label: 'Organization Name' },
            { key: 'membership', label: 'Membership Level' },
            { key: 'description', label: 'Organization Description' },
            { key: 'timestamp', label: 'Submission Timestamp' }
        ];

        let htmlContent = '<ul class="thank-you-list">';
        fields.forEach(field => {
            const value = params.get(field.key);
            if (value) {
                htmlContent += `<li><strong>${field.label}:</strong> ${escapeHTML(value)}</li>`;
            }
        });
        htmlContent += '</ul>';

        container.innerHTML = htmlContent;
    }
});

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}