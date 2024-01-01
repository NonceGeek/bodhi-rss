import { ViewType } from '@/hooks/useViewType';
import { IconFloatCenter, IconFloatLeft } from '@tabler/icons-react';

type Props = {
  viewType: ViewType;
  toggleViewType: (viewType: ViewType) => void;
};

export default function ViewTypeSwitch({
  viewType,
  toggleViewType,
}: Props): JSX.Element {
  return (
    <div className="mt-4 flex justify-center gap-2">
      <IconFloatCenter
        onClick={() => toggleViewType('image-up')}
        color={viewType === 'image-up' ? '#fdcf2b' : '#ccc'}
      />
      <IconFloatLeft
        onClick={() => toggleViewType('image-left')}
        color={viewType === 'image-left' ? '#fdcf2b' : '#ccc'}
      />
    </div>
  );
}
