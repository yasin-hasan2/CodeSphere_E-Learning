import { Facebook, Linkedin, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Code<span className="text-purple-400">Sphere</span>
          </h2>
          <p className="text-sm leading-relaxed">
            For learners of all ages, professionals, and freelancers, Bohubrihi
            is one of the best skill development platforms in the country. With
            industry expert-designed career tracks and foundation courses, it
            helps you build a successful career both locally and globally.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">All Courses</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white cursor-pointer">Refund Policy</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Placement Support
            </li>
            <li className="hover:text-white cursor-pointer">Support Center</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-sm mb-2">📞 16780</p>
          <p className="text-sm mb-4">(9 AM - 10 PM)</p>

          <p className="text-sm mb-2">📧 info@bohubrihi.com</p>
        </div>

        {/* Legal + Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <p className="text-sm mb-2">
            Trade Licence No: TRAD/DNCC/037245/2022
          </p>
          <p className="text-sm mb-4">E-TIN No: 197682866359</p>

          {/* Social */}
          <div className="flex gap-4 mt-4">
            <span className="cursor-pointer hover:text-white">Facebook</span>
            <span className="cursor-pointer hover:text-white">LinkedIn</span>
            <span className="cursor-pointer hover:text-white">YouTube</span>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
        © 2026 Codes'pHere Technologies Bangladesh Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
