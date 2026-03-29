import { useLocation, useNavigate } from "react-router-dom";

type ScannerNavState = {
  action: "add" | "remove";
}

function Scanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { action } = location.state as ScannerNavState;

  return (
    
  );
}

export default Scanner;
