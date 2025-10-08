'use client';

import React, { useState } from 'react';
import {Button, Group, Stack, Switch, Text, TextInput,} from '@mantine/core';
import {useAppSelector} from '@/Module/Store/Store';
import {selectTranslation} from '@/Module/Language/Store/languageSlice';
import {Bank, chargeAmounts ,banks} from '@/utils/validation';
import styles from './TabBody.module.scss';

interface TabBodyProps {
    values: any;
    setValue: (name: string, value: any) => void;
    isValid: boolean;
    isBankSelected: boolean;
    onBankSelection: () => void;
    onCancel: () => void;
    onPayment: () => void;
    selectedBank: Bank | null;
    chargeType: 'credit' | 'permanent';
}

const TabBody: React.FC<TabBodyProps> = ({
                                            values,
                                            setValue,
                                            isValid,
                                             isBankSelected,
                                             onBankSelection,
                                             onCancel,
                                             onPayment,
                                             chargeType,
                                         }) => {
    const t = useAppSelector(selectTranslation);
  const [showCustom, setShowCustom] = useState(false);



    return (
        <div className={styles.wrapper}>
            <Switch
                label={t('amazingCharge')}
                checked={values.isAmazingCharge}
                onChange={(event) => setValue('isAmazingCharge', event.currentTarget.checked)}
                disabled={isBankSelected || chargeType !== 'credit'}
                className={styles.Switch}
            />

            <TextInput
                label={t('mobileNumber')}
                placeholder=""
                value={values.mobileNumber || ''}
                onChange={(e) => setValue('mobileNumber', e.currentTarget.value)}
                disabled={isBankSelected}
                className={`${styles.inputMobile} ${values.mobileNumber ? styles.filled : ''}`}
                onInput={(e) => {
                    const input = e.currentTarget;
                    if (input.value.length > 11) {
                        input.value = input.value.slice(0, 11);
                    }
                }}
            />

            <div className={styles.payment}>
                <div>
                    {chargeAmounts.slice(0, 5).map((amount, index) => (
                        <Button
                            key={index}
                            variant={values.customAmount === amount.value ? 'filled' : 'outline'}
                            onClick={() => setValue('customAmount', amount.value)}
                            disabled={isBankSelected}
                        >
                            {amount.label}
                            <span> ریال</span>
                        </Button>
                    ))}
                    <Button
                        variant={showCustom ? 'filled' : 'outline'}
                        onClick={() => setShowCustom((v) => !v)}
                        disabled={isBankSelected}
                        style={{marginInlineStart: 8}}
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
                            placeholder={t('customAmountPlaceholder')}
                            value={values.customAmount ?? ''}
                            onChange={(e) => {
                                let value = e.currentTarget.value.replace(/[^0-9]/g, '');
                                if (value.length > 10) value = value.slice(0, 10);
                                setValue('customAmount', value === '' ? 0 : Number(value));
                            }}
                            disabled={isBankSelected}
                        />
                    </>
                )}
            </div>

            <TextInput
                label={t('email')}
                placeholder=""
                value={values.email || ''}
                onChange={(e) => setValue('email', e.currentTarget.value, { shouldValidate: true })}
                disabled={isBankSelected}
                className={`${styles.inputMobile} ${values.email ? styles.filled : ''}`}
            />

            {!isBankSelected ? (
                <Button onClick={onBankSelection} disabled={!isValid} fullWidth>
                    {t('selectBank')}
                </Button>
            ) : (
                <Stack gap="md">
                    <Group justify="center" gap="lg">
                        {banks.map((bank) => (
                            <div key={bank.id} style={{textAlign: 'center'}}>
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: '#f0f0f0',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '8px',
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
                        <Button onClick={onPayment} color="green" style={{flex: 1}}>
                            {t('payment')}
                        </Button>
                        <Button
                            onClick={onCancel}
                            variant="outline"
                            style={{flex: 1}}
                        >
                            {t('cancel')}
                        </Button>
                    </Group>
                </Stack>
            )}
        </div>
    );
};

export default TabBody;
