// app/donation/page.tsx
import Image from 'next/image';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaDonate, FaHandHoldingHeart, FaRegCreditCard } from 'react-icons/fa';

interface DonationInfo {
  id: number;
  name: string;
  address: string;
  description: string;
  contact: string;
  email: string;
  whatsapp: string;
  country: string;
}

async function fetchDonationData(): Promise<DonationInfo[]> {
  const API_URL = "https://lawngreen-dragonfly-304220.hostingersite.com/api/donate-info-for-web";
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error("Failed to fetch donation data");
  }
  return res.json();
}

export default async function DonationPage() {
  const donations = await fetchDonationData();
  const [firstDonation, ...otherDonations] = donations;

  return (
    <main className="min-h-screen mt-32 bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Support Our Cause</span>
            <span className="block text-green-600 mt-2">Make a Difference</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-500">
            Your generous donation helps us continue our mission and make a lasting impact.
          </p>
        </div>

        {/* Featured Donation Card */}
        {firstDonation && (
          <div className="mb-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 lg:flex lg:items-center">
              <div className="lg:w-2/3">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-white bg-opacity-20 rounded-full">
                    <FaHandHoldingHeart className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="ml-4 text-2xl font-bold text-white">Featured Donation Center</h2>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{firstDonation.name}</h3>
                <p className="text-green-100 mb-6">{firstDonation.description}</p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:${firstDonation.contact}`}
                    className="flex items-center px-6 py-3 bg-white text-green-700 font-medium rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <FaPhone className="mr-2" /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/${firstDonation.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I would like to make a donation`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-green-800 text-white font-medium rounded-lg hover:bg-green-900 transition-colors"
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp Donation
                  </a>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8 lg:w-1/3">
                <div className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-sm">
                  <h4 className="text-white font-semibold mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                      <p className="ml-3 text-sm text-green-100">{firstDonation.address}, {firstDonation.country}</p>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="h-5 w-5 text-white" />
                      <a href={`mailto:${firstDonation.email}`} className="ml-3 text-sm text-green-100 hover:text-white">
                        {firstDonation.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Donation Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {otherDonations.map((donation, index) => (
            <div
              key={donation.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg ${index % 3 === 0 ? 'bg-gradient-to-br from-blue-600 to-blue-800' : 'bg-white'}`}
            >
              <div className="p-8">
                <div className={`flex items-center mb-6 ${index % 3 === 0 ? 'text-white' : 'text-gray-900'}`}>
                  <div className={`p-3 rounded-full ${index % 3 === 0 ? 'bg-blue-500' : 'bg-blue-100'}`}>
                    <FaDonate className={`h-6 w-6 ${index % 3 === 0 ? 'text-white' : 'text-blue-600'}`} />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold">{donation.name}</h3>
                </div>

                <p className={`mb-6 ${index % 3 === 0 ? 'text-blue-100' : 'text-gray-600'}`}>
                  {donation.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className={`h-5 w-5 mt-0.5 flex-shrink-0 ${index % 3 === 0 ? 'text-blue-200' : 'text-gray-400'}`} />
                    <p className={`ml-3 text-sm ${index % 3 === 0 ? 'text-blue-100' : 'text-gray-600'}`}>
                      {donation.address}, {donation.country}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={`tel:${donation.contact}`}
                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${index % 3 === 0
                        ? 'bg-white text-blue-700 hover:bg-blue-50'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      }`}
                  >
                    <FaPhone className="mr-2" /> Call
                  </a>
                  <a
                    href={`https://wa.me/${donation.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I would like to make a donation`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white ${index % 3 === 0 ? 'bg-blue-400 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'
                      } transition-colors`}
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alternative Donation Methods */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Other Ways to Donate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bank Transfer Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="bg-green-100 p-4 rounded-xl inline-block mb-4">
                  <FaRegCreditCard className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bank Transfer</h3>
                <p className="text-gray-600 mb-6">Make a direct bank transfer to our account. Contact us for banking details.</p>
                <button className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                  Request Bank Details
                </button>
              </div>
            </div>

            {/* In-Kind Donations */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
                  <FaHandHoldingHeart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">In-Kind Donations</h3>
                <p className="text-gray-600 mb-6">Donate books, equipment, or other resources that can help our cause.</p>
                <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Volunteer */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="bg-purple-100 p-4 rounded-xl inline-block mb-4">
                  <FaDonate className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Become a Volunteer</h3>
                <p className="text-gray-600 mb-6">Your time and skills can make a difference. Join our team of volunteers.</p>
                <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                  Volunteer Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
