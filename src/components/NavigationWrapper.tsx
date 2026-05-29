'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FooterSecondary from './FooterSecondary';
import CourseFinder from './CourseFinder';
import RegisterModal from './RegisterModal';
import WhatsAppFAB from './WhatsAppFAB';

export default function NavigationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPath = pathname?.startsWith('/admin') || pathname === '/login';

  if (isAuthPath) {
    return <>{children}</>;
  }

  const isAboutPage = pathname === '/about';

  return (
    <>
      <Navbar />
      {children}
      <CourseFinder />
      <WhatsAppFAB />
      <RegisterModal />
      {isAboutPage ? <Footer /> : <FooterSecondary />}
    </>
  );
}
