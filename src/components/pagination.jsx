import React from "react";
import _ from "lodash";

const Pagination = ({
  currentPage,
  totalRecordsCount,
  pageSize,
  onPageChange
}) => {
  function getPageRange() {
    const pageCount = Math.ceil(totalRecordsCount / pageSize);
    return _.range(1, pageCount + 1);
  }

  const pageRange = getPageRange();
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            onClick={() =>
              onPageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
          >
            Previous
          </a>
        </li>

        {pageRange.map(page => (
          <li class={page === currentPage ? "page-item active" : "page-item"}>
            <a class="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        <li class="page-item">
          <a
            class="page-link"
            onClick={() =>
              onPageChange(
                currentPage != pageRange.length ? currentPage + 1 : currentPage
              )
            }
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
