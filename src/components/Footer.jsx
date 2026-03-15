import { FiInstagram, FiArrowRight } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="relative bg-[#1A2E1A] text-[#F4F5F0] font-notoSerif overflow-hidden border-t border-[#2C3E20]">

      {/* Giant Ambient Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 mix-blend-overlay">
        <span className="text-[12vw] font-bold tracking-tight text-[#2C3E20]/40 leading-none whitespace-nowrap">
          GIFTING TREE
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12">

        {/* Architectural 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 lg:gap-16 pb-16 border-b border-white/10">

          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6 tracking-tight text-white drop-shadow-md">Gifting Tree.</h2>
              <p className="text-white/60 text-[15px] leading-relaxed max-w-sm font-sans font-light">
                Transforming your precious memories into timeless, handcrafted masterpieces. Custom-made heirloom art for every special occasion.
              </p>
            </div>


          </div>

          {/* Contact Col */}
          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-white/40 mb-8 border-b border-white/10 pb-4 inline-block">Direct Inquiries</h3>
            <div className="flex flex-col space-y-5">
              <a href="tel:+917001967279" aria-label="Call Gifting Tree at +91 7001967279" className="group flex flex-col hover:text-white transition-colors">
                <span className="text-white/40 text-xs font-sans uppercase tracking-wider mb-1">Phone</span>
                <span className="text-lg text-[#D4E0CE] group-hover:text-white transition-colors">+91 7001967279</span>
              </a>
              <a href="mailto:giftingtreebygz@gmail.com" aria-label="Email Gifting Tree at giftingtreebygz@gmail.com" className="group flex flex-col hover:text-white transition-colors">
                <span className="text-white/40 text-xs font-sans uppercase tracking-wider mb-1">Email</span>
                <span className="text-lg text-[#D4E0CE] group-hover:text-white transition-colors">giftingtreebygz@gmail.com</span>
              </a>
              <div className="flex flex-col">
                <span className="text-white/40 text-xs font-sans uppercase tracking-wider mb-1">Studio</span>
                <span className="text-lg text-[#D4E0CE]">Asansol, India</span>
              </div>
            </div>
          </div>

          {/* Socials Col */}
          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.3em] font-sans font-bold text-white/40 mb-8 border-b border-white/10 pb-4 inline-block">Social Gallery</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="https://www.instagram.com/_.gifting_tree_/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Gifting Tree on Instagram"
                className="group flex items-center gap-4 text-[#D4E0CE] hover:text-white transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <FiInstagram className="w-4 h-4" />
                </div>
                <span className="text-sm uppercase tracking-widest font-sans font-medium">Instagram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Deep Copyright Ribbon */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Gifting Tree. All rights reserved.</p>

          {/* Developer Credit */}
          <div className="flex items-center gap-1.5 bg-black/20 px-4 py-2 rounded-full border border-white/5">
            <span>Built by</span>
            <a
              href="https://www.instagram.com/_atharansari_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#D4E0CE] font-bold lowercase"
            >
              athar
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;