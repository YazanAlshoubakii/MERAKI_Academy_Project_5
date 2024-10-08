import React from "react";
import { useSelector } from "react-redux";
import BannerSectionStyle3 from "../Section/BannerSection/BannerSectionStyle3";
import Section from "../Section";
import UserProfileSection from "../Section/UserProfileSection/UserProfileSection";
import { pageTitle } from "../../helpers/PageTitle";
import ScrollUp from "../ScrollUp/ScrollUp";

export default function UserProfile() {
  const userId = useSelector((state) => state.auth.userId);
  const isLoggedIn=useSelector((state) => state.auth.isLoggedIn);
  const patientId=useSelector((state) => state.auth.patientId);
  let subTitle=isLoggedIn? `Patient ID :- ${patientId}`:'Welcome to our family'
  pageTitle("User-profile");
  return (
    <>
      <ScrollUp />
      <BannerSectionStyle3
        bgUrl="/images/pricing_plan/banner_bg.svg"
        imgUrl="/images/pricing_plan/banner_img.png"
        title="Welcome To Pro Health"
        subTitle={subTitle}
      />
      <Section
        topMd={185}
        topLg={140}
        topXl={100}
        bottomMd={200}
        bottomLg={150}
        bottomXl={110}
      >
        <UserProfileSection userId={userId} />
      </Section>
    </>
  );
}
