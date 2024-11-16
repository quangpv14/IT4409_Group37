import { FaArrowLeft } from 'react-icons/fa';
export const Forbidden = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', height: '52vh' }}>
            <h1 style={{ color: 'red' }}>403 - Forbidden</h1>
            <p>You do not have permission to access this page, or the page might not exist.</p>
            <a href="/">
                <FaArrowLeft style={{ marginRight: '8px' }} />
                Go back to Home
            </a>
        </div>
    );
};
