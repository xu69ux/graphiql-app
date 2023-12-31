import '@styles/KindComponent.css';

export const KindComponent = ({ selectedKind }) => {
  return (
    <div className='kind-container' data-testid='kind-item'>
      {selectedKind.description ? (
        <div className='kind-description'>{selectedKind.description}</div>
      ) : (
        <div className='kind-description'>
          Sorry, there is no description here. The API developers have not
          provided one.
        </div>
      )}
    </div>
  );
};
