function Pagination({page, totalPages, onPageChange}) {
    return (
        <div style={styles.container}>
            <button
                style={page === 0 ? styles.buttonDisabled : styles.button}
                onClick={() => onPageChange(page -1)}
                disabled = {page === 0}
            >
                Previous
            </button>

            <span style={styles.pageInfo}>Page {page+1} of {totalPages}</span>

            <button
                style={page + 1 >= totalPages ? styles.buttonDisabled : styles.button}
                onClick={() => onPageChange(page +1)}
                disabled = {page + 1 >= totalPages}
            >
                Next
            </button>
        </div>
    )

}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '24px 0',
    },
    button: {
        padding: '8px 16px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
    buttonDisabled: {
        padding: '8px 16px',
        backgroundColor: '#e5e7eb',
        color: '#9ca3af',
        border: 'none',
        borderRadius: '4px',
        cursor: 'not-allowed',
        fontSize: '14px',
    },
    pageInfo: {
        fontSize: '14px',
        color: '#374151',
    }
}

export default Pagination;