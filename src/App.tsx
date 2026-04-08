import { useState, useEffect, ChangeEvent, FormEvent, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import Cropper, { Area } from 'react-easy-crop';
import { 
  Camera, 
  MessageCircle, 
  Sparkles, 
  Gift, 
  Star, 
  Instagram, 
  Menu, 
  X, 
  ArrowRight,
  Phone,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
  Check,
  Upload,
  Type,
  Maximize2,
  Palette,
  ChevronLeft,
  Heart,
  User,
  Mail,
  Tag,
  MessageSquare,
  Send,
  Crop,
  ZoomIn,
  ZoomOut,
  Truck
} from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/918123696390";

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
    }, 'image/jpeg');
  });
}

const Navbar = ({ wishlistCount }: { wishlistCount: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/85 backdrop-blur-xl py-4 border-b border-gold/10' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 text-2xl font-display font-bold">
          <Camera className="text-gold" />
          <span>PrintMemories</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          <a href="#home" className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-gold transition-all">Home</a>
          <a href="#products" className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-gold transition-all">Gifts</a>
          <a href="#how-it-works" className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-gold transition-all">Experience</a>
          <a href="#reviews" className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-gold transition-all">Testimonials</a>
          <a href="#contact" className="text-sm font-medium opacity-80 hover:opacity-100 hover:text-gold transition-all">Contact</a>
          
          <div className="relative group cursor-pointer">
            <Heart size={20} className={wishlistCount > 0 ? "text-red-500 fill-red-500" : "text-white opacity-60"} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>

          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gold text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gold-light hover:-translate-y-1 transition-all shadow-lg shadow-gold/20"
          >
            Send Photos
          </a>
        </nav>

        <button 
          className="md:hidden text-2xl flex items-center gap-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative">
            <Heart size={20} className={wishlistCount > 0 ? "text-red-500 fill-red-500" : "text-white opacity-60"} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-black border-b border-gold/10 py-10 px-6 flex flex-col gap-6 text-center"
        >
          <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Home</a>
          <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Gifts</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Experience</a>
          <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Testimonials</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">Contact</a>
          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gold text-black px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider"
          >
            Send Photos
          </a>
        </motion.div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[radial-gradient(circle_at_70%_30%,#222_0%,#0a0a0a_100%)] pt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1.1] mb-8">
              Gifts That Speak A Thousand <i className="font-display italic">Words</i>
            </h1>
            <p className="text-xl text-text-muted mb-10 max-w-xl leading-relaxed">
              We transform your digital gallery into museum-quality prints, mugs, and keepsakes. Premium quality, personalized by heart.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#products" className="bg-gold text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gold-light hover:-translate-y-1 transition-all shadow-xl shadow-gold/30">
                Explore Collection
              </a>
              <div className="flex items-center gap-4">
                <a href="#how-it-works" className="border-2 border-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  How it works
                </a>
                <ShareMenu 
                  url={window.location.href} 
                  title="PrintMemories - Premium Personalized Gifts" 
                  text="Transform your digital gallery into museum-quality prints, mugs, and keepsakes." 
                />
              </div>
            </div>
          </motion.div>

          <div className="relative h-[500px] hidden lg:block">
            <motion.div 
              style={{ '--rot': '-8deg' } as any}
              animate={{ y: [0, -20, 0], rotate: -8 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 bg-white p-3 pb-12 rounded shadow-2xl z-30 left-0 top-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&w=400&q=80" 
                alt="Memory 1" 
                className="w-full h-60 object-cover sepia-[0.2]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              style={{ '--rot': '12deg' } as any}
              animate={{ y: [0, -20, 0], rotate: 12 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute w-64 bg-white p-3 pb-12 rounded shadow-2xl z-20 right-5 top-12"
            >
              <img 
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80" 
                alt="Memory 2" 
                className="w-full h-60 object-cover sepia-[0.2]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              style={{ '--rot': '-3deg' } as any}
              animate={{ y: [0, -20, 0], rotate: -3 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute w-64 bg-white p-3 pb-12 rounded shadow-2xl z-10 left-16 bottom-5"
            >
              <img 
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" 
                alt="Memory 3" 
                className="w-full h-60 object-cover sepia-[0.2]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-gold text-black py-5 overflow-hidden whitespace-nowrap font-bold uppercase tracking-[0.2em] text-sm border-y border-gold-light/20">
      <div className="marquee-content inline-block">
        <span className="mx-4">✦ Premium Quality Guaranteed</span>
        <span className="mx-4">✦ 50,000+ Memories Delivered</span>
        <span className="mx-4">✦ Express Shipping India-Wide</span>
        <span className="mx-4">✦ 5-Star Customer Support</span>
        <span className="mx-4">✦ Handcrafted with Love</span>
        <span className="mx-4">✦ Same Day Design Approval</span>
        <span className="mx-4">✦ Premium Quality Guaranteed</span>
        <span className="mx-4">✦ 50,000+ Memories Delivered</span>
        <span className="mx-4">✦ Express Shipping India-Wide</span>
      </div>
    </div>
  );
};

const ShareMenu = ({ url, title, text }: { url: string, title: string, text: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text,
    url,
  };

  const handleWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:bg-[#1877f2]'
    },
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      color: 'hover:bg-[#1da1f2]'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={18} />,
      url: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      color: 'hover:bg-[#25d366]'
    }
  ];

  return (
    <div className="relative">
      <button 
        onClick={handleWebShare}
        className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-gold hover:text-black transition-all border border-white/10"
        title="Share"
      >
        <Share2 size={20} />
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-4 w-48 bg-card-bg border border-white/10 rounded-2xl p-2 shadow-2xl z-50"
        >
          <div className="flex flex-col gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${link.color} hover:text-white`}
              >
                {link.icon}
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            ))}
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all text-left w-full"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
              <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const CustomizationModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [customText, setCustomText] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Cropping State
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);

  const options = {
    "Custom Mugs": {
      colors: ["White", "Black", "Magic (Heat Sensitive)"],
      sizes: ["Standard (330ml)", "Large (450ml)"],
      hasText: true,
      hasImage: true,
      aspect: 1
    },
    "Premium Frames": {
      colors: ["Classic Black", "Minimal White", "Rustic Wood"],
      sizes: ["5x7 inch", "A4 Size", "A3 Size"],
      hasText: false,
      hasImage: true,
      aspect: 4 / 5
    },
    "Photo T-Shirts": {
      colors: ["Pure White", "Jet Black", "Navy Blue"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      hasText: true,
      hasImage: true,
      aspect: 1
    }
  }[product.title as string] || { colors: [], sizes: [], hasText: true, hasImage: true, aspect: 1 };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (tempImage && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
        setPreviewImage(croppedImage);
        setIsCropping(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleOrder = () => {
    const message = `Hi! I'd like to order:
*Product:* ${product.title}
*Color:* ${selectedColor || 'Not selected'}
*Size:* ${selectedSize || 'Not selected'}
*Custom Text:* ${customText || 'None'}
${previewImage ? '*Image:* [Attached in next message]' : ''}`;
    
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`, '_blank');
    setIsOrderSuccess(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-5xl bg-dark border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl grid lg:grid-cols-2 max-h-[90vh]"
      >
        {/* Left: Preview */}
        <div className="relative bg-[#151515] flex flex-center items-center justify-center p-8 border-r border-white/5">
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-all lg:hidden"
          >
            <ChevronLeft size={20} /> Back
          </button>

          <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={previewImage || product.image} 
              alt="Preview" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {customText && (
              <div className="absolute inset-0 flex items-center justify-center p-10 pointer-events-none">
                <p className="text-white font-display text-2xl md:text-4xl text-center break-words drop-shadow-lg">
                  {customText}
                </p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-gold uppercase tracking-widest text-xs font-bold">Live Preview</span>
              <h3 className="text-2xl font-display">{product.title}</h3>
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/40 hover:text-white transition-all hidden lg:block"
          >
            <X size={32} />
          </button>

          <div className="mb-10">
            <h2 className="text-4xl mb-2">Customize Your Gift</h2>
            <p className="text-text-muted italic">{product.description}</p>
          </div>

          <div className="space-y-10">
            {/* Color Selection */}
            {options.colors.length > 0 && (
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-gold mb-4">
                  <Palette size={14} /> Select Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {options.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-full text-sm font-medium border transition-all ${
                        selectedColor === color 
                        ? 'bg-gold text-black border-gold shadow-lg shadow-gold/20' 
                        : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {options.sizes.length > 0 && (
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-gold mb-4">
                  <Maximize2 size={14} /> Choose Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {options.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full text-sm font-medium border transition-all ${
                        selectedSize === size 
                        ? 'bg-gold text-black border-gold shadow-lg shadow-gold/20' 
                        : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Text Input */}
            {options.hasText && (
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-gold mb-4">
                  <Type size={14} /> Add Custom Text
                </label>
                <input 
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-all"
                />
              </div>
            )}

            {/* Image Upload */}
            {options.hasImage && (
              <div>
                <label className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-gold mb-4">
                  <Upload size={14} /> Upload Your Photo
                </label>
                <div className="relative group">
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center group-hover:border-gold/50 transition-all">
                    <Upload className="mx-auto mb-4 text-white/40 group-hover:text-gold transition-all" size={32} />
                    <p className="text-sm text-text-muted">
                      {previewImage ? 'Click to change photo' : 'Drag & drop or click to upload'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button 
              onClick={handleOrder}
              className="w-full bg-gold text-black py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gold-light hover:-translate-y-1 transition-all shadow-xl shadow-gold/30 mt-8"
            >
              Finalize & Order via WhatsApp
            </button>
          </div>
        </div>
      </motion.div>

      {/* Cropping Overlay */}
      <AnimatePresence>
        {isCropping && tempImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <div className="relative w-full max-w-4xl h-full max-h-[80vh] bg-dark rounded-[2rem] overflow-hidden border border-white/10 flex flex-col">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-display flex items-center gap-3">
                    <Crop className="text-gold" /> Crop Your Photo
                  </h3>
                  <p className="text-xs text-text-muted uppercase tracking-widest mt-1">Adjust the area to feature on your {product.title}</p>
                </div>
                <button 
                  onClick={() => setIsCropping(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 relative bg-black/50">
                <Cropper
                  image={tempImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={options.aspect}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>

              <div className="p-8 bg-dark border-t border-white/5 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 w-full space-y-4">
                  <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-white/40">
                    <span className="flex items-center gap-2"><ZoomOut size={14} /> Zoom Out</span>
                    <span className="flex items-center gap-2">Zoom In <ZoomIn size={14} /></span>
                  </div>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-gold"
                  />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button 
                    onClick={() => setIsCropping(false)}
                    className="flex-1 md:flex-none px-8 py-4 rounded-full border border-white/10 font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveCrop}
                    className="flex-1 md:flex-none px-10 py-4 bg-gold text-black rounded-full font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-xl shadow-gold/20 flex items-center justify-center gap-2"
                  >
                    <Check size={20} /> Apply Crop
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Success Overlay */}
      <AnimatePresence>
        {isOrderSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/95 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-dark border border-white/10 rounded-[2.5rem] p-10 md:p-16 max-w-xl w-full text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gold" />
              
              <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 text-gold">
                <Check size={48} />
              </div>
              
              <h2 className="text-4xl md:text-5xl mb-6 font-display">Order Sent!</h2>
              <p className="text-xl text-text-muted leading-relaxed mb-10">
                Your customization details have been sent to our WhatsApp studio. Our artists will review your request and get back to you shortly.
              </p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    // Placeholder for future tracking feature
                    alert("Order tracking will be available soon! We'll update you on WhatsApp.");
                  }}
                  className="w-full bg-white/5 border border-white/10 py-5 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                >
                  <Truck size={20} /> Track Order (Coming Soon)
                </button>
                <button 
                  onClick={onClose}
                  className="w-full bg-gold text-black py-5 rounded-full font-bold uppercase tracking-widest hover:bg-gold-light transition-all shadow-xl shadow-gold/20"
                >
                  Back to Gallery
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProductCard = ({ 
  title, 
  description, 
  image, 
  onCustomize,
  isWishlisted,
  onToggleWishlist
}: { 
  title: string, 
  description: string, 
  image: string, 
  onCustomize: () => void,
  isWishlisted: boolean,
  onToggleWishlist: () => void
}) => {
  const shareUrl = window.location.href; // In a real app, this would be a specific product URL
  const shareText = `Check out this amazing ${title} from PrintMemories!`;

  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="bg-card-bg rounded-3xl overflow-hidden border border-white/5 hover:border-gold transition-all group relative"
    >
      <div className="h-72 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ShareMenu 
            url={shareUrl} 
            title={title} 
            text={shareText} 
          />
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className={`p-3 backdrop-blur-md rounded-full transition-all border border-white/10 ${
              isWishlisted 
              ? 'bg-red-500 text-white border-red-500' 
              : 'bg-black/50 text-white hover:bg-white hover:text-black'
            }`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="p-8 text-center">
        <h3 className="text-3xl mb-3 text-gold">{title}</h3>
        <p className="text-text-muted italic mb-8">{description}</p>
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={onCustomize}
            className="flex-1 inline-flex items-center justify-center gap-2 border border-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
          >
            Customize <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Products = ({ 
  onSelectProduct, 
  wishlist, 
  onToggleWishlist 
}: { 
  onSelectProduct: (p: any) => void,
  wishlist: string[],
  onToggleWishlist: (title: string) => void
}) => {
  const products = [
    {
      title: "Custom Mugs",
      description: "\"Warmth in every sip, memory in every glance.\"",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fbed39?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Premium Frames",
      description: "\"Timeless designs for your timeless moments.\"",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Photo T-Shirts",
      description: "\"Wear your story with pride and style.\"",
      image: "https://images.unsplash.com/photo-1576566582418-b088bb7d0a63?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="products" className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-[0.3em] font-bold text-sm block mb-4">Our Boutique</span>
          <h2 className="text-5xl md:text-6xl">Personalized Just For You</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <ProductCard 
                {...p} 
                onCustomize={() => onSelectProduct(p)} 
                isWishlisted={wishlist.includes(p.title)}
                onToggleWishlist={() => onToggleWishlist(p.title)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      icon: <MessageCircle size={40} />,
      title: "Send Photos",
      description: "Simply text us on WhatsApp with your favorite pictures and choice of gift."
    },
    {
      num: "02",
      icon: <Sparkles size={40} />,
      title: "Review Design",
      description: "Our artists create a mockup. We only print once you are 100% happy."
    },
    {
      num: "03",
      icon: <Gift size={40} />,
      title: "Home Delivery",
      description: "Relax while we gift-wrap and ship your memories to your doorstep."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-[0.3em] font-bold text-sm block mb-4">The Process</span>
          <h2 className="text-5xl md:text-6xl">Three Steps to Perfection</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-[#151515] p-10 rounded-3xl text-center relative pt-16"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold text-black rounded-full flex items-center justify-center font-black text-lg">
                {step.num}
              </div>
              <div className="text-gold mb-6 flex justify-center">{step.icon}</div>
              <h4 className="text-2xl mb-4 font-display">{step.title}</h4>
              <p className="text-text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      text: "The print quality on the canvas frame was beyond my expectations. It's now the centerpiece of our living room!",
      author: "Ananya Sharma, Delhi"
    },
    {
      text: "I needed a last minute anniversary gift. They designed and dispatched it the same day. Incredible service!",
      author: "Vikram Malhotra, Mumbai"
    },
    {
      text: "The WhatsApp ordering process is so convenient. No complicated apps, just direct human interaction.",
      author: "David R., Goa"
    }
  ];

  return (
    <section id="reviews" className="py-32 bg-cream text-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-gold uppercase tracking-[0.3em] font-bold text-sm block mb-4">Client Love</span>
          <h2 className="text-5xl md:text-6xl text-black">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl relative shadow-xl"
            >
              <div className="flex text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg leading-relaxed mb-8 italic">"{review.text}"</p>
              <div className="font-bold text-sm uppercase tracking-wider">— {review.author}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden text-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=1500&q=80" 
          alt="CTA Background" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl md:text-7xl mb-8">Ready to create magic?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-80 mb-12">
            Join 5,000+ happy customers who trust us with their most precious moments.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25d366] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-green-500/20"
            >
              <MessageCircle fill="white" /> Chat on WhatsApp
            </a>
            <a 
              href="#" 
              className="bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-pink-500/20"
            >
              <Instagram /> Follow us on Insta
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-3xl font-bold text-gold">
            <Phone size={28} />
            <span>+91 81236 96390</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold uppercase tracking-[0.3em] font-bold text-sm block mb-4">Get In Touch</span>
            <h2 className="text-5xl md:text-6xl mb-8">Have a special request?</h2>
            <p className="text-xl text-text-muted leading-relaxed mb-12 max-w-lg">
              Whether it's a bulk order for your company or a unique design idea, we're here to bring your vision to life.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-text-muted">hello@printmemories.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gold shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Call Us</h4>
                  <p className="text-text-muted">+91 81236 96390</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card-bg p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40 ml-2">Name</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-gold transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-white/40 ml-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input 
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-gold transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-white/40 ml-2">Subject</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    required
                    type="text"
                    placeholder="Bulk Order Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-gold transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-bold text-white/40 ml-2">Message</label>
                <div className="relative">
                  <MessageSquare className="absolute left-5 top-6 text-white/20" size={18} />
                  <textarea 
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-gold transition-all resize-none"
                  />
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl ${
                  isSubmitted 
                  ? 'bg-green-500 text-white shadow-green-500/20' 
                  : 'bg-gold text-black hover:bg-gold-light hover:-translate-y-1 shadow-gold/20'
                }`}
              >
                {isSubmitting ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={20} />
                  </motion.div>
                ) : isSubmitted ? (
                  <>
                    <Check size={20} /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} /> Send Inquiry
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-display font-bold text-gold mb-6">PrintMemories</h2>
            <p className="text-text-muted leading-relaxed">
              Making sure your best moments don't just stay on your phone, but live in your home.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Collections</h4>
            <ul className="flex flex-col gap-4 text-text-muted">
              <li><a href="#" className="hover:text-gold transition-all">Magic Mugs</a></li>
              <li><a href="#" className="hover:text-gold transition-all">Polaroid Frames</a></li>
              <li><a href="#" className="hover:text-gold transition-all">Custom Keychains</a></li>
              <li><a href="#" className="hover:text-gold transition-all">Wall Decor</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Company</h4>
            <ul className="flex flex-col gap-4 text-text-muted">
              <li><a href="#home" className="hover:text-gold transition-all">Home</a></li>
              <li><a href="#reviews" className="hover:text-gold transition-all">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-gold transition-all">Contact Us</a></li>
              <li><a href="#" className="hover:text-gold transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-all">Shipping Info</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold mb-8">Our Studio</h4>
            <p className="text-text-muted text-sm leading-relaxed">
              Bengaluru, Karnataka, India<br />
              Mon - Sat: 10AM - 8PM<br />
              Email: hello@printmemories.com
            </p>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 text-center text-xs text-white/20">
          © 2025 PrintMemories India. All Rights Reserved. Crafted by Passionate Artists.
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFloat = () => (
  <motion.a 
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-10 right-10 w-16 h-16 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-2xl z-[100] shadow-green-500/40"
  >
    <MessageCircle size={32} fill="white" />
    <motion.div 
      animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute inset-0 bg-[#25d366] rounded-full -z-10"
    />
  </motion.a>
);

const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-display text-gold"
      >
        PrintMemories...
      </motion.h2>
    </motion.div>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productTitle: string) => {
    setWishlist(prev => 
      prev.includes(productTitle) 
        ? prev.filter(t => t !== productTitle) 
        : [...prev, productTitle]
    );
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative selection:bg-gold selection:text-black">
      <Loader />
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[60]"
        style={{ scaleX }}
      />
      <Navbar wishlistCount={wishlist.length} />
      <Hero />
      <Marquee />
      <Products 
        onSelectProduct={setSelectedProduct} 
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <CTA />
      <Footer />
      <WhatsAppFloat />

      {selectedProduct && (
        <CustomizationModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
