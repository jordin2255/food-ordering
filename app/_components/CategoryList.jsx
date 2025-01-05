"use client";
import React from "react";

import { useEffect, useState, useRef } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

function CategoryList() {
  const listRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCateogoryList();
  }, []);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("Burger");
  useEffect(() => {
    setSelectedCategory(params.get("category"));
  }, [params]);
  const getCateogoryList = () => {
    GlobalApi.GetCategory().then((res) => {
      console.log(res.categories);
      setCategoryList(res.categories);
    });
  };
  const scrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  return (
    <div className="mt-10 relative">
      <div className="flex gap-4 overflow-auto no-scrollbar " ref={listRef}>
        {categoryList &&
          categoryList.map((item, index) => (
            <Link
              href={"?category=" + item.slug}
              key={index}
              className={
                `flex flex-col items-center gap-2 border p-3 rounded-xl min-w-32 hover:border-primary hover:bg-orange-50 cursor-pointer group 
                ${selectedCategory===item.slug && "text-primary border-primary bg-orange-50"}`
              }
            >
              <Image
                src={item.icon.url}
                alt={item.name}
                width={40}
                height={40}
                className="group-hover:scale-125 transition-all duration-200 rounded-full"
              />
              <h2 className="text-sm font-medium ">{item.name}</h2>
            </Link>
          ))}
      </div>
      <ArrowRightCircle
        className="absolute -right-10 top-10 bg-gray-400 rounded-full text-white h-8 w-8 cursor-pointer"
        onClick={() => scrollRightHandler()}
      />
    </div>
  );
}

export default CategoryList;
