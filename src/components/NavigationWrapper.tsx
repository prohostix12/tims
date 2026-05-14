'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import CourseFinder from './CourseFinder';
import RegisterModal from './RegisterModal';

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

  return (
    <>
      <Navbar />
      {children}
      <CourseFinder />
      <RegisterModal />
      <Footer />
    </>
  );
}
