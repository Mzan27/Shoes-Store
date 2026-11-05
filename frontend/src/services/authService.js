import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  updateProfile, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';

/**
 * Sign in with Email and Password
 */
export async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: formatUser(userCredential.user) };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error) };
  }
}

/**
 * Register a new user with Email, Password and Display Name
 */
export async function registerWithEmail(email, password, displayName = '') {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName.trim()) {
      await updateProfile(userCredential.user, { displayName });
    }
    return { success: true, user: formatUser(userCredential.user) };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error) };
  }
}

/**
 * Sign in with Google (Popup)
 */
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: formatUser(result.user) };
  } catch (error) {
    return { success: false, error: getAuthErrorMessage(error) };
  }
}

/**
 * Sign out
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Listen to auth state changes
 */
export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, (user) => {
    callback(user ? formatUser(user) : null);
  });
}

function formatUser(firebaseUser) {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
    photoURL: firebaseUser.photoURL || null,
    emailVerified: firebaseUser.emailVerified
  };
}

function getAuthErrorMessage(error) {
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
    case 'auth/operation-not-allowed':
      return 'ការចូលគណនីមិនទាន់ត្រូវបានបើកដំណើរការក្នុង Firebase Console (Provider not enabled in Firebase Console)';
    default:
      return error.message || 'មានបញ្ហាក្នុងការចូលគណនី សូមព្យាយាមម្តងទៀត';
  }
}

