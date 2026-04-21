import React, { useState, useEffect, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import InstitutionalSite from './components/InstitutionalSite';
import AboutUs from './components/AboutUs';
import { PublicPortal } from './components/PublicPortal';

const DashboardWinf = lazy(() => import('./components/DashboardWinf'));
const DashboardWinfCoin = lazy(() => import('./components/DashboardWinfCoin'));
const SalesFunnel = lazy(() => import('./components/SalesFunnel'));
const WarrantySystem = lazy(() => import('./components/WarrantySystem'));
const ModulesList = lazy(() => import('./components/ModulesList'));
const ModuleEcoTech = lazy(() => import('./components/ModuleEcoTech'));
const ModuleFaceCar = lazy(() => import('./components/ModuleFaceCar'));
const ModuleGridInstagram = lazy(() => import('./components/ModuleGridInstagram'));
const ModuleCrossPlatform = lazy(() => import('./components/ModuleCrossPlatform'));
const ModuleNeuroMesh = lazy(() => import('./components/ModuleNeuroMesh'));
const ModuleCaptureSystem = lazy(() => import('./components/ModuleCaptureSystem'));
const ModuleMemberManagement = lazy(() => import('./components/ModuleMemberManagement'));
const ModuleSpotify = lazy(() => import('./components/ModuleSpotify'));
const ModuleUniversoDark = lazy(() => import('./components/ModuleUniversoDark'));
const ModuleWarp = lazy(() => import('./components/ModuleWarp'));
const ModuleConcierge = lazy(() => import('./components/ModuleConcierge'));
const ModuleDataCore = lazy(() => import('./components/ModuleDataCore'));
const ModuleAcademy = lazy(() => import('./components/ModuleAcademy'));
const ModulePriceTable = lazy(() => import('./components/ModulePriceTable'));
const ModuleQuotes = lazy(() => import('./components/ModuleQuotes'));
const ModuleArsenal = lazy(() => import('./components/ModuleArsenal'));
const ModuleWinfPrecision = lazy(() => import('./components/ModuleWinfPrecision'));
const ModuleStock = lazy(() => import('./components/ModuleStock'));
const ModuleTheBoard = lazy(() => import('./components/ModuleTheBoard'));
const ModuleConnect = lazy(() => import('./components/ModuleConnect'));
const ModuleConsultancyLink = lazy(() => import('./components/ModuleConsultancyLink'));
const ModuleFAQ = lazy(() => import('./components/ModuleFAQ'));
const ModuleProducts = lazy(() => import('./components/ModuleProducts'));
const ModuleBlackshop = lazy(() => import('./components/ModuleBlackshop'));
const ModuleBlackshopAdmin = lazy(() => import('./components/ModuleBlackshopAdmin'));
const ModuleInstallations = lazy(() => import('./components/ModuleInstallations'));
const ModuleWarranties = lazy(() => import('./components/ModuleWarranties'));
const CertificateViewer = lazy(() => import('./components/CertificateViewer'));
const ProductsCatalog = lazy(() => import('./components/ProductsCatalog'));
const ModuleCoreAI = lazy(() => import('./components/ModuleCoreAI'));
const ModuleWinfBrain = lazy(() => import('./components/ModuleWinfBrain'));
const ModuleMarketingAI = lazy(() => import('./components/ModuleMarketingAI'));
const ModuleWinfWorld = lazy(() => import('./components/ModuleWinfWorld'));
const ModuleControlRoom = lazy(() => import('./components/ModuleControlRoom'));
const PublicConsultancy = lazy(() => import('./components/PublicConsultancy'));
const MemberOnePage = lazy(() => import('./components/MemberOnePage')); 
const CityOnePage = lazy(() => import('./components/CityOnePage')); 
const LandingParceria = lazy(() => import('./components/LandingParceria'));
const LandingLicenciamento = lazy(() => import('./components/LandingLicenciamento'));
const LandingKiosk = lazy(() => import('./components/LandingKiosk'));
const LandingStudio = lazy(() => import('./components/LandingStudio'));
const LandingAerocore = lazy(() => import('./components/LandingAerocore'));
const LandingUniversoDark = lazy(() => import('./components/LandingUniversoDark'));
const LandingWinfSelectElite = lazy(() => import('./components/LandingWinfSelectElite'));
const ArchitectRegistration = lazy(() => import('./components/ArchitectRegistration'));
const AccessForm = lazy(() => import('./components/AccessForm'));
const ModuleFinancial = lazy(() => import('./components/ModuleFinancial'));
const ModuleMissionControl = lazy(() => import('./components/ModuleMissionControl'));
const ModuleTasks = lazy(() => import('./components/ModuleTasks'));
const ModuleWhatsAppHub = lazy(() => import('./components/ModuleWhatsAppHub'));
const ModuleNeuralBridge = lazy(() => import('./components/ModuleNeuralBridge'));
const ModuleIntegrations = lazy(() => import('./components/ModuleIntegrations'));
const ModuleNeuroParadox = lazy(() => import('./components/ModuleNeuroParadox'));
const ModuleNeuralFlow = lazy(() => import('./components/ModuleNeuralFlow'));
const ModuleSquadPerformance = lazy(() => import('./components/ModuleSquadPerformance'));
const ModuleArchitecturalPro = lazy(() => import('./components/ModuleArchitecturalPro'));
const ModuleEscape3D = lazy(() => import('./components/ModuleEscape3D'));
const ModuleBiometricInvite = lazy(() => import('./components/ModuleBiometricInvite'));
const ModuleKioskMode = lazy(() => import('./components/ModuleKioskMode'));
const DashboardWRank = lazy(() => import('./components/DashboardWRank'));
const GlobalSearch = lazy(() => import('./components/GlobalSearch'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const ModuleMolecularTwin = lazy(() => import('./components/ModuleMolecularTwin'));


import { ViewState, ChartDataPoint } from './types';
import { useWinf } from './contexts/WinfContext';
import { logPageView } from './lib/analytics';
import { PRODUCT_CATALOG } from './data/productCatalogData';

const LandingProductLayout = lazy(() => import('./components/LandingProductLayout'));

const CHART_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 4000, secondary: 2400 },
  { name: 'Fev', value: 3000, secondary: 1398 },
  { name: 'Mar', value: 2000, secondary: 9800 },
  { name: 'Abr', value: 2780, secondary: 3908 },
  { name: 'Mai', value: 1890, secondary: 4800 },
  { name: 'Jun', value: 2390, secondary: 3800 },
  { name: 'Jul', value: 3490, secondary: 4300 },
];

const DEMO_MODE = process.env.DEMO_MODE === 'true';

const App: React.FC = () => {
  const { user, isAuthenticated, logout, notification, closeNotification, gamify, updateUserCoins, loginAsPrototype } = useWinf();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD_WINF);
  const [previousView, setPreviousView] = useState<ViewState>(ViewState.DASHBOARD_WINF);
  const [selectedInstallationId, setSelectedInstallationId] = useState<string | undefined>();
  const [currentMarketingView, setCurrentMarketingView] = useState<ViewState | null>(DEMO_MODE ? null : ViewState.LANDING_PAGE);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('Santos');
  const [consultancyTerritory, setConsultancyTerritory] = useState<string>('Santos (Piloto)');

  const handleNavigate = (view: ViewState) => {
    if (view !== ViewState.SEARCH) {
      setPreviousView(currentView);
    }
    setCurrentView(view);
  };

  useEffect(() => {
    // Handle public certificate route
    const path = window.location.pathname;
    if (path.startsWith('/certificate/')) {
      const id = path.split('/').pop();
      if (id) {
        setSelectedInstallationId(id);
        setCurrentView(ViewState.CERTIFICATE_VIEWER);
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      logPageView(currentView);
    } else if (currentMarketingView) {
      logPageView(currentMarketingView);
    } else { 
      logPageView(ViewState.LOGIN);
    }
  }, [currentView, isAuthenticated, currentMarketingView]);

  const handleRedeem = (cost: number, item: string) => {
    if (user && user.winfCoins >= cost) {
       updateUserCoins(-cost, `Resgate: ${item}`, 0);
    } else {
       alert("Saldo insuficiente");
    }
  };

  const handleEnterApp = () => {
    setCurrentMarketingView(ViewState.LOGIN);
  };

  const handleNavigateToMarketingPage = (view: ViewState) => {
    setCurrentMarketingView(view);
  };

  const renderContent = () => {
    if (!user && isAuthenticated) {
      return (
        <div className="min-h-screen bg-winf-background flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ); 
    }
    
    switch (currentView) {
      case ViewState.INSTITUTIONAL_SITE:
        return <InstitutionalSite territory={user?.territory || 'Santos'} onBack={() => handleNavigate(ViewState.MODULE_ARSENAL)} onNavigateToAccess={(view) => handleNavigate(view || ViewState.PROFILE)} onNavigateToCatalog={() => handleNavigate(ViewState.PRODUCTS_CATALOG)} />;
      case ViewState.ABOUT_US:
        return <AboutUs onBack={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.PUBLIC_CONSULTANCY:
        return <PublicConsultancy 
          partnerName={user?.name} 
          partnerPhone={user?.phone} 
          territory={consultancyTerritory}
          onBack={() => handleNavigate(ViewState.MODULE_CONSULTANCY_LINK)} 
          onAccessSystem={() => handleNavigate(ViewState.DASHBOARD_WINF)} 
        />;
      case ViewState.MODULE_CONSULTANCY_LINK:
        return <ModuleConsultancyLink 
          user={user} 
          onBack={() => handleNavigate(ViewState.MODULES)} 
          onOpenConsultancy={(territory) => {
            setConsultancyTerritory(territory);
            handleNavigate(ViewState.PUBLIC_CONSULTANCY);
          }} 
        />;
      case ViewState.MODULE_WINF_CUT:
        return <ModuleWinfPrecision onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_STOCK:
        return <ModuleStock onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_THE_BOARD:
        return <ModuleTheBoard onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_FINANCIAL:
        return <ModuleFinancial onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_MISSION_CONTROL:
        return <ModuleMissionControl onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_TASKS:
        return <ModuleTasks onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_WHATSAPP_HUB:
        return <ModuleWhatsAppHub onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_INTEGRATIONS:
        return <ModuleIntegrations />;
      case ViewState.MODULE_NEURAL_BRIDGE:
        return <ModuleNeuralBridge onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_NEURO_PARADOX:
        return <ModuleNeuroParadox onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_NEURAL_FLOW:
        return <ModuleNeuralFlow onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_SQUAD_PERFORMANCE:
        return <ModuleSquadPerformance onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_ARCHITECTURAL:
        return <ModuleArchitecturalPro onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_ESCAPE_3D:
        return <ModuleEscape3D onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_BIOMETRIC:
        return <ModuleBiometricInvite onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_KIOSK_MODE:
        return <ModuleKioskMode onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_ACADEMY:
        return <ModuleAcademy onNavigate={handleNavigate} />;
      case ViewState.MODULE_CONNECT:
        return <ModuleConnect onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.DASHBOARD_WINF:
        return <DashboardWinf data={CHART_DATA} user={user!} onChangeView={handleNavigate} />;
      // Fix: Add W_RANK case
      case ViewState.W_RANK:
        return <DashboardWRank />;
      case ViewState.MODULE_ARSENAL:
        return <ModuleArsenal onBack={() => handleNavigate(ViewState.MODULES)} onNavigate={handleNavigate} />;
      case ViewState.SALES_FUNNEL:
        return <SalesFunnel user={user!} />;
      case ViewState.WARRANTY:
        return <WarrantySystem />;
      case ViewState.MODULE_CAPTURE:
        return <ModuleCaptureSystem onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_NEUROMESH:
        return <ModuleNeuroMesh onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULES:
        return <ModulesList onNavigate={handleNavigate} userRole={user?.role} />;
      case ViewState.PROFILE:
        return <MemberOnePage user={user!} onBack={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.CITY_ONE_PAGE:
        return <CityOnePage city={selectedCity} partnerName={user?.name} partnerAvatar={user?.avatar} onBack={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.DASHBOARD_WINFCOIN:
        return <DashboardWinfCoin user={user!} onRedeem={handleRedeem} />;
      case ViewState.MODULE_DATA_CORE:
        return <ModuleDataCore onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_QUOTES:
        return <ModuleQuotes onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_PRICE_TABLE:
        return <ModulePriceTable onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_FAQ:
        return <ModuleFAQ onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.MODULE_BLACKSHOP_ADMIN:
        return <ModuleBlackshopAdmin />;
      case ViewState.MODULE_BLACKSHOP:
        return <ModuleBlackshop />;
      case ViewState.MODULE_PRODUCTS:
        return <ModuleProducts />;
      case ViewState.MODULE_INSTALLATIONS:
        return <ModuleInstallations />;
      case ViewState.MODULE_WARRANTIES:
        return <ModuleWarranties />;
      case ViewState.MODULE_CORE_AI:
        return <ModuleCoreAI />;
      case ViewState.MODULE_WINF_BRAIN:
        return <ModuleWinfBrain />;
      case ViewState.MODULE_WINF_WORLD:
        return <ModuleWinfWorld />;
      case ViewState.MODULE_MARKETING_AI:
        return <ModuleMarketingAI />;
      case ViewState.MODULE_CONTROL_ROOM:
        return <ModuleControlRoom />;
      case ViewState.PUBLIC_PORTAL:
        return <PublicPortal onBack={() => handleNavigate(ViewState.MODULE_ARSENAL)} onNavigateToLogin={() => handleNavigate(ViewState.PROFILE)} onNavigateToCatalog={() => handleNavigate(ViewState.PRODUCTS_CATALOG)} />;
      case ViewState.CERTIFICATE_VIEWER:
        return <CertificateViewer id={selectedInstallationId} />;
      case ViewState.PRODUCTS_CATALOG:
        return <ProductsCatalog onBack={() => handleNavigate(ViewState.MODULES)} />;
      case ViewState.SEARCH:
        return <GlobalSearch onClose={() => setCurrentView(previousView)} onNavigate={handleNavigate} />;
      case ViewState.ADMIN_PANEL:
        return <AdminPanel onBack={() => handleNavigate(ViewState.DASHBOARD_WINF)} />;
      case ViewState.MODULE_MOLECULAR_TWIN:
        return <ModuleMolecularTwin onBack={() => handleNavigate(ViewState.MODULES)} />;
      default:
        return <DashboardWinf data={CHART_DATA} user={user!} onChangeView={handleNavigate} />;
    }
  };

  if (currentView === ViewState.CERTIFICATE_VIEWER) {
    return <CertificateViewer id={selectedInstallationId} />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-winf-background flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        {currentMarketingView === ViewState.LOGIN && <Login />}
        {currentMarketingView === ViewState.LANDING_PARCERIA && <LandingParceria onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} />}
        {currentMarketingView === ViewState.LANDING_PARCERIA_SELECT && (
          <LandingParceria 
            planType="select" 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} 
            onActivate={loginAsPrototype}
          />
        )}
        {currentMarketingView === ViewState.LANDING_PARCERIA_ELITE && (
          <LandingParceria 
            planType="elite" 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} 
            onActivate={loginAsPrototype}
          />
        )}
        {currentMarketingView === ViewState.LANDING_PARCERIA_ADVANCED && (
          <LandingParceria 
            planType="advanced" 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} 
            onActivate={loginAsPrototype}
          />
        )}
        {currentMarketingView === ViewState.LANDING_PARCERIA_ENTERPRISE && (
          <LandingParceria 
            planType="enterprise" 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} 
            onActivate={loginAsPrototype}
          />
        )}
        {currentMarketingView === ViewState.LANDING_LICENCIAMENTO && (
          <LandingLicenciamento 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} 
            onNavigateToStudio={() => setCurrentMarketingView(ViewState.LANDING_STUDIO)} 
            onNavigateToKiosk={() => setCurrentMarketingView(ViewState.LANDING_KIOSK)} 
            onActivate={() => setCurrentMarketingView(ViewState.ACCESS_FORM)}
          />
        )}
        {currentMarketingView === ViewState.LANDING_KIOSK && (
          <LandingKiosk 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_LICENCIAMENTO)} 
            onActivate={() => setCurrentMarketingView(ViewState.ACCESS_FORM)}
          />
        )}
        {currentMarketingView === ViewState.LANDING_STUDIO && (
          <LandingStudio 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_LICENCIAMENTO)} 
            onActivate={() => setCurrentMarketingView(ViewState.ACCESS_FORM)}
          />
        )}
        {currentMarketingView === ViewState.LANDING_AEROCORE && <LandingAerocore onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} />}
        {currentMarketingView === ViewState.LANDING_WINF_SELECT_ELITE && <LandingWinfSelectElite onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} onAddToCart={() => window.alert('Winf Select™ IR-99 (Elite) adicionado ao carrinho com sucesso!')} />}
        {currentMarketingView === ViewState.LANDING_UNIVERSO_DARK && <LandingUniversoDark onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} />}
        {currentMarketingView === ViewState.ACCESS_FORM && <AccessForm onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} />}
        {currentMarketingView === ViewState.ARCHITECT_REGISTRATION && <ArchitectRegistration onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} />}
        {currentMarketingView === ViewState.INSTITUTIONAL_SITE && <InstitutionalSite onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} onNavigateToAccess={(view) => setCurrentMarketingView(view || ViewState.ACCESS_FORM)} onNavigateToCatalog={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)} onSelectProduct={(id) => { setSelectedProductId(id); setCurrentMarketingView(ViewState.PRODUCT_LANDING); }} />}
        {currentMarketingView === ViewState.ABOUT_US && <AboutUs onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} />}
        {currentMarketingView === ViewState.PUBLIC_CONSULTANCY && <PublicConsultancy onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} onAccessSystem={() => setCurrentMarketingView(ViewState.LOGIN)} />}
        {currentMarketingView === ViewState.PUBLIC_PORTAL && (
          <PublicPortal 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} 
            onNavigateToLogin={() => setCurrentMarketingView(ViewState.LOGIN)}
            onNavigateToCatalog={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)}
          />
        )}
        {currentMarketingView === ViewState.PRODUCTS_CATALOG && (
          <ProductsCatalog 
            onBack={() => setCurrentMarketingView(ViewState.LANDING_PAGE)} 
            onSelectProduct={(id) => {
              setSelectedProductId(id);
              setCurrentMarketingView(ViewState.PRODUCT_LANDING);
            }}
          />
        )}
        {currentMarketingView === ViewState.PRODUCT_LANDING && selectedProductId && (
          <LandingProductLayout 
            product={PRODUCT_CATALOG.find(p => p.id === selectedProductId)!}
            onBack={() => setCurrentMarketingView(ViewState.PRODUCTS_CATALOG)}
          />
        )}
        {!currentMarketingView || currentMarketingView === ViewState.LANDING_PAGE ? <LandingPage onEnter={handleEnterApp} onNavigateToMarketingPage={handleNavigateToMarketingPage} /> : null}
      </Suspense>
    );
  }

  // Se estiver em modo Kiosk ou Site Institucional (quando logado), remove o Layout para ser Fullscreen
  if (currentView === ViewState.MODULE_KIOSK_MODE || currentView === ViewState.INSTITUTIONAL_SITE || currentView === ViewState.PUBLIC_CONSULTANCY || currentView === ViewState.PUBLIC_PORTAL) {
      return (
        <Suspense fallback={
          <div className="min-h-screen bg-winf-background flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <div className="bg-black min-h-screen text-white">
              {renderContent()}
          </div>
        </Suspense>
      );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-winf-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-winf-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <Layout 
        currentView={currentView}
        onChangeView={handleNavigate}
        user={user}
        onLogout={logout}
        notification={notification}
        onCloseNotification={closeNotification}
      >
        {renderContent()}
      </Layout>
    </Suspense>
  );
};

export default App;
