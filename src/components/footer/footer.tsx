/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import React from 'react';

function Footer() {
  return (
    <section id="footer" className="bg-gray-100 w-full">
      <div className="container mx-auto text-white">
        <div className="flex flex-wrap py-4 border-b border-white">
          <div className="w-full md:w-1/4 text-left">
            <h2 className="text-2xl font-bold uppercase text-gray-800 py-4">hts store</h2>
          </div>
          <div className="w-full md:w-1/4 text-left">
            <h2 className="text-gray-800 font-bold py-4">Thông tin và chính sách</h2>
            <ul>
              {[
                'Mua hàng và thanh toán Online',
                'Mua hàng trả góp Online',
                'Mua hàng trả góp bằng thẻ tín dụng',
                'Chính sách giao hàng',
                'Tra thông tin bảo hành',
                'Tra cứu hoá đơn điện tử',
                'Thông tin hoá đơn mua hàng',
                'Trung tâm bảo hành chính hãng',
                'Quy định về việc sao lưu dữ liệu',
              ]?.map((item, idx) => (
                <li key={idx} className="py-2">
                  <a className="text-red-600 font-medium">{item}</a>
                </li>
              ))}
              <li>
                <a>
                  <img
                    className="w-48 my-4"
                    src="https://theme.hstatic.net/1000075078/1000610097/14/gov.png?v=664"
                    alt="Gov logo"
                  />
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-left">
            <h2 className="text-gray-800 font-bold py-4">Tổng đài hỗ trợ miễn phí</h2>
            <p className="text-red-600 font-medium py-1">Support 028.71.087.088 (07:00-21:00)</p>
            <p className="text-red-600 font-medium py-1">Delivery 1800 6936 (07:00-21:00)</p>
            <h2 className="text-gray-800 font-bold py-4">Phương thức thanh toán</h2>
            <ul className="flex space-x-2">
              {[
                {
                  href: 'https://cellphones.com.vn/sforum/huong-dan-su-dung-vnpay-qrcode-tren-website-cellphones',
                  src: 'https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/vnpay-logo.png',
                },
              ]?.map((item, idx) => (
                <li key={idx} className="border border-gray-300 p-1">
                  <a href={item.href}>
                    <Image height={500} width={500} className="w-10" src={item.src} alt="Payment method" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-left">
            <h2 className="text-gray-800 font-bold py-4">Dịch vụ và thông tin khác</h2>
            <ul>
              {[
                'Ưu đãi thanh toán',
                'Quy chế hoạt động',
                'Chính sách bảo mật thông tin cá nhân',
                'Chính sách Bảo hành',
                'Liên hệ hợp tác kinh doanh',
                'Tuyển dụng',
                'Dịch vụ bảo hành điện thoại',
                'Dịch vụ bảo hành mở rộng',
              ]?.map((item, idx) => (
                <li key={idx} className="py-2">
                  <a className="text-red-600 font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/*<div className="bg-gray-200 py-4 text-gray-800">
          <p className="text-center m-0">Copyright © 2024 HTS Store. All rights reserved.</p>
        </div>*/}
      </div>
    </section>
  );
}

export default Footer;
