import React from "react";

const Breadcrumb = ({ className, children, ...rest }) => {
    return (
        <nav
            aria-label="breadcrumb"
            className={`breadcrumb-nav ${className}`}
            {...rest}
        >
            <div className="container">
                <ol className="breadcrumb">{children}</ol>
            </div>
        </nav>
    );
};

const BreadcrumbItem = ({ children, isActive = false }) => {
    return (
        <li className={`breadcrumb-item ${isActive ? "active" : ""}`}>
            {children}
        </li>
    );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
