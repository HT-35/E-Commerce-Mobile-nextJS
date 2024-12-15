/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeftIcon, TrashIcon } from '@radix-ui/react-icons';
import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import Link from 'next/link';
import { sendRequest } from '@/utils/fetchApi';
import { formatCurrency } from '@/utils/price';
import { useRouter } from 'next/navigation';
import { listApi_Nest_Server_API_Route, listApi_Next_Server } from '@/utils/listApi';
import { Bounce, toast } from 'react-toastify';

export interface ICart {
  color: string;
  name: string;
  slug: string;
  price: number;
  img: {
    link: string;
    cloudinary_id: string;
  }[];
  quantity: number;
}

interface selectProduct {
  slug: string;
  color: string;
  quantity: number;
}

enum typeChage {
  plus = 'plus',
  reduce = 'reduce',
}

const Cart = () => {
  const router = useRouter();

  // Get cart and account info from Redux store
  const { accessToken } = useAppSelector((state: any) => state.account);
  //console.log(`accessToken:`, accessToken);

  if (!accessToken) {
    router.push('/auth');
  }
  const [cart, setCart] = useState<ICart[]>([]);

  const [selectProduct, setSelectProduct] = useState<selectProduct[]>([]);

  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getCart = async () => {
      const cart = await sendRequest<IBackendRes<any[]>>({
        url: listApi_Nest_Server_API_Route.cart(),
        method: `GET`,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      //console.log(`getCart:`, cart);

      if (cart.data) {
        console.log(cart.data);
        const newCart = cart?.data?.map((item, index) => {
          const option = item?.slug?.option?.findIndex((itemOption: any) => itemOption.color === item.color);
          //option;
          //console.log(`option:`, option);
          return {
            color: item?.color,
            slug: item?.slug?.slug,
            name: item?.slug?.name,
            price: item?.slug?.option[option]?.price,
            img: item?.slug?.option[option]?.img,
            quantity: item?.quantity,
          };
        });
        setCart(newCart);
      }
    };
    getCart();
  }, [accessToken]);

  const handleCheckboxChange = ({
    slug,
    color,
    price,
    quantity,
  }: {
    slug: string;
    color: string;
    price: number;
    quantity: number;
  }) => {
    const check = selectProduct.findIndex((item, index) => item?.slug === slug && item?.color === color);
    if (check === -1) {
      setSelectProduct((prv) => [
        ...prv,
        {
          color,
          slug,
          quantity,
        },
      ]);

      setTotal((prv: number) => Number(Number(prv) + Number(price)));
    } else {
      let newSelect: selectProduct[] = selectProduct.filter((item, index) => {
        return !(item.color === color && item.slug === slug);
      });
      console.log(newSelect);

      setSelectProduct(newSelect);
      setIsCheckAll(false);
      setTotal((prv) => prv - price);
    }
  };

  useEffect(() => {
    console.log(selectProduct);
  }, [selectProduct]);

  const handleSelectAllChange = () => {
    if (!isCheckAll) {
      const newCart: selectProduct[] = cart?.map((item, index) => {
        return {
          color: item?.color,
          slug: item?.slug,
          quantity: item?.quantity,
        };
      });

      const totalPrice = cart?.reduce((a: number, b) => {
        return a + Number(b?.price);
      }, 0);

      setTotal(totalPrice);
      setSelectProduct(newCart);
      setIsCheckAll(true);
    } else {
      setSelectProduct([]);
      setIsCheckAll(false);
      setTotal(0);
    }
  };

  const handleQuantityChange = async ({
    typeChangeQuanlity,
    currentQuantity,
    slug,
    color,
  }: {
    typeChangeQuanlity: typeChage;
    slug: string;
    color: string;
    currentQuantity: number;
  }) => {
    // Thực hiện thay đổi số lượng sản phẩm
    let updatedCart;
    if (typeChangeQuanlity === typeChage.plus) {
      const addQuantity = await sendRequest<IBackendRes<any>>({
        method: 'POST',
        url: listApi_Next_Server.cart(),
        body: { slug, quantity: 1, color },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log('');
      console.log('');
      console.log('');
      console.log('addQuantity', addQuantity);
      console.log('');
      console.log('');
      updatedCart = addQuantity?.data?.cart;
      console.log(`addQuantity:`, addQuantity);
    } else {
      if (currentQuantity <= 1) return;
      const reduceQuantity = await sendRequest<IBackendRes<any>>({
        method: 'POST',
        url: listApi_Next_Server.reduceProductInCart(),
        body: { slug, quantity: 1, color },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      updatedCart = reduceQuantity?.data?.cart;
    }

    if (updatedCart) {
      console.log('');
      console.log('');
      console.log('');
      console.log('updatedCart', updatedCart);
      console.log('');
      console.log('');
      const newCart = updatedCart?.map((item: any) => {
        const option = item?.slug?.option?.findIndex((itemOption: any) => itemOption?.color === item?.color);
        return {
          color: item?.color,
          slug: item?.slug?.slug,
          name: item?.slug?.name,
          price: item?.slug?.option[option]?.price,
          img: item?.slug?.option[option]?.img,
          quantity: item?.quantity,
          total: Number(item?.quantity) * Number(item?.slug?.option[option]?.price),
        };
      });
      setCart([...newCart]); // Đảm bảo tạo mảng mới
    }
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    const updatedTotal = selectProduct.reduce((acc, item) => {
      const product = cart.find((p) => p.slug === item.slug && p.color === item.color);
      return acc + (product ? product.price * Number(item.quantity) : 0);
    }, 0);
    setTotal(updatedTotal);
  }, [cart, selectProduct]); // Cập nhật dependency cho useEffect

  const handleRemoveFromCart = async ({ slug, color }: { slug: string; color: string }) => {
    const deleteProduct = await sendRequest<IBackendRes<any>>({
      method: 'DELETE',
      url: listApi_Nest_Server_API_Route.deleteProductInCart({ color, slug }),
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(deleteProduct);
    if (deleteProduct.statusCode === 200) {
      //setCart((prevCart: any[]) => prevCart.filter((item) => item.slug !== slug));

      setCart((prvCart: any[]) => prvCart.filter((item) => !(item.slug === slug && item.color === color)));

      router.refresh();

      toast.success(`Đã xóa sản phẩm ra khỏi giỏ hàng !`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } else {
      toast.error(``, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    }
  };

  const handleBuyNow = () => {
    console.log(`selectProduct:`, selectProduct);

    if (selectProduct.length > 0) {
      const queryString = selectProduct.map((item: any) => `slug=${item.slug}&color=${item.color}`).join('&');

      router.push(`cart/payment?${queryString}`);
      router.refresh();
    }
  };

  return (
    <div className="lg:m-4 m-2 min-h-[40px] relative bg-white rounded-lg lg:px-4 py-2 px-2 shadow-lg ">
      {cart && cart.length > 0 && accessToken ? (
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

          <div className="mt-3 mb-[3.75rem]">
            <div className="listItemSuperCart">
              <div className="flex items-center mb-[20px]">
                <Checkbox className="mr-[6px]" onCheckedChange={handleSelectAllChange} checked={isCheckAll} />
                <label>Chọn tất cả</label>
              </div>
              {/* List Product */}
              {cart.length > 0 &&
                cart.map((product, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-white border border-[rgba(145,158,171,0.239)] rounded-lg mb-5 p-2.5 relative"
                    >
                      <div className="flex max-lg:flex-col items-start justify-between gap-5  min-h-[110px] py-2.5">
                        <div className="checkbox-product mr-4 lg:w-1/4">
                          <div className="flex gap-3 items-start">
                            <Checkbox
                              onCheckedChange={() =>
                                handleCheckboxChange({
                                  slug: product.slug,
                                  color: product.color,
                                  price: product.price,
                                  quantity: product.quantity,
                                })
                              }
                              checked={selectProduct.some(
                                (item) => item.slug === product.slug && item.color === product.color
                              )}
                            />

                            <Link href={`/product/${product.slug}`}>
                              <div>
                                <img
                                  src={product?.img?.length > 0 ? (product?.img[0]?.link as string) : ''}
                                  className="w-[300px] rounded-lg"
                                ></img>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="product-info lg:w-3/4 w-full">
                          <div className="flex justify-between items-start max-lg:text-sm">
                            <Link href={`/product/${product.slug}`}>
                              <p>{product.name}</p>
                            </Link>
                            <TrashIcon
                              className="bg-transparent border-0 cursor-pointer p-0 z-10 w-6 h-7"
                              onClick={() => handleRemoveFromCart({ color: product.color, slug: product.slug })}
                            />
                          </div>
                          <Link href={`/product/${product.slug}`}>
                            <div className="color flex gap-4">
                              <span className="max-lg:text-sm">Màu Sắc : </span>
                              <span className="max-lg:text-sm">{product.color}</span>
                            </div>
                            <div className="price flex gap-4">
                              <span className="max-lg:text-sm">Giá Tiền : </span>
                              <p className="text-red-600/100 max-lg:text-sm">
                                {' '}
                                {formatCurrency(product.price as any)}đ
                              </p>
                            </div>
                          </Link>
                          <div className="flex justify-start  items-center gap-4 mt-[10px] select-none">
                            <span className="max-lg:text-sm">Số lượng : </span>
                            <div className="flex gap-4 justify-start  items-center">
                              <Button
                                className="bg-[#f3f3f3] hover:bg-slate-300 active:bg-slate-400 text-black rounded-sm cursor-pointer px-6 py-0 h-[40px]"
                                onClick={() =>
                                  handleQuantityChange({
                                    slug: product.slug,
                                    currentQuantity: product.quantity,
                                    typeChangeQuanlity: typeChage.reduce,
                                    color: product.color,
                                  })
                                }
                              >
                                -
                              </Button>

                              <span>{product.quantity}</span>
                              <Button
                                className="bg-[#f3f3f3] hover:bg-slate-300  active:bg-slate-400  text-black rounded-sm cursor-pointer px-6 py-0 h-[40px]"
                                onClick={() =>
                                  handleQuantityChange({
                                    slug: product.slug,
                                    currentQuantity: product.quantity,
                                    typeChangeQuanlity: typeChage.plus,
                                    color: product.color,
                                  })
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="flex items-center justify-between bg-white border border-[rgba(145,158,171,0.239)] rounded-t-md shadow-[0_-4px_20px_-1px_rgba(40,124,234,0.15)] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] p-[10px_10px_15px] z-[999]">
            <div className="temp-info flex flex-col">
              <div className="price-temp">
                <p>
                  Tổng tiền: <span className="text-red-600/100">{formatCurrency(total as any)} đ</span>
                </p>
              </div>
            </div>

            <Button className="bg-[#d1041d] px-6 py-1" onClick={handleBuyNow} disabled={total <= 0}>
              Mua Ngay
              {/*<Link href="cart/payment" className="px-6 py-1">
              </Link>*/}
            </Button>
          </div>
        </>
      ) : (
        <div className="empty-cart flex flex-col items-center justify-center text-center p-6 z-[999]">
          <img
            src="https://shopee-clone-reactjs.vercel.app/assets/no-product.b0846037.png"
            alt="no purchase"
            className="w-24 h-24 mb-4"
          />
          <span className="block text-lg font-semibold mb-2">Giỏ hàng của bạn đang trống</span>
          <span className="block text-sm mb-4">Hãy chọn thêm sản phẩm để mua sắm nhé</span>
          <Link href="/" className="bg-[#d70018] text-white px-4 py-2 rounded-md">
            Tiếp tục mua hàng
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
