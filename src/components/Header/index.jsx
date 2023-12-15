import React, { useEffect } from "react";
import HeaderMiddle from "./HeaderMiddle";
import HeaderTop from "./HeaderTop";

const Header = () => {
    useEffect(() => {
        var catDropdown = $(".category-dropdown"),
            catInitVal = catDropdown.data("visible");
        if ($(".sticky-header").length && $(window).width() >= 992) {
            var sticky = new Waypoint.Sticky({
                element: $(".sticky-header")[0],
                stuckClass: "fixed",
                offset: -300,
                handler: function (direction) {
                    // Show category dropdown
                    if (catInitVal && direction == "up") {
                        catDropdown
                            .addClass("show")
                            .find(".dropdown-menu")
                            .addClass("show");
                        catDropdown
                            .find(".dropdown-toggle")
                            .attr("aria-expanded", "true");
                        return false;
                    }

                    // Hide category dropdown on fixed header
                    if (catDropdown.hasClass("show")) {
                        catDropdown
                            .removeClass("show")
                            .find(".dropdown-menu")
                            .removeClass("show");
                        catDropdown
                            .find(".dropdown-toggle")
                            .attr("aria-expanded", "false");
                    }
                },
            });
        }
    }, []);

    return (
        <header className="header">
            <HeaderTop />
            <HeaderMiddle />
        </header>
    );
};

export default Header;
