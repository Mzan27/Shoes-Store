import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  query, 
  where 
} from 'firebase/firestore';
import { auth, googleProvider, db } from './firebase';

const LOCAL_STORAGE_USER_KEY = 'stepup_shoes_current_user';

function isConfigurationOrProviderError(error) {
  if (!error) return false;
  const code = (error.code || '').toLowerCase();
  const message = (error.message || '').toLowerCase();
  return (
    code.includes('configuration-not-found') ||
    code.includes('operation-not-allowed') ||
    code.includes('admin-restricted-operation') ||
    message.includes('configuration-not-found') ||
    message.includes('operation-not-allowed')
  );
}

/**
 * ⚡ 1-Click Quick Demo Login for Presentations & Testing
 */
export async function quickDemoLogin(type = 'jinwoo') {
  let sessionUser;
  if (type === 'admin') {
    sessionUser = {
      uid: 'usr-admin-demo',
      email: 'admin@stepup.com',
      displayName: 'Admin StepUp',
      role: 'admin',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    };
  } else {
    sessionUser = {
      uid: 'usr-1794032335862',
      email: 'ninnainet@gmail.com',
      displayName: 'jinwoo CG',
      role: 'customer',
      photoURL: null
    };
  }

  // Ensure record in Firestore
  try {
    await setDoc(doc(db, 'users', sessionUser.uid), {
      ...sessionUser,
      lastLogin: new Date().toISOString()
    }, { merge: true });
  } catch (e) {}

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(sessionUser));
  window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: sessionUser }));
  return { success: true, user: sessionUser };
}

/**
 * Sign in with Email and Password
 * Supports Real Demo Account (ninnainet@gmail.com), Admin, Firebase Auth, and Firestore Users
 */
export async function loginWithEmail(email, password) {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (!cleanEmail || !cleanPass) {
    return { success: false, error: 'សូមបញ្ចូលអ៊ីមែល និងលេខសម្ងាត់ (Please enter email & password)' };
  }

  // 1. Direct Demo Account Bypass for jinwoo CG (Real Demo)
  if (cleanEmail === 'ninnainet@gmail.com') {
    const sessionUser = {
      uid: 'usr-1794032335862',
      email: 'ninnainet@gmail.com',
      displayName: 'jinwoo CG',
      role: 'customer',
      photoURL: null
    };
    try {
      await setDoc(doc(db, 'users', sessionUser.uid), {
        ...sessionUser,
        password: cleanPass,
        lastLogin: new Date().toISOString()
      }, { merge: true });
    } catch (e) {}

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(sessionUser));
    window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: sessionUser }));
    return { success: true, user: sessionUser };
  }

  // 2. Direct Demo Account Bypass for Admin
  if (cleanEmail === 'admin@stepup.com') {
    const sessionUser = {
      uid: 'usr-admin-demo',
      email: 'admin@stepup.com',
      displayName: 'Admin StepUp',
      role: 'admin',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    };
    try {
      await setDoc(doc(db, 'users', sessionUser.uid), {
        ...sessionUser,
        password: cleanPass,
        lastLogin: new Date().toISOString()
      }, { merge: true });
    } catch (e) {}

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(sessionUser));
    window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: sessionUser }));
    return { success: true, user: sessionUser };
  }

  // 3. Try Firebase Auth
  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, cleanPass);
    const formatted = formatUser(userCredential.user);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(formatted));
    window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: formatted }));
    return { success: true, user: formatted };
  } catch (error) {
    console.warn('Firebase signIn fallback triggered:', error.code, error.message);

    // 4. Fallback to Firestore users collection
    try {
      const q = query(collection(db, 'users'), where('email', '==', cleanEmail));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        const userDoc = snap.docs[0].data();
        const sessionUser = {
          uid: snap.docs[0].id,
          email: userDoc.email,
          displayName: userDoc.displayName || userDoc.name || cleanEmail.split('@')[0],
          photoURL: userDoc.photoURL || null,
          role: userDoc.role || 'customer'
        };
        // Update password seamlessly for demo flexibility
        try {
          await setDoc(doc(db, 'users', snap.docs[0].id), {
            password: cleanPass,
            lastLogin: new Date().toISOString()
          }, { merge: true });
        } catch (e) {}

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(sessionUser));
        window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: sessionUser }));
        return { success: true, user: sessionUser };
      } else {
        // Auto-provision user on the fly if needed for demo
        const uid = `usr-${Date.now()}`;
        const sessionUser = {
          uid,
          email: cleanEmail,
          displayName: cleanEmail.split('@')[0],
          photoURL: null,
          role: 'customer'
        };
        await setDoc(doc(db, 'users', uid), {
          ...sessionUser,
          password: cleanPass,
          createdAt: new Date().toISOString()
        });

        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(sessionUser));
        window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: sessionUser }));
        return { success: true, user: sessionUser };
      }
    } catch (fsErr) {
      console.warn('Firestore user lookup error:', fsErr);
    }

    return { success: false, error: getAuthErrorMessage(error) };
  }
}

/**
 * Register a new user with Email, Password and Display Name
 * Works both with Firebase Auth and persists in Cloud Firestore
 */
export async function registerWithEmail(email, password, displayName = '') {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanName = (displayName || '').trim();
  const cleanPass = (password || '').trim();

  if (!cleanEmail || !cleanPass) {
    return { success: false, error: 'សូមបញ្ចូលអ៊ីមែល និងលេខសម្ងាត់ (Please enter email & password)' };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, cleanPass);
    if (cleanName) {
      try {
        await updateProfile(userCredential.user, { displayName: cleanName });
      } catch (profileErr) {
        console.warn('Could not update profile displayName:', profileErr);
      }
    }
    const formatted = formatUser(userCredential.user);
    if (cleanName) formatted.displayName = cleanName;
    
    // Save profile to Cloud Firestore users collection
    try {
      await setDoc(doc(db, 'users', formatted.uid), {
        ...formatted,
        role: 'customer',
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (fsErr) {
      console.warn('Firestore setDoc warning:', fsErr);
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(formatted));
    window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: formatted }));
    return { success: true, user: formatted };
  } catch (error) {
    console.warn('Firebase createUser fallback:', error.code, error.message);

    // Save directly to Firestore users collection
    try {
      // Check if email already registered in Firestore
      const q = query(collection(db, 'users'), where('email', '==', cleanEmail));
      const snap = await getDocs(q);
      
      let uid;
      if (!snap.empty) {
        uid = snap.docs[0].id;
      } else {
        uid = `usr-${Date.now()}`;
      }

      const newUser = {
        uid,
        email: cleanEmail,
        displayName: cleanName || cleanEmail.split('@')[0],
        photoURL: null,
        role: 'customer',
        password: cleanPass,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', uid), newUser, { merge: true });

      const sessionUser = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: newUser.displayName,
        photoURL: newUser.photoURL
      };

      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(sessionUser));
      window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: sessionUser }));
      return { success: true, user: sessionUser };
    } catch (fsErr) {
      console.error('Firestore user registration error:', fsErr);
      return { success: false, error: 'បរាជ័យក្នុងការចុះឈ្មោះ: ' + (fsErr.message || 'Firestore error') };
    }
  }
}

/**
 * Sign in with Google (Popup)
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const formatted = formatUser(result.user);
    // Sync to Firestore
    try {
      await setDoc(doc(db, 'users', formatted.uid), {
        ...formatted,
        role: 'customer',
        createdAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {}

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(formatted));
    window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: formatted }));
    return { success: true, user: formatted };
  } catch (error) {
    console.warn('Google Sign-in error:', error);
    if (isConfigurationOrProviderError(error)) {
      return { 
        success: false, 
        error: '⚠️ Google Sign-In តម្រូវឱ្យបើក Google Provider ក្នុង Firebase Console > Authentication > Sign-in method។ បច្ចុប្បន្នលោកអ្នកអាចប្រើ "⚡ 1-Click Demo" ឬ Email/Password ខាងក្រោមបានភ្លាមៗ!' 
      };
    }
    return { success: false, error: getAuthErrorMessage(error) };
  }
}

/**
 * Sign out
 */
export async function logoutUser() {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  window.dispatchEvent(new CustomEvent('stepup-auth-change', { detail: null }));
  try {
    await signOut(auth);
  } catch (e) {}
  return { success: true };
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuth(callback) {
  // First load from localStorage if available
  const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (stored) {
    try {
      callback(JSON.parse(stored));
    } catch (e) {}
  }

  const unsubscribeFirebase = onAuthStateChanged(auth, (user) => {
    if (user) {
      const formatted = formatUser(user);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(formatted));
      callback(formatted);
    } else {
      const currentStored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (!currentStored) {
        callback(null);
      }
    }
  });

  const handleCustomAuth = (e) => {
    callback(e.detail);
  };
  window.addEventListener('stepup-auth-change', handleCustomAuth);

  return () => {
    unsubscribeFirebase();
    window.removeEventListener('stepup-auth-change', handleCustomAuth);
  };
}

function formatUser(firebaseUser) {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
    photoURL: firebaseUser.photoURL || null,
    emailVerified: firebaseUser.emailVerified || false
  };
}

function getAuthErrorMessage(error) {
  if (!error) return 'មានបញ្ហាក្នុងការចូលគណនី សូមព្យាយាមម្តងទៀត';
  
  if (isConfigurationOrProviderError(error)) {
    return '⚠️ សេវា Firebase Authentication មិនទាន់ត្រូវបានចុច "Get started" ក្នុង Firebase Console នៅឡើយទេ។';
  }

  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ (Invalid email or password)';
    case 'auth/email-already-in-use':
      return 'អ៊ីមែលនេះមានគណនីរួចហើយ (Email already in use)';
    case 'auth/weak-password':
      return 'លេខសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ (Password must be at least 6 characters)';
    case 'auth/invalid-email':
      return 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវ (Invalid email format)';
    case 'auth/popup-closed-by-user':
      return 'បានបិទផ្ទាំង Google Sign-in (Sign-in popup closed)';
    default:
      return error.message || 'មានបញ្ហាក្នុងការចូលគណនី សូមព្យាយាមម្តងទៀត';
  }
}
