import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";

const InputNumberStyle = styled.input`
  // mặc định của broswer khi input type number là có 2 cái arrow -> ẩn đi
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  -moz-appearance: textfield;
`;

const ProductQuantity = (
  {
    className,
    defaulrValue = 1,
    min = 1,
    max = 10,
    step = 1,
    onChange,
    ...inputProps
  },
  ref
) => {
  const [currentQuantity, setCurrentQuantity] = useState(defaulrValue ?? 1);

  useImperativeHandle(ref, () => {
    return {
      value: currentQuantity,
      reset: () => {
        setCurrentQuantity(defaulrValue);
      },
    };
  });

  useEffect(() => {
    onChange?.(currentQuantity);
  }, [currentQuantity]);

  // nhận giá trị khi nhấn dấu -
  const _onDecrease = () => {
    let value = _modifyValue(Number(currentQuantity) - Number(step));
    setCurrentQuantity(value);
  };

  // nhận giá trị khi nhấn dấu +
  const _onIncrease = () => {
    let value = _modifyValue(Number(currentQuantity) + Number(step));
    setCurrentQuantity(value);
  };

  // nhận giá trị khi nhập
  const _onInputChage = (e) => {
    setCurrentQuantity(_modifyValue(Number(e.target.value)));
  };

  // modify value

  const _modifyValue = (value) => {
    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    } else {
      return value;
    }
  };

  return (
    <div className={className}>
      <div className="input-group  input-spinner">
        <div className="input-group-prepend">
          <button
            className="btn btn-decrement btn-spinner"
            onClick={_onDecrease}
          >
            <i className="icon-minus"></i>
          </button>
        </div>
        <InputNumberStyle
          type="number"
          className="form-control"
          style={{ textAlign: "center" }}
          value={currentQuantity || ""}
          onChange={(e) => _onInputChage(e)}
          max={max}
          {...inputProps}
        />
        <div className="input-group-append">
          <button
            className="btn btn-increment btn-spinner"
            onClick={_onIncrease}
          >
            <i className="icon-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ProductQuantity);
