import React from 'react';

/**
 * PlusButtonProps
 * @param onClick => 버튼이 클릭될때 호출되는 콜백 함수, 부모 컴포넌트에서 원하는 동작을 onClick으로 정의해서 전달가능
 */

interface AdminManagementDeleteButtonProps {
  onClick?: () => void;
}

const AdminManagementDeleteButton = (props: AdminManagementDeleteButtonProps) => {
  const { onClick } = props;

  return (
    <>
      <p className="modal-content flex text-center" onClick={onClick}>
        X
      </p>
    </>
  );
};

export default AdminManagementDeleteButton;
