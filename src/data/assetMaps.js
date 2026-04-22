import cozyApartment from '../assets/images/apartments/cozy apartament.jpg';
import sharedApartment from '../assets/images/apartments/mieszkanie 3.jpg';
import riversideApartment from '../assets/images/apartments/duzy apartament.jpg';
import oldTownApartment from '../assets/images/apartments/stare miasto apartament.jpg';
import balconyApartment from '../assets/images/apartments/modern studio z balkonem.jpg';
import studentHouseApartment from '../assets/images/apartments/mieszkanie 2.jpg';
import premiumApartment from '../assets/images/apartments/mieszkanie 4 to jakies premium.jpg';
import womenSharedApartment from '../assets/images/apartments/mieszkanie1 2.jpg';

import doctorMaleOne from '../assets/images/doctors/lekarz m 2.jpg';
import doctorFemaleOne from '../assets/images/doctors/lekarz k 1.jpg';
import doctorMaleTwo from '../assets/images/doctors/lekarz m 3.jpg';
import doctorFemaleTwo from '../assets/images/doctors/lekarz k 2.jpg';
import doctorMaleThree from '../assets/images/doctors/lekarz m 4.jpg';
import doctorFemaleThree from '../assets/images/doctors/lekarz k 3.jpg';
import doctorMaleFour from '../assets/images/doctors/lekarz m 2-6.jpg';
import doctorFemaleFour from '../assets/images/doctors/lekarz k 4.jpg';

import zabkaCoupon from '../assets/images/store-and-vendors-assets/zabka kupon .jpeg';
import biedronkaLogo from '../assets/images/store-and-vendors-assets/biedronka logo.jpg';
import biedronkaCoupon from '../assets/images/store-and-vendors-assets/biedronka kupon.jpg';
import lidlLogo from '../assets/images/store-and-vendors-assets/lidllogo.jpg';
import lidlCoupon from '../assets/images/store-and-vendors-assets/lidlkupon.jpg';
import cityFitLogo from '../assets/images/store-and-vendors-assets/city fit logo.jpg';
import hebeLogo from '../assets/images/store-and-vendors-assets/hebe-logo-1.jpg';
import costaLogo from '../assets/images/store-and-vendors-assets/Costa_Coffee_logo.svg.jpg';
import sushiLogo from '../assets/images/store-and-vendors-assets/sushi.jpeg';
import dominosLogo from '../assets/images/store-and-vendors-assets/dominos logo.jpg';
import barberLogo from '../assets/images/store-and-vendors-assets/barber logo.jpg';

import perlaLogo from '../assets/images/restaurants/browar lublin logo perla.jpg';
import ubootLogo from '../assets/images/restaurants/u boot logo.jpeg';
import kazikLogo from '../assets/images/restaurants/kazik logo.jpg';
import ubootInside from '../assets/images/restaurants/uboot zdjecie srodek.jpg';
import kazikInside from '../assets/images/restaurants/kazik zdjecie srodek.jpg';

import peselGraphic from '../assets/images/beurocracy-assets/pesel grafika 2.jpg';
import bankGraphic from '../assets/images/beurocracy-assets/konto w banku.jpg';
import studentIdGraphic from '../assets/images/beurocracy-assets/jakas legitymacja dowod.jpg';
import temporaryPermitGraphic from '../assets/images/beurocracy-assets/karta tym pobytu.jpg';
import nfzGraphic from '../assets/images/beurocracy-assets/nfz logo.jpg';
import addressDocsGraphic from '../assets/images/beurocracy-assets/moze na pesel.jpg';
import transportGraphic from '../assets/images/beurocracy-assets/mpk logo.jpg';
import simCardGraphic from '../assets/images/beurocracy-assets/karty sim.jpg';

export const housingImageById = {
  1: cozyApartment,
  2: sharedApartment,
  3: riversideApartment,
  4: oldTownApartment,
  5: balconyApartment,
  6: studentHouseApartment,
  7: premiumApartment,
  8: womenSharedApartment,
  'roommate-1': sharedApartment,
};

export const doctorImageById = {
  1: doctorMaleOne,
  2: doctorFemaleOne,
  3: doctorMaleTwo,
  4: doctorFemaleTwo,
  5: doctorMaleThree,
  6: doctorFemaleThree,
  7: doctorMaleFour,
  8: doctorFemaleFour,
};

export const necessityLogoById = {
  1: zabkaCoupon,
  2: biedronkaLogo,
  3: lidlLogo,
  5: cityFitLogo,
  7: hebeLogo,
  8: costaLogo,
  9: sushiLogo,
  10: dominosLogo,
  11: barberLogo,
  12: perlaLogo,
  13: ubootLogo,
  14: kazikLogo,
};

export const necessityPromoById = {
  1: zabkaCoupon,
  2: biedronkaCoupon,
  3: lidlCoupon,
};

export const bureaucracyGuideImageByKey = {
  pesel: peselGraphic,
  bank: bankGraphic,
  studentCard: studentIdGraphic,
  permit: temporaryPermitGraphic,
  nfz: nfzGraphic,
  address: addressDocsGraphic,
  tax: studentIdGraphic,
  internship: bankGraphic,
};

export const logisticsImageByKey = {
  bus: transportGraphic,
  sim: simCardGraphic,
};

export const socialEventImageById = {
  1: ubootInside,
  3: kazikInside,
};
