"use client"
import React, { useEffect, useState } from "react";
import CardLoading from "@/components/custom/CardLoading";
import SummaryApi from "@/utils/summaryApi";
import Axios from "@/utils/Axios";
import AxiosToastError from "@/utils/AxiosToastError";
import CardProduct from "@/components/custom/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import noDataImage from "@/assets/nothing here yet.webp";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const SearchPage = ({ params: { slug} }: { params: { slug: string } }) => {
  console.log("slug",slug)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useSearchParams();
  const searchText = slug;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData((preve) => {
            return [...preve, ...responseData.data];
          });
        }
        setTotalPage(responseData.totalPage);
        console.log(responseData);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchText]);

  console.log("page", page);

  const handleFetchMore = () => {
    if (totalPage > page) {
      setPage((preve) => preve + 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <p className="font-semibold">Search Results: {data.length} </p>

      {
        //no data
        !data[0] && !loading && (
          <div className="flex flex-col justify-center items-center w-full mx-auto">
            <img
              src={"/nothing here yet.webp"}
              className="w-full h-full max-w-xs max-h-xs block"
            />
            <p className="font-semibold my-2">No Data found</p>
          </div>
        )
      }
    </div>
  );
};

export default SearchPage;
