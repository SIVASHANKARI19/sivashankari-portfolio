const Layout = ({ children, showStars }) => {
  return (
    <div className="relative w-full min-h-screen">
      {showStars && <StarBackground />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
