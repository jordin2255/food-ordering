"use client";
import React from 'react';

import { useEffect,useState } from "react";
import GlobalApi from '../_utils/GlobalApi';


function CategoryList() {
  const [CategoryList,setCategoryList]=useState([]);
  useEffect(() => {
    getCateogoryList();
  }, []);
  const getCateogoryList = () => {
    GlobalApi.GetCategory().then((res) => {
      console.log(res.categories);
      setCategoryList(res.categories);
    });
  };
  return (
    <div>CategoryList</div>
  )
}

export default CategoryList