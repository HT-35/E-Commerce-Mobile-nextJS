const LayOutPage = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="max-w-[800px] mx-auto  ">{children}</div>;
};

export default LayOutPage;
