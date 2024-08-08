import React from 'react';
import BannerSectionStyle3 from '../Section/BannerSection/BannerSectionStyle3';
import Section from '../Section';
import { pageTitle } from '../../helpers/PageTitle';
import AddPrescriptionSection from '../Section/AddPrescriptionSection/AddPrescriptionSection';

export default function AddPrescriptionPage() {
  pageTitle('Add Prescription');
  return (
    <>
      <BannerSectionStyle3
        bgUrl="/images/appointments/banner_bg.svg"
        imgUrl="https://prohealth-react.vercel.app/images/appointments/banner_img.png"
        title="Don’t Let Your Health Take a Backseat!"
        subTitle="Fill out the appointment form below to schedule a consultation with one of our healthcare professionals."
      />
      <Section
        topMd={200}
        topLg={150}
        topXl={110}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <AddPrescriptionSection />
      </Section>
    </>
  );
}
