// app/donation/page.tsx
import Image from 'next/image';

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
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch donation data");
  }
  return res.json();
}


export default async function DonationPage() {
  const donations = await fetchDonationData();

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Donation Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{donation.name}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Address:</strong> {donation.address}
            </p>
            <p className="text-gray-600 mb-2">{donation.description}</p>
            <p className="text-gray-600 mb-1">
              <strong>Contact:</strong> {donation.contact}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Email:</strong> {donation.email}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>WhatsApp:</strong> {donation.whatsapp}
            </p>
            <p className="text-gray-600">
              <strong>Country:</strong> {donation.country}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
