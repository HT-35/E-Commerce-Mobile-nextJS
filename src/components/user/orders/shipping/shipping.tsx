'use client';
import React from 'react';

const Shipping = () => {
  return (
    <>
      <div className="myorder-content">
        <div className="all-myorder mt-[1rem]">
          <div className="all-myorder-parent-item border-b border-gray-200">
            <div className="all-myorder-list">
              <div className="all-myorder-item flex mt-4 pb-4">
                <div className="all-myorder-item-img w-[100px]">
                  <img src="https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg" />
                </div>
                <div className="all-myorder-item-name pl-4 flex-grow text-left text-base font-medium">
                  <p>iPhone XR 128GB</p>
                  <span>x1</span>
                </div>
                <div className="all-myorder-item-price flex items-center text-base font-medium">
                  11.000.000
                </div>
              </div>
              <div className="all-myorder-item flex mt-4 pb-4">
                <div className="all-myorder-item-img w-[100px]">
                  <img src="https://cdn.tgdd.vn/Products/Images/42/191483/iphone-xr-128gb-600x600.jpg" />
                </div>
                <div className="all-myorder-item-name pl-4 flex-grow text-left text-base font-medium">
                  <p>iPhone XR 128GB</p>
                  <span>x1</span>
                </div>
                <div className="all-myorder-item-price flex items-center text-base font-medium">
                  11.000.000
                </div>
              </div>
            </div>
            <div className="all-myorder-item-totalprice text-right py-2">
              <span className="text-base">Tổng số tiền : </span>
              <strong className="text-[20px] text-[#d70018] font-bold">
                22.000.000 đ
              </strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
