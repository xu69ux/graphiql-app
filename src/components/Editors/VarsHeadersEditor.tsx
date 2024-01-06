import { EditorWindow } from '../../components';
import {
  useRef,
  useState,
  DragEvent,
  Dispatch,
  SetStateAction,
  FC,
} from 'react';
import { IoChevronUpOutline } from 'react-icons/io5';

interface VarsHeadersEditorProps {
  headers: string;
  setHeaders: Dispatch<SetStateAction<string>>;
  variables: string;
  setVariables: Dispatch<SetStateAction<string>>;
}

export const VarsHeadersEditor: FC<VarsHeadersEditorProps> = ({
  headers,
  setHeaders,
  variables,
  setVariables,
}) => {
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [isHeadersOpened, setIsHeadersOpened] = useState(false);

  const [initialPos, setInitialPos] = useState<number | null>(null);
  const [initialSize, setInitialSize] = useState<number | null>(null);

  const tabsDragable = useRef<HTMLDivElement>(null);
  const footer = useRef<HTMLDivElement>(null);

  const dragStart = (e: DragEvent) => {
    console.log('start', e.clientY, tabsDragable.current!.offsetHeight);
    if (e.clientY !== 0) {
      setInitialPos(e.clientY);
    }
    setInitialSize(tabsDragable.current!.offsetHeight);
  };

  const dragEnd = (e: DragEvent) => {
    const coordinate = (-e.clientY + initialPos! + initialSize!) / 100;
    console.log(coordinate);
    if (coordinate > 0.06 && coordinate < 5 && isFooterOpen) {
      footer.current!.style.flex = `${coordinate} 1 0`;
    } else if (coordinate <= 0.06) {
      footer.current!.style.flex = `0.06 1 0`;
      setIsFooterOpen(false);
    }
  };

  const resize = (e: DragEvent) => {
    const coordinate = (-e.clientY + initialPos! + initialSize!) / 100;
    console.log(coordinate, -e.clientY, initialPos!, initialSize!);
    if (coordinate > 0.06 && coordinate < 5 && isFooterOpen) {
      footer.current!.style.flex = `${coordinate} 1 0`;
    } else if (coordinate <= 0.06) {
      footer.current!.style.flex = `0.06 1 0`;
      setIsFooterOpen(false);
    }
  };

  const closeFooter = () => {
    setIsFooterOpen(!isFooterOpen);
    footer.current!.style.flex = !isFooterOpen ? `1 1 0` : `0.06 1 0`;
  };

  return (
    <div className={`editor-footer ${isFooterOpen ? 'open' : ''}`} ref={footer}>
      <div
        className='editor-footer__tabs'
        ref={tabsDragable}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        onDrag={resize}
        draggable={isFooterOpen}
        onClick={(e) => {
          if (e.clientY !== 0) {
            setInitialPos(e.clientY);
          }
        }}
      >
        <div className='tabs_wrap'>
          <span
            className={`editor-footer__tab ${
              isFooterOpen && !isHeadersOpened ? 'checked' : ''
            }`}
            onClick={() => setIsHeadersOpened(false)}
          >
            Variables
          </span>
          <span
            className={`editor-footer__tab ${
              isFooterOpen && isHeadersOpened ? 'checked' : ''
            }`}
            onClick={() => setIsHeadersOpened(true)}
          >
            Headers
          </span>
        </div>
        <IoChevronUpOutline
          className={`editor-footer-icon arrow ${isFooterOpen ? 'open' : ''}`}
          onClick={closeFooter}
        />
      </div>
      {isFooterOpen && (
        <div
          className={`editor-footer__editor ${isHeadersOpened ? 'open' : ''}`}
        >
          {!isHeadersOpened ? (
            <EditorWindow
              code={variables}
              updateData={(data: string) => setVariables(data)}
            />
          ) : (
            <EditorWindow
              code={headers}
              updateData={(data: string) => setHeaders(data)}
            />
          )}
        </div>
      )}
    </div>
  );
};
