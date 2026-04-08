import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listInventoryItems } from "../services";
import type { InventoryItem } from "../types/inventory";

function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadItems() {
    setIsLoading(true);
    setError(null);

    try {
      const records = await listInventoryItems();
      setItems(records);
    } catch {
      setError("Could not load inventory records.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Inventory</h1>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button type="button" onClick={loadItems} disabled={isLoading}>
          Refresh
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "#8b0000" }}>{error}</p>}

      {!isLoading && !error && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} ({item.quantity})
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default Inventory;
