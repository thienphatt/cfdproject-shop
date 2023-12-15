import React, { useMemo } from "react";
import styled from "styled-components";

const PAGE_STEP = 1;

const Pagination = ({ page, limit = 0, total = 0, onPagiChange }) => {
    // tính tổng số page : tổng số sản phẩm chia số sản phẩm của 1 trang
    // use Memo dung de tinh toan lai khi dependence thay doi
    const totalPage = useMemo(() => {
        if (!limit || !total) {
            return 1;
        }
        return Math.ceil(Number(total) / Number(limit)) || 1;
    }, [limit, total]);

    const pageList = useMemo(() => {
        let start = page - PAGE_STEP;
        let end = page + PAGE_STEP;

        if (start <= 0) {
            start = 1;
            end = start + PAGE_STEP * 2;
            if (end > totalPage) {
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
        return list;
    }, [page, totalPage]);

    const onNext = () => {
        const nextPage = page + 1;
        if (nextPage <= totalPage) {
            onPagiChange(nextPage);
        }
    };

    const onPrev = () => {
        const prevPage = page - 1;
        if (prevPage > 0) {
            onPagiChange(prevPage);
        }
    };

    const onFirst = () => {
        onPagiChange(1);
    };

    const onLast = () => {
        onPagiChange(totalPage);
    };
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <PagiItem isDisabled={page <= 1} onClick={onPrev}>
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-left" />
                    </span>
                    Prev
                </PagiItem>
                <PagiItem isDisabled={pageList[0] === 1} onClick={onFirst}>
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-left" />
                    </span>
                    First
                </PagiItem>
                {pageList?.length > 0 &&
                    pageList.map((pageNum) => (
                        <PagiItem
                            key={pageNum}
                            isActive={pageNum === page}
                            onClick={() => {
                                onPagiChange(pageNum);
                            }}
                        >
                            {pageNum}
                        </PagiItem>
                    ))}
                <PagiItem className="page-item-total">of {totalPage}</PagiItem>
                <PagiItem
                    isDisabled={pageList[pageList.length - 1] === totalPage}
                    onClick={onLast}
                >
                    Last
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-right" />
                    </span>
                </PagiItem>
                <PagiItem
                    isDisabled={pageList[pageList.length - 1] === page}
                    onClick={onNext}
                >
                    Next
                    <span aria-hidden="true">
                        <i className="icon-long-arrow-right" />
                    </span>
                </PagiItem>
            </ul>
        </nav>
    );
};

const PagiItem = ({
    children,
    isActive = false,
    isDisabled = false,
    className = "",
    onClick,
    ...props
}) => {
    return (
        <PagiItemWarpper
            className={`page-item ${className} ${isActive ? "active" : ""} ${
                isDisabled ? "disabled" : ""
            } `}
            //when click, if have disabled then disable click
            onClick={() => (isDisabled ? {} : onClick())}
            {...props}
        >
            <a className="page-link" role="button">
                {children}
            </a>
        </PagiItemWarpper>
    );
};

const PagiItemWarpper = styled.li`
    margin: 0 10px;
    .page-link {
        cursor: pointer;
        &:hover {
            color: #fcb941 !important;
        }
        display: flex;
        gap: 10px;
    }
`;

export default Pagination;
