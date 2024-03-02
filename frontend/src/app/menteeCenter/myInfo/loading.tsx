import Skeleton from 'react-loading-skeleton';

const MyInfoLoading = () => (
  <div className="mentor-center-loading-container">
    <Skeleton containerClassName="left" className="height-70vh" />
    <Skeleton containerClassName="right" className="height-70vh" />
  </div>
);

export default MyInfoLoading;
