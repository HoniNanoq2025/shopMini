export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Forrige
      </button>

      <span>
        {" "}
        Side {page} af {totalPages}{" "}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Næste
      </button>
    </div>
  );
}
