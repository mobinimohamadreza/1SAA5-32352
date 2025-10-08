import { z } from 'zod';

export const chargeFormSchema = z.object({
    mobileNumber: z
        .string({ required_error: 'شماره موبایل الزامی است' })
        .min(11, 'شماره موبایل باید ۱۱ رقم باشد')
        .regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
    email: z
        .union([
            z.string().email('ایمیل معتبر نیست'),
            z.string().length(0)
        ])
        .optional()
        .transform(e => e === "" ? undefined : e),
    customAmount: z
        .number({ required_error: 'مبلغ شارژ الزامی است' })
        .min(1000, 'مبلغ شارژ باید حداقل ۱,۰۰۰ ریال باشد')
        .max(100000000, 'مبلغ شارژ نمی‌تواند بیشتر از ۱۰۰,۰۰۰,۰۰۰ ریال باشد'),
    isAmazingCharge: z.boolean().default(false),
    chargeType: z.enum(['credit', 'permanent']).default('credit')
});

export type ChargeFormData = z.infer<typeof chargeFormSchema>;

export type ChargeAmountOption = { value: number; label: string };
export const chargeAmounts: ChargeAmountOption[] = [
    { value: 10000, label: '10,000' },
    { value: 20000, label: '20,000' },
    { value: 50000, label: '50,000' },
    { value: 100000, label: '100,000' },
    { value: 200000, label: '200,000' },
    { value: 0, label: 'مبلغ دلخواه' }
];

export type Bank = { id: number; name: string; logo: string };
export const banks: Bank[] = [
    { id: 1, name: 'بانک ملی', logo: '/bank1.png' },
    { id: 2, name: 'بانک ملت', logo: '/bank2.png' }
];
