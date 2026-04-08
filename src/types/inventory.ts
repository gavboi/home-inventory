import type { RecordModel } from "pocketbase";

export type InventoryItem = RecordModel & {
  name: string;
  quantity: number;
  barcode?: string;
  category?: string;
};

export type CreateInventoryItemInput = {
  name: string;
  quantity: number;
  barcode?: string;
  category?: string;
};

export type UpdateInventoryItemInput = Partial<CreateInventoryItemInput>;
