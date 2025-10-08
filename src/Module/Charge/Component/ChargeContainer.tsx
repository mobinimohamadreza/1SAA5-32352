'use client';

import React, { useState, useMemo } from 'react';
import { Button, Group, Stack, Switch, Text, TextInput, Tabs } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppSelector } from '@/Module/Store/Store';
import { selectTranslation } from '@/Module/Language/Store/languageSlice';
import { Bank, banks, ChargeFormData, chargeFormSchema, chargeAmounts } from '@/utils/validation';
import Invoice from '@/components/Invoice';
import styles from './ChargeContainer.module.scss';

const ChargeContainer: React.FC = () => {
    const t = useAppSelector(selectTranslation);
    const [activeTab, setActiveTab] = useState<'credit' | 'permanent'>('credit');
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [showCustom, setShowCustom] = useState(false);

    const {
        register,
        formState: { errors, isValid },
        watch,
        setValue,
        trigger,
        getValues
    } = useForm<ChargeFormData>({
        resolver: zodResolver(chargeFormSchema),
        mode: 'onChange',
        defaultValues: {
            mobileNumber: '',
            email: '',
            customAmount: 0,
            isAmazingCharge: false,
            chargeType: 'credit',
        },
    });

    const values = watch();
    const isBankSelected = !!selectedBank;

    const handleTabChange = async (value: 'credit' | 'permanent') => {
        setActiveTab(value);
        setValue('chargeType', value);
        if (value === 'permanent') {
            setValue('isAmazingCharge', false);
        }
        await trigger();
    };

    const handleBankSelection = async () => {
        const isValid = await trigger();
        if (isValid) {
            setSelectedBank(banks[0]);
        }
    };

    const handleCancel = () => {
        setSelectedBank(null);
    };

    const handlePayment = () => {
        console.log( { ...getValues(), selectedBank });
    };

    const isAmountValid = useMemo(() => {
        return values.customAmount > 0;
    }, [values.customAmount]);

    const isFormValid = useMemo(() => {
        return isValid && isAmountValid && values.mobileNumber?.length === 11;
    }, [isValid, isAmountValid, values.mobileNumber]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.chargeWrapper}>
                <h1>خرید آنلاین شارژ ایرانسل</h1>
                <h6>نوع سیم‌کارت</h6>

                <Tabs value={activeTab} onChange={handleTabChange}
                      classNames={{ list: styles.tabCustom, panel: styles.wrapperInner }}>
                    <Tabs.List>
                        <Tabs.Tab value="credit">{t('credit')}</Tabs.Tab>
                        <Tabs.Tab value="permanent">{t('permanent')}</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab} pt="md">
                        <Switch
                            label={t('amazingCharge')}
                            checked={values.isAmazingCharge}
                            onChange={(e) => setValue('isAmazingCharge', e.currentTarget.checked)}
                            disabled={isBankSelected || activeTab !== 'credit'}
                            className={styles.Switch}
                        />

                        <TextInput
                            label={t('mobileNumber')}
                            {...register('mobileNumber')}
                            error={errors.mobileNumber?.message}
                            disabled={isBankSelected}
                            className={`${styles.inputMobile} ${values.mobileNumber ? styles.filled : ''}`}
                            onInput={(e) => {
                                const input = e.currentTarget;
                                let value = input.value.replace(/[^0-9]/g, '');
                                if (value.length > 11) value = value.slice(0, 11);
                                if (value.startsWith('9')) value = '0' + value;
                                input.value = value;
                                setValue('mobileNumber', value, { shouldValidate: true });
                            }}
                        />

                        <div className={styles.payment}>
                            <div className={styles.buttonWrap}>
                                {chargeAmounts.slice(0, 5).map((amount, index) => (
                                    <Button
                                        className={values.customAmount === amount.value  ? styles.buttonActive : undefined}
                                        key={index}
                                        onClick={() => {
                                            setValue('customAmount', amount.value, { shouldValidate: true });
                                            setShowCustom(false);
                                        }}
                                        disabled={isBankSelected}
                                    >
                                        {amount.label} <span>ریال</span>
                                    </Button>
                                ))}
                                <Button
                                    className={showCustom  ? styles.buttonActive : undefined}
                                    onClick={() => {
                                        setShowCustom((v) => !v);
                                        if (!showCustom) {
                                            setValue('customAmount', 0, { shouldValidate: true });
                                        }
                                    }}
                                    disabled={isBankSelected}
                                >
                                    {t('customAmount')}
                                </Button>
                            </div>

                            {showCustom && (
                                <>
                                    <p>{t('chargeAmount')}</p>
                                    <TextInput
                                        className={`${styles.inputMobile} ${values.customAmount ? styles.filled : ''}`}
                                        label={t('customAmount')}
                                        value={values.customAmount || ''}
                                        error={errors.customAmount?.message}
                                        onChange={(e) => {
                                            let value = e.currentTarget.value.replace(/[^0-9]/g, '');
                                            if (value.length > 10) value = value.slice(0, 10);
                                            const numericValue = value === '' ? 0 : Number(value);
                                            setValue('customAmount', numericValue, { shouldValidate: true });
                                        }}
                                        disabled={isBankSelected}
                                    />
                                </>
                            )}
                        </div>

                        <TextInput
                            label={t('email')}
                            placeholder=""
                            {...register('email')}
                            error={errors.email?.message}
                            disabled={isBankSelected}
                            className={`${styles.inputMobile} ${values.email ? styles.filled : ''}`}
                        />

                        {!isBankSelected ? (
                            <Button
                                onClick={handleBankSelection}
                                fullWidth
                                disabled={!isFormValid}
                            >
                                {t('selectBank')}
                            </Button>
                        ) : (
                            <Stack gap="md">
                                <Group justify="center" gap="lg">
                                    {banks.map((bank) => (
                                        <div key={bank.id} style={{ textAlign: 'center' }}>
                                            <div
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    backgroundColor: '#f0f0f0',
                                                    borderRadius: 8,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: 8,
                                                }}
                                            >
                                                <Text size="xs" c="dimmed">
                                                    {bank.name}
                                                </Text>
                                            </div>
                                        </div>
                                    ))}
                                </Group>

                                <Group>
                                    <Button onClick={handlePayment} color="green" style={{ flex: 1 }}>
                                        {t('payment')}
                                    </Button>
                                    <Button onClick={handleCancel} variant="outline" style={{ flex: 1 }}>
                                        {t('cancel')}
                                    </Button>
                                </Group>
                            </Stack>
                        )}
                    </Tabs.Panel>
                </Tabs>
            </div>

            <div className={styles.invoiceWrapper}>
                <Invoice formData={getValues()} selectedBank={selectedBank || undefined} />
            </div>
        </div>
    );
};

export default ChargeContainer;
