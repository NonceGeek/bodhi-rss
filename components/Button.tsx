interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

// const IS_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined'

export function Button(props: Props) {
  return (
    <button
      {...props}
      disabled={props.loading}
      type="button"
      className={`flex gap-2 items-center bg-yellow-300 text-white py-2 px-4 rounded-md duration-300 shadow-md text-lg mt-4 hover:(shadow-lg) focus:(shadow-lg outline-none) disabled:(opacity-50 cursor-not-allowed) ${
        props.className ?? ""
      }`}
    >
      {props.loading ? "Loading..." : props.children}
    </button>
  );
}
