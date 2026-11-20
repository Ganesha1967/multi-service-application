import UI_IMG from '../../assets/images/auth-img.png';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-[#f8fafc]">
      {/* Left side with the form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-full max-w-[600px]">
          <div className="flex justify-center mb-8"></div>

          {/* A card containing a form */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
            {children}
          </div>
        </div>
      </div>

      {/* Right-hand section with an image (hidden on mobile) */}
      <div className="hidden md:block w-1/2 relative bg-gray-100">
        <img
          src={UI_IMG}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Auth Background"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
