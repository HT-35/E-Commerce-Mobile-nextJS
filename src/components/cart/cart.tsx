// src/components/cart/cart.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setDataAccount } from '@/lib/redux/slices/accountSlice';
import Link from 'next/link';

const Cart = () => {
  const dispatch = useAppDispatch();
  
  // Get cart and account info from Redux store
  const { cart, name, accessToken } = useAppSelector((state: any) => state.account);

  const info = useAppSelector((state: any) => state.account);
  console.log(`info:`, info);

  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id) => {
    const updatedProducts = cart.map((product) =>
      product._id === id ? { ...product, checked: !product.checked } : product
    );
    dispatch(setDataAccount({ cart: updatedProducts })); // Update cart in Redux

    const allSelected = updatedProducts.every((product) => product.checked);
    setSelectAll(allSelected);
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedProducts = cart.map((product) => ({
      ...product,
      checked: newSelectAll,
    }));
    dispatch(setDataAccount({ cart: updatedProducts })); // Update cart in Redux
  };

  const calculateTotalPrice = () => {
    if (!cart || cart.length === 0) {
      return 0;
    }
  
    return cart
      .filter((product) => product.checked)
      .reduce((total, product) => total + product.price * product.quatity, 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedProducts = cart.map((product) =>
      product._id === id ? { ...product, quatity: newQuantity } : product
    );
    dispatch(setDataAccount({ cart: updatedProducts })); // Update cart in Redux
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="lg:m-4 m-2 min-h-[40px] relative bg-white rounded-lg lg:px-4 py-2 px-2 shadow-lg ">
      {cart.length > 0 || totalPrice > 0 ? (
        <>
          <div className="cart-header border-b border-[#e5e5e5] text-[#323232] p-2.5">
            <div className="go-back flex justify-between">
              <Link href="/">
                <ArrowLeftIcon className="w-7 h-7"></ArrowLeftIcon>
              </Link>
              <p className="font-bold text-[18px]">Giỏ hàng của bạn</p>
              <p></p>
            </div>
          </div>
          <div className="flex flex-nowrap overflow-x-auto p-0 max-w-[800px] mt-4">
            <Button className="bg-[#d70018] text-white font-medium border border-white">
              Giỏ hàng
            </Button>
          </div>
          <div className="mt-3 mb-[3.75rem]">
            <div className="listItemSuperCart">
              <div className="flex items-center mb-[20px]">
                <Checkbox
                  className="mr-[6px]"
                  checked={selectAll}
                  onCheckedChange={handleSelectAllChange}
                />
                <label>Chọn tất cả</label>
              </div>
              {/* List Product */}
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="bg-white border border-[rgba(145,158,171,0.239)] rounded-lg mb-5 p-2.5 relative"
                >
                  <div className="flex items-start justify-between min-h-[110px] py-2.5">
                    <div className="checkbox-product relative w-1/4">
                      <div className="flex">
                        <Checkbox
                          checked={product.checked}
                          onCheckedChange={() =>
                            handleCheckboxChange(product._id)
                          }
                        />
                        <label>
                          <img
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxy-s24-ultra-xam_1_3.png"
                            className="w-[100px]"
                          ></img>
                        </label>
                      </div>
                    </div>
                    <div className="product-info w-3/4">
                      <div className="flex justify-between items-start max-lg:text-sm">
                        <p>{product.slug}</p>
                        <TrashIcon className="bg-transparent border-0 cursor-pointer p-0 z-10 w-6 h-7" />
                      </div>
                      <div className="flex justify-between mt-[10px]">
                        <div className="price">
                          <p className="text-red-600/100 max-lg:text-sm">
                            {product.price}đ
                          </p>
                        </div>
                        <div className="">
                          <span
                            className="bg-[#f3f3f3] rounded-sm cursor-pointer px-3 py-1.5"
                            onClick={() =>
                              handleQuantityChange(
                                product._id,
                                product.quatity - 1
                              )
                            }
                          >
                            -
                          </span>
                          <input
                            className="bg-transparent border-0 text-xs text-center w-[30px]"
                            value={product.quatity}
                            readOnly
                            onChange={(e) =>
                              handleQuantityChange(
                                product._id,
                                parseInt(e.target.value, 10)
                              )
                            }
                          ></input>
                          <span
                            className="bg-[#f3f3f3] rounded-sm cursor-pointer px-2.5 py-1.5"
                            onClick={() =>
                              handleQuantityChange(
                                product._id,
                                product.quatity + 1
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-white border border-[rgba(145,158,171,0.239)] rounded-t-md shadow-[0_-4px_20px_-1px_rgba(40,124,234,0.15)] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] p-[10px_10px_15px] z-11">
            <div className="temp-info flex flex-col">
              <div className="price-temp">
                <p>
                  Tổng tiền:{' '}
                  <span className="text-red-600/100">
                    {totalPrice.toLocaleString()}đ
                  </span>
                </p>
              </div>
            </div>
            <Link href="cart/payment">
              <Button className="bg-[#d1041d]" disabled={totalPrice <= 0}>
                Mua ngay
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="empty-cart flex flex-col items-center justify-center text-center p-6">
          <img
            src="https://shopee-clone-reactjs.vercel.app/assets/no-product.b0846037.png"
            alt="no purchase"
            className="w-24 h-24 mb-4"
          />
          <span className="block text-lg font-semibold mb-2">
            Giỏ hàng của bạn đang trống
          </span>
          <span className="block text-sm mb-4">
            Hãy chọn thêm sản phẩm để mua sắm nhé
          </span>
          <Link
            href="/"
            className="bg-[#d70018] text-white px-4 py-2 rounded-md"
          >
            Tiếp tục mua hàng
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
