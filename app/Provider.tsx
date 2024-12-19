"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/store";
import {
  setLoadingCategory,
  setAllCategory,
  setAllSubCategory,
} from "@/store/slices/productSlice";
import { setUserDetails } from "@/store/slices/userSlice";
import fetchUserDetails from "@/utils/fetchUserDetails";
import SummaryApi from "@/utils/summaryApi";
import Axios from "@/utils/Axios";
import { FC, useEffect } from "react";
interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
export const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllSubCategory(
            responseData.data.sort((a: { name: string; }, b: { name: string; }) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem()
  }, []);
  return <div>{children}</div>;
};
