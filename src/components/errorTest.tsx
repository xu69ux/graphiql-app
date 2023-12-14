export const ChildComponent = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  } else {
    return <div>Child Component</div>;
  }
};
