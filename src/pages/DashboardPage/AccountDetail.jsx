import { Select } from "antd";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../../components/Input";
import { MESSAGE, REGREX } from "../../constants/validate";
import useAddress from "../../hook/useAddress";
import { handleUpdateProfile } from "../../store/reducers/authReducer";
import { formatDate, removeAccents } from "../../utils/format";

const WarpperForm = styled.form`
    .form-group {
        margin: 0;
    }
    .customSelect {
        display: flex;
        height: 40px;
        margin-bottom: 13px;
        div {
            color: #777;
            background-color: #f9f9f9 !important;
            border: 1px solid #ebebeb;
            border-radius: unset;
            &:hover {
                border-color: #fcb941 !important;
            }
        }
    }
`;

const AccountDetail = () => {
    const dispatch = useDispatch();

    const { profile } = useSelector((state) => state.auth);
    const {
        firstName,
        email,
        phone,
        birthday,
        province,
        district,
        ward,
        street,
    } = profile || {};

    const {
        provinceId,
        provinces,
        districtId,
        districts,
        wardId,
        wards,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
    } = useAddress();

    const {
        register,
        reset,
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName,
            email,
            phone,
            birthday,
            province,
            district,
            ward,
            street,
        },
    });
    useEffect(() => {
        if (!profile) return;
        reset?.({
            firstName,
            phone,
            email,
            ward,
            province,
            district,
            street,
            birthday: formatDate(birthday, "YYYY-MM-DD"),
        });
        handleProvinceChange?.(province);
        handleDistrictChange?.(district);
        handleWardChange?.(ward);
    }, [profile]);

    const _onChangeProvince = (changeId) => {
        handleProvinceChange(changeId);
        reset({
            ...getValues(),
            province: changeId,
            district: undefined,
            ward: undefined,
        });
    };
    const _onChangeDistrict = (changeId) => {
        handleDistrictChange(changeId);
        reset({
            ...getValues(),
            district: changeId,
            ward: undefined,
        });
    };
    const _onChangeWard = (changeId) => {
        handleWardChange(changeId);
        reset({
            ...getValues(),
            ward: changeId,
        });
    };

    const _onSubmit = (value) => {
        const payload = { ...value, email, lastName: "" };
        console.log("vlue", value);
        dispatch(handleUpdateProfile(payload));
        reset();
    };

    return (
        <div
            className="tab-pane fade show active"
            id="tab-account"
            role="tabpanel"
            aria-labelledby="tab-account-link"
        >
            <WarpperForm
                onSubmit={handleSubmit(_onSubmit)}
                action="#"
                className="account-form"
            >
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            label="Full Name"
                            required
                            errors={errors?.firstName}
                            {...register("firstName", {
                                required: MESSAGE.required,
                            })}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            label="Email address"
                            required
                            disabled
                            defaultValue={email}
                            errors={errors?.email}
                            {...register("email")}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <Input
                            label="Phone number"
                            required
                            errors={errors?.phone}
                            {...register("phone", {
                                required: MESSAGE.required,
                                pattern: {
                                    value: REGREX.phone,
                                    message: MESSAGE.phone,
                                },
                            })}
                        />
                    </div>
                    <div className="col-sm-6">
                        <Input
                            label="Birthday"
                            required
                            type="date"
                            errors={errors?.birthday}
                            defaultValue={formatDate(birthday, "YYYY-MM-DD")}
                            {...register("birthday", {
                                required: MESSAGE.required,
                            })}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <label>Province/City *</label>
                        <Controller
                            name="province"
                            control={control}
                            rules={{ required: MESSAGE.required }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            errors={errors?.province}
                                            className="customSelect"
                                            showSearch
                                            value={provinceId}
                                            options={provinces}
                                            onChange={_onChangeProvince}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => {
                                                return removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    );
                                            }}
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 24 }}
                                        >
                                            {errors?.province?.message || ""}
                                        </p>
                                    </>
                                );
                            }}
                        />
                        {/* <label>Province/City *</label>
                        <div className="select-custom">
                            <select
                                className="form-control form-select"
                                id="city"
                                aria-label="Default select example"
                            >
                                <option selected />
                            </select>
                        </div> */}
                    </div>
                    <div className="col-sm-4">
                        <label>District/Town *</label>
                        <Controller
                            name="district"
                            control={control}
                            rules={{ required: MESSAGE.required }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            className="customSelect"
                                            showSearch
                                            value={districtId}
                                            options={districts}
                                            onChange={_onChangeDistrict}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => {
                                                return removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    );
                                            }}
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 24 }}
                                        >
                                            {errors?.district?.message || ""}
                                        </p>
                                    </>
                                );
                            }}
                        />
                    </div>
                    <div className="col-sm-4">
                        <label>Ward *</label>
                        <Controller
                            name="ward"
                            control={control}
                            rules={{ required: MESSAGE.required }}
                            render={({ formState: { errors } }) => {
                                return (
                                    <>
                                        <Select
                                            className="customSelect"
                                            showSearch
                                            value={wardId}
                                            options={wards}
                                            onChange={_onChangeWard}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => {
                                                return removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    );
                                            }}
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 24 }}
                                        >
                                            {errors?.ward?.message || ""}
                                        </p>
                                    </>
                                );
                            }}
                        />
                    </div>
                </div>
                <Input
                    label="Street address"
                    required
                    errors={errors?.street}
                    {...register("street", {
                        required: MESSAGE.required,
                    })}
                />

                {/* <label>Street address *</label>
                <input
                    type="email"
                    className="form-control"
                    defaultValue="30 Ba Thang Hai St."
                    required
                /> */}
                {/* <label>Current password (leave blank to leave unchanged)</label>
                <input type="password" className="form-control" />
                <label>New password (leave blank to leave unchanged)</label>
                <input type="password" className="form-control" />
                <label>Confirm new password</label>
                <input type="password" className="form-control mb-2" /> */}
                <button type="submit" className="btn btn-outline-primary-2">
                    <span>SAVE CHANGES</span>
                    <i className="icon-long-arrow-right" />
                </button>
            </WarpperForm>
        </div>
    );
};

export default AccountDetail;
