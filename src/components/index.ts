// Global components
import AlertModal from './global/alert.model';
import BackgroundCard from './global/background.theme';
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
import { PermissionsSection } from './ui/permission';
import { PermissionCard } from './ui/permission.card';
import { ProfileCard } from './ui/profile.card';
import { SponsorCard } from './ui/sponsor.event.card';
import CustomNavBar from './ui/tabnavbar';

export {
  AlertModal as Alert,
  AppIcon,
  AuthView,
  BackgroundCard,
  CustomNavBar,
  CustomError as Error,
  EventCard,
  Footer,
  Glassmorphism as GlassView,
  GoogleAuth,
  GoogleButton,
  Header,
  CustomLoader as Loader,
  PermissionCard,
  PermissionsSection,
  ProfileCard,
  SignOutButton,
  SponsorCard,
  CustomText as Text,
};
