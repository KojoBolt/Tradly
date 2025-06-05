import React, { useState, useEffect } from 'react';
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Removed storage import
import { Client, Storage, ID } from 'appwrite';
import Sidebar from './Sidebar';
import Header from './Header';

const defaultImage = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg';

// Initialize Appwrite
const client = new Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('68307b20003484e50a8e'); // Replace with your Appwrite project ID

const storage = new Storage(client);
const BUCKET_ID = '683b32ee001a391799d8'; // Replace with your Appwrite bucket ID

const Settings = () => {
  const [tab, setTab] = useState('general');
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null); // Track current file ID for deletion
  const [preview, setPreview] = useState("");
  
  // Password change popup states
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Account deletion states
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const auth = getAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserProfile(currentUser.uid);
      fetchSubscription(currentUser.uid);
    }
  }, []);

  const fetchUserProfile = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setImageUrl(data.photoURL || '');
        setCurrentFileId(data.fileId || null); // Get stored file ID
      } else {
        setImageUrl(defaultImage);
      }
    } catch (error) {
      setUploadError('Failed to fetch profile: ' + error.message);
      setImageUrl(defaultImage);
    }
  };

  const fetchSubscription = async (uid) => {
    try {
      const subRef = doc(db, 'users', uid, 'subscriptions', 'active');
      const subSnap = await getDoc(subRef);
      if (subSnap.exists()) {
        setSubscription(subSnap.data());
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error('Fetch subscription error:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 350 * 1024 && ['image/jpeg', 'image/png'].includes(file.type)) {
      setImage(file);
      setUploadError('');
      uploadImage(file);
    } else {
      setUploadError('Image must be a JPEG/PNG under 350KB');
    }
  };

  const uploadImage = async (file) => {
    if (!user) {
      setUploadError('No user logged in');
      return;
    }
    try {
      // Delete existing file if it exists
      if (currentFileId) {
        try {
          await storage.deleteFile(BUCKET_ID, currentFileId);
        } catch (deleteError) {
          console.warn('Failed to delete existing file:', deleteError);
        }
      }

      // Upload new file to Appwrite
      const fileId = ID.unique();
      const uploadResult = await storage.createFile(
        BUCKET_ID,
        fileId,
        file
      );
      
      console.log('File uploaded:', uploadResult);
      const previewUrl = storage.getFilePreview(BUCKET_ID, uploadResult?.$id).href;
      console.log('Preview URL:', previewUrl);
      
      setPreview(previewUrl);
      // const downloadUrl = storage.getFileDownload('[BUCKET_ID]', response.$id);
      // Get the file URL
      const fileView = storage.getFileView(BUCKET_ID, fileId);
      const publicUrl = fileView.href;
      
      setImageUrl(publicUrl);
      setPreview(publicUrl);
      setCurrentFileId(fileId);

      // Update Firebase Firestore with the new URL and file ID
      if (!publicUrl) {
        throw new Error('Image preview URL is undefined');
      }

      await setDoc(doc(db, 'users', user.uid), {
        photoURL: publicUrl,
        fileId: fileId,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      setUploadError('Failed to upload image: ' + error.message);
    }
  };

  const deleteProfileImage = async () => {
    if (!user) {
      setUploadError('No user logged in');
      return;
    }

    try {
      // Delete file from Appwrite if it exists
      if (currentFileId) {
        try {
          await storage.deleteFile(BUCKET_ID, currentFileId);
        } catch (deleteError) {
          console.warn('Failed to delete file from Appwrite:', deleteError);
        }
      }

      // Reset state
      setImageUrl('');
      setCurrentFileId(null);

      // Update Firebase Firestore to remove photo
      await setDoc(doc(db, 'users', user.uid), {
        photoURL: null,
        fileId: null,
        updatedAt: new Date(),
      }, { merge: true });

    } catch (error) {
      setUploadError('Failed to reset image: ' + error.message);
    }
  };

  // Password change functionality
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError('');

    try {
      // Validate passwords
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      if (passwordData.newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        passwordData.currentPassword
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Update password
      await updatePassword(auth.currentUser, passwordData.newPassword);
      
      // Reset form and close popup
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordPopup(false);
      
      alert('Password updated successfully!');
      
    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  // Account deletion functionality
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setDeleteLoading(true);
    setDeleteError('');

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        deletePassword
      );
      
      await reauthenticateWithCredential(auth.currentUser, credential);
      
      // Delete user data from Firestore
      await deleteDoc(doc(db, 'users', auth.currentUser.uid));
      
      // Delete profile image from Appwrite if exists
      if (currentFileId) {
        try {
          await storage.deleteFile(BUCKET_ID, currentFileId);
        } catch (deleteError) {
          console.warn('Failed to delete profile image:', deleteError);
        }
      }
      
      // Delete user account
      await deleteUser(auth.currentUser);
      
      alert('Account deleted successfully!');
      // User will be automatically redirected to login page due to auth state change
      
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F0F2F5] font-roboto relative">
      {(!isMobile || isSidebarOpen) && (
        <div className="fixed md:static z-20">
          <Sidebar />
        </div>
      )}
      <main className={`flex-1 ${isMobile ? '' : 'ml-64'} bg-gray-100`}>
        <Header onMenuClick={toggleSidebar} profileImage={imageUrl || defaultImage} />
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

          {/* Tabs */}
          <div className="flex border-b border-green-600 mb-6">
            <button
              onClick={() => setTab('general')}
              className={`px-4 py-2 border-b-2 ${tab === 'general' ? 'border-green-800 text-green-800' : 'border-transparent text-gray-600'}`}
            >
              General settings
            </button>
            <button
              onClick={() => setTab('subscription')}
              className={`px-4 py-2 border-b-2 ${tab === 'subscription' ? 'border-green-800 text-green-800' : 'border-transparent text-gray-600'}`}
            >
              Subscription
            </button>
          </div>

          {tab === 'general' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Profile Details</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={preview || defaultImage}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                      <label className="cursor-pointer px-4 py-2 font-bold text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 text-center">
                        Upload Profile Photo
                        <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                      </label>
                      <button
                        onClick={deleteProfileImage}
                        className="px-4 py-2 border border-green-800 text-green-800 rounded hover:bg-blue-50 text-center"
                      >
                        Delete
                      </button>
                    </div>
                    {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Username</label>
                    <input
                      type="text"
                      value={user?.displayName || ''}
                      readOnly
                      className="w-full mt-1 border border-gray-200 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="w-full mt-1 border border-gray-200 rounded px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Change password</h3>
                  <p className="text-sm text-gray-600 mb-4">You feel your password is not secured enough you can change it here.</p>
                  <button 
                    onClick={() => setShowPasswordPopup(true)}
                    className="w-full px-4 py-2 bg-gray-200 text-green-800 rounded hover:bg-gray-200"
                  >
                    Change Password
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Close account</h3>
                  <p className="text-sm text-gray-600 mb-4">You can permanently delete or temporarily freeze your account.</p>
                  <button 
                    onClick={() => setShowDeletePopup(true)}
                    className="w-full px-4 py-2 border border-green-800 text-green-800 rounded hover:bg-blue-50"
                  >
                    Close Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'subscription' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Subscription Details</h3>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full text-center">
                    {subscription ? 'Active Subscription' : 'No Active Subscription'}
                  </span>
                </div>
                {subscription ? (
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">Plan:</span> {subscription.planName || 'N/A'}</p>
                    <p><span className="font-medium">Billing Amount:</span> ${subscription.amount || 'N/A'}/{subscription.billingCycle || 'month'}</p>
                    <p><span className="font-medium">Next Bill Date:</span> {subscription.nextBillDate ? new Date(subscription.nextBillDate).toLocaleDateString() : 'N/A'}</p>
                    <p><span className="font-medium">Plan Features:</span> {subscription.features || 'N/A'}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No subscription data available.</p>
                )}
                <div className="flex gap-3 mt-6">
                  <button className="px-2 py-2 border border-green-500 text-green-600 rounded hover:bg-green-50">
                    Cancel Subscription
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded cursor-not-allowed">
                    Change Plan
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Receipt History</h3>
                <div className="divide-y divide-green-200">
                  {subscription?.receiptHistory?.length > 0 ? (
                    subscription.receiptHistory.map((receipt, index) => (
                      <div key={index} className="flex justify-between py-3 text-sm text-gray-700">
                        <span>{receipt.planName || 'Essential (Monthly)'}</span>
                        <div className="flex gap-4">
                          <span>{receipt.date ? new Date(receipt.date).toLocaleDateString() : 'N/A'}</span>
                          <a href={receipt.pdfUrl || '#'} className="text-green-800 hover:underline">PDF</a>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600">No receipt history available.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Password Change Popup */}
      {showPasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                    className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                    minLength={6}
                    className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                    minLength={6}
                    className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordPopup(false);
                    setPasswordError('');
                    setPasswordData({currentPassword: '', newPassword: '', confirmPassword: ''});
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Deletion Popup */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Delete Account</h3>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <form onSubmit={handleDeleteAccount}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Enter your password to confirm
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  required
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-red-500"
                  placeholder="Enter your current password"
                />
              </div>
              {deleteError && <p className="text-red-500 text-sm mb-4">{deleteError}</p>}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeletePopup(false);
                    setDeleteError('');
                    setDeletePassword('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleteLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;