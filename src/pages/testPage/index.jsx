import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TestContainer = styled.div`
    height: 100vh;
`;

const TestPage = () => {
    const [themviec, setThemviec] = useState("");

    const [danhsachviec, setDanhsachviec] = useState(
        JSON.parse(localStorage.getItem("viec")) || []
    );

    const _onSubmit = () => {
        if (themviec.length > 0) {
            setDanhsachviec(() => {
                const danhsach = [...danhsachviec, themviec];
                localStorage.setItem("viec", JSON.stringify(danhsach));

                // localStotage.setItem("viec", JSON.stringify(danhsach));
                return danhsach;
            });

            setThemviec("");
        }
    };

    const _onRemoveClick = (index) => {
        console.log("index", index);
        console.log("danhsachviec", danhsachviec);
        console.log("danhsachviecindex", danhsachviec[index]);
        danhsachviec.splice(index, 1);

        setDanhsachviec(
            localStorage.setItem("viec", JSON.stringify(danhsachviec))
        );
    };

    return (
        <TestContainer>
            <input
                value={themviec}
                onChange={(e) => setThemviec(e.target.value)}
            />
            <button onClick={_onSubmit}>add</button>

            <ul>
                {danhsachviec?.map((item, i) => (
                    <div key={i}>
                        <li>{item}</li>
                        <button onClick={() => _onRemoveClick(i)}>
                            Delete
                        </button>
                    </div>
                ))}
            </ul>
        </TestContainer>
    );
};

export default TestPage;
