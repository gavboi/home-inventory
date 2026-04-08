import { pb } from "../lib/pocketbase";
import type {
  CreateInventoryItemInput,
  InventoryItem,
  UpdateInventoryItemInput,
} from "../types/inventory";

const INVENTORY_COLLECTION = "inventory_items";

function inventoryCollection() {
  return pb.collection(INVENTORY_COLLECTION);
}

export async function listInventoryItems(): Promise<InventoryItem[]> {
  return inventoryCollection().getFullList<InventoryItem>({
    sort: "-created",
  });
}

export async function getInventoryItemById(id: string): Promise<InventoryItem> {
  return inventoryCollection().getOne<InventoryItem>(id);
}

export async function createInventoryItem(
  payload: CreateInventoryItemInput,
): Promise<InventoryItem> {
  return inventoryCollection().create<InventoryItem>(payload);
}

export async function updateInventoryItem(
  id: string,
  payload: UpdateInventoryItemInput,
): Promise<InventoryItem> {
  return inventoryCollection().update<InventoryItem>(id, payload);
}

export async function deleteInventoryItem(id: string): Promise<void> {
  await inventoryCollection().delete(id);
}
