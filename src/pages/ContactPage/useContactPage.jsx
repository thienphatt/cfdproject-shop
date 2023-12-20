import { message } from "antd";
import { subscribeService } from "../../services/subscribeService";
import { CONTACT_MESSAGE } from "../../constants/message";

const useContactPage = () => {
    const submitForm = async (submitSuccess) => {
        try {
            const res = await subscribeService.subscribe(submitSuccess);
            if (res?.data?.data) {
                message.success(CONTACT_MESSAGE.submitSuccess);
            }
        } catch (error) {
            message.success(CONTACT_MESSAGE.submitFail);
        }
    };

    const submitProps = {
        submitForm,
    };

    return {
        submitProps,
    };
};

export default useContactPage;
