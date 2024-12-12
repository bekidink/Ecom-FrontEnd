import toast from "react-hot-toast";

const AxiosToastError = (error:any) => {
  toast.error(error?.response?.data?.message);
};

export default AxiosToastError;
