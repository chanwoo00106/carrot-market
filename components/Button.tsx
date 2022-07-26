import { NextPage } from "next";

interface ButtonProps {
  children: string;
}

const Button: NextPage<ButtonProps> = ({ children }) => {
  return (
    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
      {children}
    </button>
  );
};

export default Button;
