const LayOutPage = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="max-w-[600px] mx-auto   ">{children}</div>;
};

export default LayOutPage;
