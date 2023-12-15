import { useState } from "react";
import useQuery from "./useQuery";
import { authService } from "../services/authService";

const useAddress = (defaulValue) => {
    const [provinceId, setProvinceId] = useState(defaulValue?.provinceId);
    const [districtId, setDistrictId] = useState(defaulValue?.districtId);
    const [wardId, setWardId] = useState(defaulValue?.wardId);

    const { data: provinceData } = useQuery(authService.getDataProvince);
    const { data: districtData } = useQuery(
        () => provinceId && authService.getDataDistrict(provinceId),
        [provinceId]
    );
    const { data: wardData } = useQuery(
        () => districtId && authService.getDataWard(districtId),
        [districtId]
    );

    const handleProvinceChange = (changeId) => {
        setProvinceId(changeId);
        setDistrictId(undefined);
        setWardId(undefined);
    };

    const handleDistrictChange = (changeId) => {
        setDistrictId(changeId);
        setWardId(undefined);
    };
    const handleWardChange = (changeId) => {
        setWardId(changeId);
    };

    return {
        provinces: provinceData?.provinces?.map((province) => {
            return {
                value: province.id,
                label: province.name,
            };
        }),
        districts: districtData?.districts?.map((district) => {
            return {
                value: district.id,
                label: district.name,
            };
        }),
        wards: wardData?.wards?.map((ward) => {
            return {
                value: ward.id,
                label: ward.name,
            };
        }),
        provinceId,
        districtId,
        wardId,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange,
    };
};

export default useAddress;
