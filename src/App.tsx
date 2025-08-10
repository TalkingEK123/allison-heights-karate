import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Calendar from "./pages/Calendar";
import KarateInfo from "./pages/KarateInfo";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Toasts */}
      <Toaster />
      <Sonner />

      <BrowserRouter>
        {/* Accessible skip link */}
        <a
          href="#main"
          className="absolute left-2 top-2 z-[100] -translate-y-16 focus:translate-y-0 rounded-md bg-[hsl(var(--crimson))] px-3 py-2 text-sm font-semibold text-white transition-transform"
        >
          Skip to content
        </a>

        {/* App shell */}
        <div className="min-h-screen bg-brand-900 text-text-primary">
          {/* If Header is fixed later, we’ll add top padding to <main> */}
          <Header />

          <main id="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/classes" element={<Classes />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/karate-info" element={<KarateInfo />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
