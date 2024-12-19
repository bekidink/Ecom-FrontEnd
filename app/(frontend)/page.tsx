"use client";
import React from "react";
import banner from "@/assets/banner.jpg";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../../utils/valideURLConvert";
import CategoryWiseProductDisplay from "@/components/custom/CategoryWiseProductDisplay";
import { useRouter } from "next/navigation";
// import { Link, useNavigate } from "react-router-dom";
// import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RootState } from "@/store/store";
const Home = () => {
  const loadingCategory = useSelector(
    (state: RootState) => state.product.loadingCategory
  );
  const categoryData = useSelector(
    (state: RootState) => state.product.allCategory
  );
  const subCategoryData = useSelector(
    (state: RootState) => state.product.allSubCategory
  );
  // const navigate = useNavigate();
  const router = useRouter();
  const handleRedirectProductListpage = (id:any, cat:any) => {
    console.log(id, cat);
    const subcategory:any = subCategoryData.find((sub:any) => {
      const filterData = sub.category.some((c:any) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/category/${valideURLConvert(cat)}-${id}_${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;
    router.push(url);
    // navigate(url);
    console.log(url);
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };
  return (
    <section className="bg-white">
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          } `}
        >
          <img
            src="https://i.pinimg.com/236x/42/21/92/42219265cea7d7fc3200f6808021b22a.jpg"
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={"/banner-mobile.jpg"}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2   gap-2">
        {loadingCategory ? (
          new Array(12).fill(null).map((c, index) => {
            return (
              <div
                key={index + "loadingcategory"}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            );
          })
        ) : (
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={false}
            responsive={responsive}
            // ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="px-4"
          >
            {categoryData.map((cat: any, index) => {
              return (
                <div
                  key={index + "displayCategory"}
                  className="w-full h-full"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div>
                    <img
                      src={cat.image}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            })}
          </Carousel>
        )}
      </div>

      {/***display category product */}
      {categoryData?.map((c: any, index) => {
        return (
          <CategoryWiseProductDisplay
            key={index + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
