import { useEffect, useRef, useState } from 'react';

interface MenuItem {
  label: string;
  value: string;
  icon?: JSX.Element;
}

interface DropdownButtonProps {
  icon?: JSX.Element;
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  className?: string;
  style?: Record<string, string>;
  children?: JSX.Element | JSX.Element[];
}

export default function Dropdown({
  icon,
  items,
  onSelect,
  className = '',
  style = {},
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function handleItemClick(item: MenuItem) {
    setSelectedItem(item);
    onSelect(item);
    setIsOpen(false);
  }

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`inline-block transition ${className}`}
      style={style}
      onClick={() => setIsOpen(!isOpen)}
      ref={ref}
    >
      {icon}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="flex w-full flex-col py-1">
            {items.map((item) => (
              <div
                key={item.label}
                className="hover:(bg-gray-100 cursor-pointer) inline-flex w-full items-center gap-2 px-2 py-2 text-center text-sm text-gray-700 text-gray-900"
                onClick={() => handleItemClick(item)}
              >
                {item.icon && item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
