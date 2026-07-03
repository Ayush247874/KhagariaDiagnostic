import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Khagaria Diagnostic</h3>
                <p className="text-xs text-emerald-400">Accurate Diagnosis, Better Health</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Trusted diagnostic laboratory providing accurate pathology and diagnostic services with modern equipment and experienced technicians.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-sm hover:text-emerald-400 transition-colors">Services</Link></li>
              <li><Link to="/booking" className="text-sm hover:text-emerald-400 transition-colors">Book Test</Link></li>
              <li><Link to="/home-collection" className="text-sm hover:text-emerald-400 transition-colors">Home Collection</Link></li>
              <li><Link to="/reports" className="text-sm hover:text-emerald-400 transition-colors">Download Reports</Link></li>
              <li><Link to="/doctors" className="text-sm hover:text-emerald-400 transition-colors">Our Doctors</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-emerald-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-sm hover:text-emerald-400 cursor-pointer">Blood Tests</li>
              <li className="text-sm hover:text-emerald-400 cursor-pointer">Thyroid Tests</li>
              <li className="text-sm hover:text-emerald-400 cursor-pointer">Diabetes Tests</li>
              <li className="text-sm hover:text-emerald-400 cursor-pointer">ECG & X-Ray</li>
              <li className="text-sm hover:text-emerald-400 cursor-pointer">Ultrasound</li>
              <li className="text-sm hover:text-emerald-400 cursor-pointer">Health Packages</li>
              <li className="text-sm hover:text-emerald-400 cursor-pointer">Home Sample Collection</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Sagarmal Chowk Opposite (Dr.Satish Kumar) Mill Road Khagaria Bihar 851205</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">+91 6200386449</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm">manish3002k@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Mon - Sunday: 7:00 AM - 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Khagaria Diagnostic Center. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-emerald-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
