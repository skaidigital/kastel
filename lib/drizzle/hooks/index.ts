import { and, eq } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '../db';
import { PurchaseOrderLineItemsTable, selectPurchaseOrderLineItemsTableSchema } from '../schema';

/*
This function has an optional active parameter. For testing, this can be inputed as false to get the stock item, regardless of their status.
getBackInStockBySku('163', false) will return the stock item with sku '163' regardless of its status (active or not).
*/
export async function getBackInStockBySku(sku: string, active: boolean = true) {
  const result = await db
    .select()
    .from(PurchaseOrderLineItemsTable)
    .where(
      and(
        eq(PurchaseOrderLineItemsTable.purchase_order_status_active, active),
        eq(PurchaseOrderLineItemsTable.sku, sku)
      )
    );

  const validatedResult = z.array(selectPurchaseOrderLineItemsTableSchema).safeParse(result);
  return validatedResult;
}

// Example data:
// [
//     {
//       line_item_id: 458660,
//       purchase_order_id: 49294,
//       sku: '163',
//       expected_in_date: 2024-01-08T23:00:00.000Z,
//       purchase_order_status_active: false
//     }
//   ]
