import React, { useEffect } from "react";

const BackToTop = () => {
    useEffect(() => {
        var $scrollTop = $("#scroll-top");

        $(window).on("load scroll", function () {
            if ($(window).scrollTop() >= 400) {
                $scrollTop.addClass("show");
            } else {
                $scrollTop.removeClass("show");
            }
        });

        $scrollTop.on("click", function (e) {
            $("html, body").animate(
                {
                    scrollTop: 0,
                },
                800
            );
            e.preventDefault();
        });
    });
    return (
        <button id="scroll-top" title="Back to Top" style={{ display: "flex" }}>
            <i className="icon-arrow-up" />
        </button>
    );
};

export default BackToTop;
