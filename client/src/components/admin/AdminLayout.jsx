import React from 'react';

export const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            {/* Chỉ hiển thị nội dung dành cho Admin */}
            {children}
        </div>
    );
};
