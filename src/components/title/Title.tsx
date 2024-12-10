const Title = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <h1
      className={`font-bold text-xl px-2 py-1 lg:basis-1/5     max-lg:text-base ${className}`}
    >
      {children}
    </h1>
  );
};

export default Title;
