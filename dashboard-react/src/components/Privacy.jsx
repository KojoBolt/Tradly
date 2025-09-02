import React from 'react';
import Navbar from './Navbar';


const Privacy = () => {
	return (
		<div className="py-12 px-6 text-gray-100 bg-black">
			<Navbar />
			<div className='max-w-3xl mx-auto mt-4'>

			<h1 className="text-3xl font-bold mb-6 text-violet-500">Privacy Policy</h1>
			<p className="mb-4">At Cirvia Options, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our dashboard and related services.</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
			<ul className="list-disc ml-6 mb-4">
				<li>Personal information (such as name, email address, and login credentials) when you sign up or log in.</li>
				<li>Usage data, including pages visited, features used, and actions taken within the dashboard.</li>
				<li>Device and browser information for analytics and security.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
			<ul className="list-disc ml-6 mb-4">
				<li>To provide and improve our dashboard services.</li>
				<li>To personalize your experience and deliver relevant content.</li>
				<li>To communicate with you about updates, offers, and support.</li>
				<li>To ensure the security and integrity of our platform.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-8 mb-2">3. Data Protection</h2>
			<p className="mb-4">We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Your information is stored securely and only accessible to authorized personnel.</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">4. Sharing of Information</h2>
			<p className="mb-4">We do not sell or share your personal information with third parties except as required by law or to provide our services (such as payment processing or analytics providers).</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">5. Cookies & Tracking</h2>
			<p className="mb-4">Cirvia Options uses cookies and similar technologies to enhance your experience, analyze usage, and improve our services. You can manage your cookie preferences in your browser settings.</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">6. Your Rights</h2>
			<ul className="list-disc ml-6 mb-4">
				<li>Access, update, or delete your personal information at any time.</li>
				<li>Opt out of marketing communications.</li>
				<li>Contact us for any privacy-related concerns.</li>
			</ul>

			<h2 className="text-xl font-semibold mt-8 mb-2">7. Changes to This Policy</h2>
			<p className="mb-4">We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it regularly.</p>

			<h2 className="text-xl font-semibold mt-8 mb-2">8. Contact Us</h2>
			<p>If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:support@CirviaOptions.com" className="text-violet-400 underline">support@CirviaOptions.com</a>.</p>
		</div>
			</div>
	);
};

export default Privacy;
