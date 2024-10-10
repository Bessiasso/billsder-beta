import { Instagram } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations("Footer");
  return (
          <footer className="backdrop-blur-md py-8 px-8 lg:px-16 flex flex-col md:flex-row justify-end items-center gap-6">
              <p className="text-lg text-[#a8a7d1] ">
                  &copy; 2024 UCODEBYUS - billsder. {t("rights")}.
              </p>
          </footer>
      
  );
}

export default Footer