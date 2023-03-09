import React, { setState, useEffect } from 'react';

const GetStore = () => {
  useEffect(() => {
    // Find all elements rendered with React
    const reactElements = document.querySelectorAll('[data-reactroot]');
    console.log('reactElements:', reactElements);
    // Loop through each element and access its store and state
    reactElements.forEach((element) => {
      // Access the component's internal instance
      const internalInstance =
        element._reactRootContainer._internalRoot.current;
      console.log('internalInstance:', internalInstance);
      console.log('internalInstance._context:', internalInstance._context);
      console.log(
        'internalInstance._context.stores:',
        internalInstance._context.stores
      );
      // Access the component's store
      const store = internalInstance._context.stores.myStore;

      // Access the store's state
      const state = store.getState();

      // Log the state to the console
      console.log('this is state:', state);
    });
  }, []);

  return <div>My Component</div>;
};

export default GetStore;
