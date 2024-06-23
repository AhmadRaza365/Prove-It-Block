import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ProductTypes } from "./types/ProductTypes";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

const auth = getAuth(app);

const db = getFirestore(app);

// Functions that are needed

// -----> Authentication

// -----------> 1- Functions for Login

// 1.1- Login with Email and Password
const LogInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs?.docs?.length > 0) {
      return {
        result: "success",
        message: "Logged In Successfully",
        user: {
          profile: docs?.docs[0]?.data(),
        },
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// 1.2- Login with Google

const LogInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    // check if user exists in the database
    if (docs?.docs?.length === 0) {
      // if user does not exist in the database, then create a new user
      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        fullName: user?.displayName,
        authProvider: "google",
        email: user?.email,
        profilePic: user?.photoURL,
      });
      // Return the user data after creating a new user
      return {
        result: "success",
        message: "Registered Successfully",
        user: {
          profile: {
            uid: user?.uid,
            fullName: user?.displayName,
            authProvider: "google",
            email: user?.email,
            profilePic: user?.photoURL,
          },
        },
      };
    } else {
      // if user exists in the database, then return the user data
      return {
        result: "success",
        message: "Logged In Successfully",
        user: {
          profile: docs?.docs[0]?.data(),
        },
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// -----------> 2- Functions for Register

// 2.1 Register with Full Name, email, Password
const RegisterWithEmailAndPassword = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      fullName: fullName,
      authProvider: "native",
      email: user.email,
      profilePic: "https://picsum.photos/500",
    });
    return {
      result: "success",
      message: "Registered Successfully",
      user: {
        profile: {
          uid: user.uid,
          fullName: fullName,
          authProvider: "native",
          email: user.email,
          profilePic: "https://picsum.photos/500",
          userRole: "customer",
        },
      },
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// 2.2 Register with Google
const RegisterWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    // check if user exists in the database
    if (docs?.docs?.length === 0) {
      // if user does not exist in the database, then create a new user
      await addDoc(collection(db, "users"), {
        uid: user?.uid,
        fullName: user?.displayName,
        authProvider: "google",
        email: user?.email,
        profilePic: user?.photoURL,
        userRole: "customer",
      });
      // Return the user data after creating a new user
      return {
        result: "success",
        message: "Registered Successfully",
        user: {
          profile: {
            uid: user?.uid,
            fullName: user?.displayName,
            authProvider: "google",
            email: user?.email,
            profilePic: user?.photoURL,
            userRole: "customer",
          },
        },
      };
    } else {
      // if user exists in the database, then return the user data
      return {
        result: "success",
        message: "Logged In Successfully",
        user: {
          profile: docs?.docs[0]?.data(),
        },
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      user: null,
    };
  }
};

// 3- Reset Password
const SendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      result: "success",
      message: "Password Reset Email Sent Successfully",
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
    };
  }
};

// 4- Functions for Logout
const Logout = () => {
  signOut(auth);
};

// 5- Update User Role
const UpdateUserRole = async (user: any, role: "reader" | "admin") => {
  try {
    const signedInUserUID = auth.currentUser?.uid;

    if (signedInUserUID) {
      const res = await GetUserData(signedInUserUID);
      const isAdminUser = res.userData?.userRole === "admin";
      if (isAdminUser) {
        const docRef = doc(db, "users", user);
        await updateDoc(docRef, {
          userRole: role,
        });

        return {
          result: "success",
          message: "User Role Updated Successfully",
        };
      } else {
        return {
          result: "error",
          message: "You are not Authorized to update user's role",
        };
      }
    } else {
      return {
        result: "error",
        message: "First do Login",
      };
    }
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
    };
  }
};

// 6- Get User Data
const GetUserData = async (userUuid: string) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", userUuid));
    const docs = await getDocs(q);
    const userData = docs.docs[0].data();

    return {
      result: "success",
      message: "User data fetched Successfully",
      userData: userData,
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
      userData: null,
    };
  }
};

// 1- Get Products By User Id
const GetProductsByUserId = async (userId: string) => {
  try {
    const q = query(
      collection(db, "products"),
      where("userUuid", "==", userId)
    );

    const docs = await getDocs(q);
    const products = docs.docs.map((item) => item.data());

    return {
      result: "success",
      message: "Products fetched Successfully",
      products: products,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      products: [],
    };
  }
};

// 2- Add new Article
const AddNewProduct = async ({
  name,
  sku,
  id,
  status,
  createdAt,
  activity,
  image,
}: ProductTypes) => {
  try {
    const signedInUserUID = auth.currentUser?.uid;

    if (signedInUserUID) {
      await addDoc(collection(db, "products"), {
        userUuid: signedInUserUID,
        name: name,
        sku: sku,
        id: id,
        status: status,
        image: image,
        createdAt: createdAt,
        activity: activity,
      });

      return {
        result: "success",
        message: "Product Added Successfully",
      };
    } else {
      return {
        result: "error",
        message: "First do Login",
      };
    }
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
    };
  }
};

// 3- Get Product By ID
const GetProductByID = async (id: string) => {
  try {
    const q = query(collection(db, "products"), where("id", "==", id));

    const docs = await getDocs(q);

    const article = docs.docs[0].data();

    return {
      result: "success",
      message: "Product fetched Successfully",
      product: article,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      product: null,
    };
  }
};

// 4- Update User Role
const UpdateProductData = async (id: string, status: string, activity: any) => {
  try {
    const q = query(collection(db, "products"), where("id", "==", id));

    const docs = await getDocs(q);

    const ref = docs.docs[0].ref;

    await updateDoc(ref, {
      status: "sold",
      activity: activity,
    });

    return {
      result: "success",
      message: "Product Updated Successfully",
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
    };
  }
};

// Get Brand Profile by Id
const GetBrandProfileById = async (id: string) => {
  try {
    const q = query(collection(db, "brandProfiles"), where("id", "==", id));

    const docs = await getDocs(q);

    const brandProfile = docs?.docs[0]?.data();

    return {
      result: "success",
      message: "Brand Profile fetched Successfully",
      data: brandProfile,
    };
  } catch (error: any) {
    return {
      result: "error",
      message: error.message || "Something went wrong",
      data: null,
    };
  }
};

// Update Brand Profile by Id
const UpdateBrandProfileById = async (id: string, data: any) => {
  try {
    const q = query(collection(db, "brandProfiles"), where("id", "==", id));

    const docs = await getDocs(q);

    // Check if the brand profile exists or not. If not then add a new brand profile
    if (docs.empty) {
      await addDoc(collection(db, "brandProfiles"), {
        id: id,
        ...data,
      });
    } else {
      const ref = docs?.docs[0]?.ref;

      await updateDoc(ref, {
        ...data,
      });
    }

    return {
      result: "success",
      message: "Brand Profile Updated Successfully",
    };
  } catch (err: any) {
    return {
      result: "error",
      message: err.message,
    };
  }
};

export {
  // Auth Functions
  auth,
  LogInWithEmailAndPassword,
  LogInWithGoogle,
  RegisterWithEmailAndPassword,
  RegisterWithGoogle,
  SendPasswordReset,
  Logout,
  UpdateUserRole,
  GetUserData,

  // Products
  GetProductsByUserId,
  AddNewProduct,
  GetProductByID,
  UpdateProductData,

  // Brand Profile
  GetBrandProfileById,
  UpdateBrandProfileById,
};
