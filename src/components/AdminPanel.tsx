import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Inbox, Package, Image as ImageIcon, MessageSquare, HelpCircle, Users, Settings, LogOut, Plus, Edit, Trash2 } from 'lucide-react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { SECTION_H2_CLASS } from '../lib/typography';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
    { name: 'Packages', path: '/admin/packages', icon: Package },
    { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'FAQ', path: '/admin/faq', icon: HelpCircle },
    { name: 'Partners', path: '/admin/partners', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-serif font-semibold tracking-tight">Admin Panel</h1>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-brand-700' : 'hover:bg-brand-800'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-800">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full rounded-lg hover:bg-brand-800 transition-colors text-brand-300"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif text-brand-900">Dashboard Overview</h1>
        <div className="flex space-x-4">
          <button className="bg-brand-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-900 transition-colors">
            New Inquiry
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'New Inquiries', value: '12', color: 'bg-blue-500', trend: '+20%' },
          { label: 'Confirmed Bookings', value: '45', color: 'bg-green-500', trend: '+5%' },
          { label: 'Total Revenue', value: 'Kr 450k', color: 'bg-purple-500', trend: '+12%' },
          { label: 'Active Packages', value: '3', color: 'bg-orange-500', trend: '0%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-serif text-brand-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-serif mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { user: 'Sarah Johnson', action: 'sent a new inquiry', time: '2 hours ago' },
              { user: 'Admin', action: 'updated package "Plus"', time: '5 hours ago' },
              { user: 'Thomas Berg', action: 'confirmed booking for June 12', time: '1 day ago' },
              { user: 'Admin', action: 'uploaded 5 new gallery items', time: '2 days ago' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between text-sm border-b border-gray-50 pb-4 last:border-none last:pb-0">
                <div>
                  <span className="font-bold text-brand-900">{activity.user}</span>
                  <span className="text-gray-500 ml-2">{activity.action}</span>
                </div>
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-serif mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/packages" className="p-4 bg-brand-50 rounded-lg text-center hover:bg-brand-100 transition-colors">
              <Package className="mx-auto mb-2 text-brand-700" size={24} />
              <span className="text-sm font-medium text-brand-900">Manage Packages</span>
            </Link>
            <Link to="/admin/gallery" className="p-4 bg-brand-50 rounded-lg text-center hover:bg-brand-100 transition-colors">
              <ImageIcon className="mx-auto mb-2 text-brand-700" size={24} />
              <span className="text-sm font-medium text-brand-900">Update Gallery</span>
            </Link>
            <Link to="/admin/faq" className="p-4 bg-brand-50 rounded-lg text-center hover:bg-brand-100 transition-colors">
              <HelpCircle className="mx-auto mb-2 text-brand-700" size={24} />
              <span className="text-sm font-medium text-brand-900">Edit FAQ</span>
            </Link>
            <Link to="/admin/settings" className="p-4 bg-brand-50 rounded-lg text-center hover:bg-brand-100 transition-colors">
              <Settings className="mx-auto mb-2 text-brand-700" size={24} />
              <span className="text-sm font-medium text-brand-900">Site Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const InquiryList = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setInquiries(data);
      setLoading(false);
    };
    fetchInquiries();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif text-brand-900">Inquiries</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Date</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Name</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Event</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Guests</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
              <th className="p-4 text-xs font-bold uppercase tracking-widest text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">Loading...</td></tr>
            ) : inquiries.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-gray-500">No inquiries found.</td></tr>
            ) : inquiries.map((inq) => (
              <tr key={inq.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-sm text-gray-600">{new Date(inq.created_at).toLocaleDateString()}</td>
                <td className="p-4 text-sm font-medium text-brand-900">{inq.name}</td>
                <td className="p-4 text-sm text-gray-600 capitalize">{inq.event_type}</td>
                <td className="p-4 text-sm text-gray-600">{inq.guest_count}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${
                    inq.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {inq.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-brand-700 hover:text-brand-900 text-sm font-bold">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PackagesManagement = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={SECTION_H2_CLASS}>Packages Management</h2>
        <button className="bg-brand-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-900 transition-colors flex items-center">
          <Plus size={18} className="mr-2" /> Add New Package
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Features</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[
              { name: 'Basis', price: 'Kr 450,-', features: 5 },
              { name: 'Plus', price: 'Kr 750,-', features: 8 },
              { name: 'Premium', price: 'Kr 1250,-', features: 12 },
            ].map((pkg, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-brand-900">{pkg.name}</td>
                <td className="px-6 py-4 text-gray-600">{pkg.price}</td>
                <td className="px-6 py-4 text-gray-600">{pkg.features} items</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                    <button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GalleryManagement = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={SECTION_H2_CLASS}>Gallery Management</h2>
        <button className="bg-brand-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-900 transition-colors flex items-center">
          <Plus size={18} className="mr-2" /> Upload Images
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <img 
              src={`https://picsum.photos/seed/gallery-${item}/400/300`} 
              alt="Gallery item"
              className="w-full h-40 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Wedding</p>
              <p className="text-sm text-brand-900 truncate">Beautiful Summer Wedding</p>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
              <button className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50"><Edit size={18} /></button>
              <button className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQManagement = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={SECTION_H2_CLASS}>FAQ Management</h2>
        <button className="bg-brand-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-900 transition-colors flex items-center">
          <Plus size={18} className="mr-2" /> Add Question
        </button>
      </div>
      <div className="space-y-4">
        {[
          { q: 'What is the capacity?', a: 'Up to 120 guests seated.' },
          { q: 'Is parking available?', a: 'Yes, free parking outside.' },
        ].map((faq, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
            <div className="space-y-2">
              <p className="font-serif text-lg text-brand-900">Q: {faq.q}</p>
              <p className="text-gray-600">A: {faq.a}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SiteSettings = () => {
  return (
    <div className="space-y-8">
      <h2 className={SECTION_H2_CLASS}>Site Settings</h2>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <form className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Site Name (NO)</label>
              <input type="text" defaultValue="Rønningen Selskapslokale" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Site Name (EN)</label>
              <input type="text" defaultValue="Rønningen Venue" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Contact Email</label>
            <input type="email" defaultValue="post@ronningen.no" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-widest">Phone Number</label>
            <input type="text" defaultValue="+47 123 45 678" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>
          <div className="pt-4">
            <button type="submit" className="bg-brand-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-900 transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TestimonialsManagement = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={SECTION_H2_CLASS}>Testimonials Management</h2>
        <button className="bg-brand-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-900 transition-colors flex items-center">
          <Plus size={18} className="mr-2" /> Add Testimonial
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {[
          { name: 'Sarah & Thomas', event: 'Wedding', content: 'Magical experience...' },
          { name: 'Nordic Tech AS', event: 'Corporate', content: 'Professional environment...' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
            <div>
              <p className="font-bold text-brand-900">{item.name}</p>
              <p className="text-xs text-gray-400 uppercase tracking-widest">{item.event}</p>
              <p className="text-gray-600 mt-2 italic">"{item.content}"</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PartnersManagement = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={SECTION_H2_CLASS}>Partner Vendors</h2>
        <button className="bg-brand-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-900 transition-colors flex items-center">
          <Plus size={18} className="mr-2" /> Add Partner
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Elite Catering', category: 'Food & Drink' },
          { name: 'Floral Dreams', category: 'Decoration' },
          { name: 'Sound Master', category: 'Audio/Visual' },
        ].map((partner, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-brand-50 rounded-lg mb-4 flex items-center justify-center text-brand-300">
              <Users size={32} />
            </div>
            <h4 className="font-bold text-brand-900">{partner.name}</h4>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">{partner.category}</p>
            <div className="mt-6 flex justify-end space-x-2">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminPanel = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="inquiries" element={<InquiryList />} />
        <Route path="packages" element={<PackagesManagement />} />
        <Route path="gallery" element={<GalleryManagement />} />
        <Route path="testimonials" element={<TestimonialsManagement />} />
        <Route path="faq" element={<FAQManagement />} />
        <Route path="partners" element={<PartnersManagement />} />
        <Route path="settings" element={<SiteSettings />} />
        <Route path="*" element={<div className="text-center p-20 text-gray-500">Module coming soon...</div>} />
      </Routes>
    </AdminLayout>
  );
};
