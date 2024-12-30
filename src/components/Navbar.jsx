import { Link } from 'react-router-dom';
import { FiGift } from 'react-icons/fi';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg  font-notoSerif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FiGift className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900 ">Gifting Tree</span>
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              to="/products"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-bold"
            >
              Explore

            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;