import '@styles/KindComponent.css';

export const KindComponent = ({ selectedKind }) => {
  return (
    <div className='kind-container' data-testid='kind-item'>
      {selectedKind.description ? (
        <div>{selectedKind.description}</div>
      ) : (
        <div>
          Sorry, there is no description here. The API developers have not
          provided one.
        </div>
      )}
    </div>
  );
};
