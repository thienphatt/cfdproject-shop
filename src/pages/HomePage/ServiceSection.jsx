import React from "react";

const ServiceSection = ({ services }) => {
    return (
        <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
            <div className="container">
                <div className="row">
                    {Object.values(services)?.map((item, i) => (
                        <div className="col-sm-6 col-lg-3" key={i}>
                            <div className="icon-box icon-box-side">
                                <span className="icon-box-icon text-dark">
                                    <i className="icon-rocket" />
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">
                                        {item?.title}
                                    </h3>
                                    <p>{item?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceSection;
