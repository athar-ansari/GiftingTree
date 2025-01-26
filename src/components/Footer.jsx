import { FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-900 text-[#FFFFFF]  font-notoSerif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Gifting Tree</h3>
            <p className="text-gray-400">
              Transforming your precious memories into timeless handcrafted masterpieces.
              Custom-made gifts for every special occasion.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <FiPhone className="mr-2" />
                <span className="text-gray-400">+917001967279</span>
              </div>
              <div className="flex items-center">
                <FiMail className="mr-2" />
                <span className="text-gray-400">giftingtreebygz@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FiMapPin className="mr-2" />
                <span className="text-gray-400">Asansol, India</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/_.gifting_tree_/" className="hover:text-pink-700 transition-colors">
                <FiInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 -mb-8 pt-5 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gifting Tree. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;