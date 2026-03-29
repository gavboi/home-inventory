import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  function handleClickAddItem() {
    console.log("Add item clicked");
    navigate("/scanner", { state: { action: "add" } });
  }

  function handleClickRemoveItem() {
    console.log("Remove item clicked");
    navigate("/scanner", { state: { action: "remove" } });
  }

  function handleClickInventory() {
    console.log("Inventory clicked");
    navigate("/inventory");
  }

  function handleClickRecipes() {
    console.log("Recipes clicked");
    navigate("/recipes");
  }
  // add
  // remove
  // inventory
  // recipes
  return (
    <main>
      <div className="cell-frequent" style={{backgroundColor: "#007700"}} onClick={handleClickAddItem}>
        <p className="cell-text">Add Item</p>
      </div>
      <div className="cell-frequent" style={{backgroundColor: "#770000"}} onClick={handleClickRemoveItem}>
        <p className="cell-text">Remove Item</p>
      </div>
      <div className="cell-manage" onClick={handleClickInventory}>
        <p className="cell-text">Inventory</p>
      </div>
      <div className="cell-manage" onClick={handleClickRecipes}>
        <p className="cell-text">Recipes</p>
      </div>
    </main>
  )
}

export default Home;
