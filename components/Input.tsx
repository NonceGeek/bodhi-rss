export default function Input(props: React.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`focus:(outline-none border-yellow-400) disabled:(opacity-50 cursor-not-allowed) mt-4 w-full rounded-md border-2 border-yellow-300 p-2 text-center text-lg duration-300 ${
        props.className ?? ''
      }`}
    />
  );
}
