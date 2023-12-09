"use client";
export default function Model({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) {
  return (
    <div className="fixed w-full h-screen flex justify-center z-10 items-center left-0 top-0">
      <div className="bg absolute w-full h-full -z-10 backdrop-blur-sm"></div>
      <div className="modle bg-white text-black w-full max-w-xl z-12 relative rounded-xl h-[20rem] border-[#ddd] border flex justify-center flex-col items-center gap-2">
        {children}
      </div>
    </div>
  );
}
