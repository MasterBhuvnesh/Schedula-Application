// Global components
import CustomError from './global/error';
import Glassmorphism from './global/glass';
import { AppIcon } from './global/icon';
import CustomLoader from './global/loader';
import CustomText from './global/text';

// Auth components
import { GoogleButton } from './auth/signin.button';
import { SignOutButton } from './auth/signout.button';

// SSO components
import GoogleAuth from './sso/google.auth';

// UI components
import AuthView from './ui/auth';
import { EventCard } from './ui/event.card';
import Footer from './ui/footer';
import Header from './ui/header';
import { ProfileCard } from './ui/profile.card';
import CustomNavBar from './ui/tabnavbar';
export {
  AppIcon,
  AuthView,
  CustomNavBar,
  CustomError as Error,
  EventCard,
  Footer,
  Glassmorphism as GlassView,
  GoogleAuth,
  GoogleButton,
  Header,
  CustomLoader as Loader,
  ProfileCard,
  SignOutButton,
  CustomText as Text,
};
