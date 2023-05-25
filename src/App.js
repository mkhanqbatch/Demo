import SellerLayout from "./Layout/seller/SellerLayout";
import AppRoutes from "./Routes/Routes";
import { ProSidebarProvider } from "react-pro-sidebar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
function App() {
  const stripePromise = loadStripe(
    "pk_test_51N8feyAdMsJcPGNhiof4CPgk9jAXRQ1b9TUaG1N0FYLQkIwJwVT2IiprwpW2Mz0JXQ0YxGKob6KQAwXX2shOnyCO00KNTpKqCi"
  );
  return (
    <ProSidebarProvider>
      <Elements stripe={stripePromise}>
        <AppRoutes />
      </Elements>
    </ProSidebarProvider>
  );
}
export default App;
