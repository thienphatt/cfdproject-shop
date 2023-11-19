import React from "react";
import { formatDate, transformNumberToPrecent } from "../../utils/format";

const Review = ({ reviews }) => {
    console.log("reviews", reviews);
    return (
        <>
            {reviews?.map((review) => {
                const { id, updateAt, description, order, rate, title } =
                    review;
                return (
                    <div key={id} className="review">
                        <div className="row no-gutters">
                            <div className="col-auto">
                                <h4>
                                    {/* {số order khác nhau nên cắt lấy 4 số cuối} */}
                                    <a href="#">#{order.slice(-4)}</a>
                                </h4>
                                <div className="ratings-container">
                                    <div className="ratings">
                                        <div
                                            className="ratings-val"
                                            style={{
                                                width: `${transformNumberToPrecent(
                                                    rate
                                                )}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                                <span className="review-date">
                                    {formatDate(updateAt)}
                                </span>
                            </div>
                            <div className="col">
                                <h3>{title || ""}</h3>
                                <div className="review-content">
                                    <p>{description || "GOOD"}</p>
                                </div>
                                <div className="review-action">
                                    <a href="#">
                                        <i className="icon-thumbs-up" />
                                        Helpful (2){" "}
                                    </a>
                                    <a href="#">
                                        <i className="icon-thumbs-down" />
                                        Unhelpful (0){" "}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Review;
