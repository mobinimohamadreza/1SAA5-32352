'use client';

import React, { useMemo } from 'react';
import { Paper, Text, Group, Stack, Divider } from '@mantine/core';
import { useAppSelector } from '@/Module/Store/Store';
import { selectTranslation } from '@/Module/Language/Store/languageSlice';
import { ChargeFormData } from '@/utils/validation';

interface InvoiceProps {
  formData: ChargeFormData;
  selectedBank?: { id: number; name: string; logo: string };
}

const Invoice: React.FC<InvoiceProps> = ({ formData, selectedBank }) => {
  const t = useAppSelector(selectTranslation);

  const { total, fee } = useMemo(() => {
    let total = formData.customAmount || 0;
    let fee = 0;

    if (formData.chargeType === 'credit') {
      fee = Math.round(total * 0.1);
      total += fee;
    }

    return { total, fee };
  }, [formData.customAmount, formData.chargeType]);

  const getChargeTypeText = () => {
    if (formData.chargeType === 'credit') {
      return formData.isAmazingCharge ? t('amazing') : t('normal');
    }
    return t('permanent');
  };

  return (
      <Paper shadow="sm" p="md" radius="md" style={{ marginTop: '20px' }}>
        <Stack gap="sm">
          <Text size="lg" fw={600} ta="center">
            {t('invoiceTitle') || 'فاکتور پرداخت'}
          </Text>

          <Divider />

          {formData.mobileNumber && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">{t('mobileNumber') || 'شماره موبایل'}:</Text>
                <Text size="sm" fw={500}>{formData.mobileNumber}</Text>
              </Group>
          )}

          {formData.customAmount > 0 && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">{t('chargeAmount') || 'مبلغ شارژ'}:</Text>
                <Text size="sm" fw={500}>{formData.customAmount.toLocaleString()} ریال</Text>
              </Group>
          )}

          <Group justify="space-between">
            <Text size="sm" c="dimmed">{t('chargeType') || 'نوع شارژ'}:</Text>
            <Text size="sm" fw={500}>{getChargeTypeText()}</Text>
          </Group>

          {formData.email && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">{t('email') || 'ایمیل'}:</Text>
                <Text size="sm" fw={500}>{formData.email}</Text>
              </Group>
          )}

          {selectedBank && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">{t('paymentGateway') || 'درگاه پرداخت'}:</Text>
                <Text size="sm" fw={500}>{selectedBank.name}</Text>
              </Group>
          )}

          {formData.chargeType === 'credit' && fee > 0 && (
              <Group justify="space-between">
                <Text size="sm" c="dimmed">{t('creditFee') || 'کارمزد اعتباری'}:</Text>
                <Text size="sm" fw={500}>{fee.toLocaleString()} ریال</Text>
              </Group>
          )}

          <Divider />

          <Group justify="space-between" display="">
            <Text size="md" fw={600}>{t('totalAmount') || 'مبلغ قابل پرداخت'}:</Text>
            <Text size="md" fw={600} c="blue">
              {total.toLocaleString()} ریال
            </Text>
          </Group>
        </Stack>
      </Paper>
  );
};

export default Invoice;
