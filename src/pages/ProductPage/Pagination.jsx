import React, { useMemo } from "react";

const PAGE_STEP = 1;

const Pagination = ({ page, limit, total }) => {
  // tính tổng số page : tổng số sản phẩm chia số sản phẩm của 1 trang

  const totalPage = useMemo(() => {
    if (!limit || !total) {
      console.log("check");
      return 1;
    }
    return Math.ceil(Number(total) / Number(limit) || 1);
  }, [limit, total]);

  const payList = useMemo(() => {
    let start = page - PAGE_STEP;
    let end = page + PAGE_STEP;

    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end < totalPage) {
        end = totalPage;
      }
    }

    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }

    const list = [];
    for (let i = start; i < end + 1; i++) {
      list.push(i);
    }
  }, [page, totalPage]);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className="page-item disabled">
          <a
            className="page-link page-link-prev"
            href="#"
            aria-label="Previous"
            tabIndex={-1}
            aria-disabled="true"
          >
            <span aria-hidden="true">
              <i className="icon-long-arrow-left" />
            </span>
            Prev{" "}
          </a>
        </li>
        <li className="page-item active" aria-current="page">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item-total">of 6</li>
        <li className="page-item">
          <a className="page-link page-link-next" href="#" aria-label="Next">
            {" "}
            Next{" "}
            <span aria-hidden="true">
              <i className="icon-long-arrow-right" />
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
