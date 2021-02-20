import React from 'react';
import UserAreaHOC from '../hoc/userAreaHoc';


const UserArea = () => {
  return (
    <UserAreaHOC>
      <div className="mt-3">
        Er is gebruikers gebied.

      </div>
    </UserAreaHOC>
  )
}

export default UserArea;
