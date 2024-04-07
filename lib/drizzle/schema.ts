import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// Create a table for purchase orders
export const PurchaseOrdersTable = pgTable('purchase_orders', {
  purchase_order_id: serial('purchase_order_id').primaryKey(),
  purchase_order_number: varchar('purchase_order_number').notNull(),
  expected_in_date: timestamp('expected_in_date').notNull(),
  purchase_order_status_active: boolean('purchase_order_status_active').notNull()
});

// Create a table for purchase order line items
export const PurchaseOrderLineItemsTable = pgTable('purchase_order_line_items', {
  line_item_id: serial('line_item_id').primaryKey(),
  purchase_order_id: integer('purchase_order_id')
    .notNull()
    .references(() => PurchaseOrdersTable.purchase_order_id),
  sku: varchar('sku').notNull(),
  expected_in_date: timestamp('expected_in_date').notNull(),
  purchase_order_status_active: boolean('purchase_order_status_active').notNull()
});

export const insertPurchaseOrdersTableSchema = createInsertSchema(PurchaseOrdersTable, {
  purchase_order_id: (schema) => schema.purchase_order_id.positive(),
  purchase_order_number: (schema) => schema.purchase_order_number.min(1),
  expected_in_date: (schema) => schema.expected_in_date,
  purchase_order_status_active: (schema) => z.boolean(schema.purchase_order_status_active)
});

export const insertPurchaseOrderLineItemsTableSchema = createInsertSchema(
  PurchaseOrderLineItemsTable,
  {
    line_item_id: (schema) => schema.line_item_id.positive(),
    purchase_order_id: (schema) => schema.purchase_order_id.positive(),
    sku: (schema) => schema.sku.min(1),
    expected_in_date: (schema) => schema.expected_in_date,
    purchase_order_status_active: (schema) => z.boolean(schema.purchase_order_status_active)
  }
);

export type InsertPurchaseOrdersSchemaType = z.infer<typeof insertPurchaseOrdersTableSchema>;
export type InsertLineItemsSchemaType = z.infer<typeof insertPurchaseOrderLineItemsTableSchema>;

export const selectPurchaseOrdersTableSchema = createSelectSchema(PurchaseOrdersTable);

export const selectPurchaseOrderLineItemsTableSchema = createSelectSchema(
  PurchaseOrderLineItemsTable
);

export type selectLineItemSchema = z.infer<typeof selectPurchaseOrderLineItemsTableSchema>;
