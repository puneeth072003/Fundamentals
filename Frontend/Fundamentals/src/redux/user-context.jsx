import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from './user-actions';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const updateUserData = (newUserData) => {
    dispatch(setUserData(newUserData));
  };

  return (
    <UserContext.Provider value={{ userData, setUserData: updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
