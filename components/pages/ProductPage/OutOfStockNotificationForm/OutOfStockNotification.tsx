'use client';

import { Dictionary } from '@/app/dictionaries';
import { ProductInventoryResponse } from '@/components/ProductForm/hooks';
import { Heading } from '@/components/base/Heading';
import { Text } from '@/components/base/Text';
import { Form } from '@/components/form/Form';
import { SubmitButton } from '@/components/form/SubmitButton';
import { TextField } from '@/components/form/TextField';
import { getBackInStockNotification } from '@/components/pages/ProductPage/OutOfStockNotificationForm/action';
import { Product, ProductVariant } from '@/components/pages/ProductPage/hooks';
import { useActiveVariant } from '@/lib/hooks/useActiveVariant';
import { cn } from '@/lib/utils';
import { useFormState } from 'react-dom';

interface Props {
  productType: Product['type'];
  variants: ProductVariant[];
  inventory: ProductInventoryResponse;
  dictionary: Dictionary['product_page']['back_in_stock_notification'];
  className?: string;
}

export function OutOfStockNotificationForm({
  productType,
  variants,
  inventory,
  className,
  dictionary
}: Props) {
  const activeVariant = useActiveVariant({
    productType,
    variants
  });
  let id = '';
  const backInStockNotificationWithVariantId = getBackInStockNotification.bind(null, id);
  const [formState, formAction] = useFormState(backInStockNotificationWithVariantId, null);

  if (!activeVariant) return null;

  id = activeVariant.id;

  const activeVariantAvailableForSale =
    inventory.variants.edges.find((edge) => edge.node.id === id)?.node?.availableForSale || false;

  if (activeVariantAvailableForSale || !id) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <Form action={formAction} validationErrors={formState?.errors}>
        {!formState?.success && (
          <>
            <Heading as="h2" size="xs">
              {dictionary.this_product_is_out_of_stock}
            </Heading>
            <Text className="max-w-80">{dictionary.if_you_want_to_be_notified}</Text>
            <TextField name="email" label="E-mail" autoComplete="email" />
            <SubmitButton>{dictionary.notify_me}</SubmitButton>
          </>
        )}
        {formState?.success && <Text>{dictionary.you_will_be_notified}</Text>}
      </Form>
    </div>
  );
}
