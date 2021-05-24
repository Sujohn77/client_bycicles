import classNames from "classnames";
import React, { useState, useEffect } from "react";
import "./Paginator.scss";

export const Paginator = ({ pageCurrent, OnPageChanged, totalCount, pageSize }) => {
    let pagesCount = Math.ceil(totalCount / pageSize);

    let changePage = page => {
        page <= pagesCount && page > 0 && OnPageChanged(page);
    };

    return (
        <div className="pagination">
            <div onClick={() => changePage(1)}>{"<<"}</div>
            <div onClick={() => changePage(pageCurrent - 1)}>{"<"}</div>
            <div className="list__pages">{pageCurrent}</div>

            <div onClick={() => changePage(pageCurrent + 1)}>{">"}</div>
            <div onClick={() => changePage(pagesCount)}>{">>"}</div>
            <div>Усього сторінок: {pagesCount}</div>
        </div>
    );
};
