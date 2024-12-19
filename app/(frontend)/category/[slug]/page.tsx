"use client";
import React, { useEffect, useState } from "react";
import Axios from "@/utils/Axios";
import SummaryApi from "@/utils/summaryApi";
import AxiosToastError from "@/utils/AxiosToastError";
import Loading from "@/components/custom/Loading";
import CardProduct from "@/components/custom/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "@/utils/valideURLConvert";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RootState } from "@/store/store";

const ProductListPage = ({
  params: { slug },
  
}: {
  params: { slug: string };
}) => {
  const [data, setData] = useState([]);
  // const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const AllSubCategory = useSelector(
    (state: RootState) => state.product.allSubCategory
  );
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);

  const CategoryParms = slug.split("_");
  const categoryParams = CategoryParms[0];
  const subCategoryParams = CategoryParms[1];
  console.log("category", CategoryParms);
  const subCategory = CategoryParms[1].split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");

  const categoryId = categoryParams.split("-").slice(-1)[0];
  const subCategoryId = subCategoryParams.split("-").slice(-1)[0];

  const fetchProductdata = async () => {
    try {
      // setLoading(true);
      // const response = await Axios({
      //   url: SummaryApi.getProductByCategoryAndSubCategory.url,
      //   method: SummaryApi.getProductByCategoryAndSubCategory.method,
      //   data: {
      //     categoryId: categoryId,
      //     subCategoryId: subCategoryId,
      //     page: "1",
      //     limit: 8,
      //   },
      // });
      // const { data: responseData } = response;
      // if (responseData.success) {
      //   if (responseData.page == 1) {
      //     setData(responseData.data);
      //   } else {
      //     setData([...data, ...responseData.data]);
      //   }
      //   setTotalPage(responseData.totalCount);
      // }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, []);

  useEffect(() => {
    const sub = AllSubCategory.filter((s: any) => {
      const filterData = s.category.some((el: any) => {
        return el._id == categoryId;
      });

      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [AllSubCategory]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24  mx-auto grid grid-cols-[90px,1fr]  md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/**sub category **/}
        <ScrollArea className="min-h-[88vh] max-h-[88vh] rounded-md border">
          {DisplaySubCatory.map((s: any, index) => {
            const link = `/category/${valideURLConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }_${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                href={link}
                key={index}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </ScrollArea>
        {/* <div className=" min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCatory.map((s, index) => {
            const link = `/category/${valideURLConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }_${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                href={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div> */}

        {/**Product **/}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 ">
                {data.map((p: any, index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                    />
                  );
                })}
              </div>
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
