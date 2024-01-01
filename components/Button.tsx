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
      className={`hover:(shadow-lg) focus:(shadow-lg outline-none) disabled:(opacity-50 cursor-not-allowed) mt-4 flex items-center gap-2 rounded-md bg-yellow-300 px-4 py-2 text-lg text-white shadow-md duration-300 ${
        props.className ?? ''
      }`}
    >
      {props.loading ? 'Loading...' : props.children}
    </button>
  );
}
