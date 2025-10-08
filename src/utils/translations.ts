export const translations = {
  fa: {
    credit: 'اعتباری',
    permanent: 'دائمی',

    amazingCharge: 'شارژ شگفت انگیز',

    mobileNumber: 'شماره تلفن همراه',
    mobileNumberPlaceholder: '09123456789',
    email: 'ایمیل (اختیاری)',
    emailPlaceholder: 'example@email.com',

    chargeAmount: 'مبلغ شارژ',
    customAmount: 'مبلغ دلخواه',
    customAmountPlaceholder: 'مبلغ مورد نظر را وارد کنید',

    selectBank: 'انتخاب بانک',
    payment: 'پرداخت',
    cancel: 'انصراف',

    invoice: 'فاکتور',
    invoiceTitle: 'فاکتور شارژ',
    chargeType: 'نوع شارژ',
    paymentGateway: 'نام درگاه پرداخت',
    totalAmount: 'مبلغ کل',
    creditFee: 'کارمزد اعتباری (10%)',

    bankLogo1: 'بانک ملی',
    bankLogo2: 'بانک ملت',

    mobileRequired: 'شماره موبایل الزامی است',
    mobileInvalid: 'شماره موبایل معتبر نیست',
    emailInvalid: 'ایمیل معتبر نیست',
    amountRequired: 'مبلغ شارژ الزامی است',
    amountMin: 'حداقل مبلغ 1000 تومان است',

    normal: 'عادی',
    amazing: 'شگفت انگیز'
  },
  en: {

  }
};

export type Language = 'fa' | 'en';
export type TranslationKey = keyof typeof translations.fa;
