interface ModalProps {
  title: string;
  show: boolean;
  onClose: () => void;
  closeText?: string;
  children: JSX.Element | JSX.Element[];
}

function Modal({
  title,
  children,
  show,
  onClose,
  closeText = 'Close',
}: ModalProps) {
  function handleBackgroundClick(event: any) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-background')) {
      onClose();
    }
  }

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-10 overflow-y-auto"
      onClick={handleBackgroundClick}
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-24 pt-6 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="modal-background absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="sm:(inline-block h-screen) hidden align-middle"></span>
        <div className="sm:(my-8 w-full) inline-block max-w-lg transform overflow-hidden rounded-lg bg-white text-left align-middle align-bottom shadow-xl transition-all">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:(mt-0 text-left) ml-4 mt-3 text-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </h3>
              <div className="mt-2">{children}</div>
            </div>
          </div>
          <div className="sm:(px-6 flex-row-reverse) flex bg-gray-50 px-4 py-3">
            <button
              onClick={onClose}
              type="button"
              className="focus:(outline-none ring-blue-500) sm:(ml-3 text-sm) inline-flex w-auto w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm ring-2 ring-offset-2 hover:bg-blue-700"
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
