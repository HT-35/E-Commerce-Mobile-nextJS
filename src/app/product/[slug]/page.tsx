import ProductDetail from '@/app/product/[slug]/pageClient';
import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { sendRequest } from '@/utils/fetchApi';
import { listApi_Next_Server } from '@/utils/listApi';

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  let productList: any = null;
  const res = await sendRequest<IBackendRes<any>>({
    url: listApi_Next_Server.getDetailProductbySlug(slug),
    method: 'GET',
  });
  console.log(res);

  if (res.data) {
    productList = res.data;
  }

  const title = productList?.name || 'Default Title';
  const description = productList?.name || 'Default Description';

  const url = `https://htsstore.io.vn/product/${slug}`;

  const urlImg = productList?.option?.[0]?.img[0].link;
  console.log(`urlImg:`, urlImg);

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'HTS Store',
      images: [
        {
          url: urlImg || '', // Phải là một URL tuyệt đối
          width: 800,
          height: 600,
        },
      ],
      videos: [
        {
          url: 'https://www.youtube.com/watch?v=7OMFlDUz8JA', // Phải là một URL tuyệt đối
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: url,
      languages: {
        'en-US': 'https://htsstore.io.vn/en-US',
        'de-DE': 'https://htsstore.io.vn/de-DE',
      },
    },
  };
}

const DetailProduct = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  let productList: any = null;

  const res = await sendRequest<IBackendRes<any>>({
    url: listApi_Next_Server.getDetailProductbySlug(slug),
    method: 'GET',
  });
  console.log(res);

  if (res.data) {
    productList = res.data;
  }

  return (
    <div className="h-full pb-10">
      <h1 className="text-2xl text-black font-semibold py-0 max-xl:text-black ">{res.data.name}</h1>
      <ProductDetail slug={slug}></ProductDetail>

      <div className="lg:mt-2 max-xl:text-black max-xl:text-xs  h-full ">
        <div className="max-w-[730px]    mb-2 border-2  rounded-xl ">
          <div className="text-center text-2xl p-3 font-semibold">Thông Số Kỹ Thuật</div>
          <Table>
            <TableBody>
              <TableRow className="bg-white">
                <TableCell className="font-medium ">Màn Hình:</TableCell>
                <TableCell className="text-left ">{productList?.screen}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium ">Camera Trước:</TableCell>
                <TableCell className="text-left ">{productList?.cameraBefore}</TableCell>
              </TableRow>

              <TableRow className="bg-white">
                <TableCell className="font-medium ">Camera Camera Sau:</TableCell>
                <TableCell className="text-left ">{productList?.cameraAfter}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium ">Hệ Điều Hành:</TableCell>
                <TableCell className="text-left ">{productList?.os}</TableCell>
              </TableRow>

              <TableRow className="bg-white">
                <TableCell className="font-medium ">Hãng Điện Thoại:</TableCell>
                <TableCell className="text-left ">{productList?.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Chip Xử Lý:</TableCell>
                <TableCell className="text-left">{productList?.chip}</TableCell>
              </TableRow>

              <TableRow className="bg-white">
                <TableCell className="font-medium">RAM:</TableCell>
                <TableCell className="text-left">{productList?.ram}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Dung lượng lưu trữ:</TableCell>
                <TableCell className="text-left">{productList?.rom}</TableCell>
              </TableRow>

              <TableRow className="bg-white">
                <TableCell className="font-medium">SIM:</TableCell>
                <TableCell className="text-left">{productList?.special}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Thiết Kế:</TableCell>
                <TableCell className="text-left">{productList?.design}</TableCell>
              </TableRow>

              <TableRow className="bg-white">
                <TableCell className="font-medium">Thông Số Đặc Biệt:</TableCell>
                <TableCell className="text-left">{productList?.special}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium  ">Pin:</TableCell>
                <TableCell className="text-left  ">{productList?.battery}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
