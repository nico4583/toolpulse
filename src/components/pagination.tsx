import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
      <Link
        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : `${basePath}?page=1`}
        aria-disabled={currentPage === 1}
        className={`rounded-md px-3 py-2 text-sm ${currentPage === 1 ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-slate-900 text-white"}`}
      >
        Previous
      </Link>
      <p className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </p>
      <Link
        href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : `${basePath}?page=${totalPages}`}
        aria-disabled={currentPage === totalPages}
        className={`rounded-md px-3 py-2 text-sm ${currentPage === totalPages ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-slate-900 text-white"}`}
      >
        Next
      </Link>
    </nav>
  );
}
