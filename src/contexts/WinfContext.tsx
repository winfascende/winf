

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { 
  User, 
  NotificationState, 
  GamificationAction, 
  WarrantyRegistration, 
  Lead as LeadType, 
  Product, 
  Order, 
  Installation,
  Vehicle, 
  AiGeneration, 
  CoinLedgerEntry, 
  SocialPost, 
  UserModuleProgress, 
  PlatformEvent,
  WinfContextType,
  UserPerformanceMetrics,
  ContentCalendarEvent,
  DocumentItem,
  Transaction,
  Quote,
  StockItem,
  TrainingModule,
  AgentState,
  AgentCommand,
  WhatsAppConfig,
  WhatsAppChat,
  InstallationJob,
  PartnerTask,
  ParadoxAnalysis,
  AgentInsight
} from '../types';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, limit, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { generateResponse } from '../services/aiService';

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = error => reject(error);
  });
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const WinfContext = createContext<WinfContextType | undefined>(undefined);

export const useWinf = () => {
  const context = useContext(WinfContext);
  if (!context) throw new Error('useWinf must be used within a WinfProvider');
  return context;
};

export const WinfProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationState>({ show: false, message: '', points: 0 });
  
  const [leads, setLeads] = useState<LeadType[]>([]);
  const [publicLeads, setPublicLeads] = useState<LeadType[]>([]);
  const [warranties, setWarranties] = useState<WarrantyRegistration[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [aiGenerations, setAiGenerations] = useState<AiGeneration[]>([]);
  const [coinLedger, setCoinLedger] = useState<CoinLedgerEntry[]>([]);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [userModuleProgress, setUserModuleProgress] = useState<UserModuleProgress[]>([]);
  const [platformEvents, setPlatformEvents] = useState<PlatformEvent[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [userPerformanceMetrics, setUserPerformanceMetrics] = useState<UserPerformanceMetrics[]>([]);
  const [contentCalendarEvents, setContentCalendarEvents] = useState<ContentCalendarEvent[]>([]);
  const [documentItems, setDocumentItems] = useState<DocumentItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [stockItems, setStockItems] = useState<any[]>([]);
  const [stockHistory, setStockHistory] = useState<any[]>([]);
  const [trainingModules, setTrainingModules] = useState<any[]>([]);
  const [partnerTasks, setPartnerTasks] = useState<PartnerTask[]>([]);
  const [agentInsights, setAgentInsights] = useState<AgentInsight[]>([]);
  const [favoriteModules, setFavoriteModules] = useState<string[]>(() => {
    const saved = localStorage.getItem('winf_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [recentActivities, setRecentActivities] = useState<{ id: string; type: string; description: string; created_at: string; }[]>([]);

  // Agent State (Neural Bridge)
  const [agentState, setAgentState] = useState<AgentState>({
    status: 'online',
    activeAgents: 3,
    memoryPoints: 1240,
    lastSync: new Date().toISOString(),
    logs: [
      '[SYSTEM] Neural Bridge v2.5 initialized.',
      '[VPS] Connected to Hostinger-Node-01 (Kimi K2.5)',
      '[DOCKER] Container "second-brain-core" is running.',
      '[AGENT] Sub-agent "Researcher-01" started web crawl.',
      '[SYNC] Memory core updated with 124 new context points.'
    ]
  });

  const [paradoxAnalysis, setParadoxAnalysis] = useState<ParadoxAnalysis | null>(null);

  const dispatchAgentCommand = useCallback(async (command: AgentCommand): Promise<{ success: boolean; output: string }> => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] [${command.type}] Executing: ${command.action}...`;
    
    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, logEntry]
    }));

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800));

    let output = `[${timestamp}] [SUCCESS] ${command.action} completed.`;
    
    if (command.type === 'TERMINAL' && command.action.includes('status')) {
      output = `[${timestamp}] [VPS] CPU: 14% | RAM: 1.6GB/4GB | Disk: 45%`;
    }

    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, output],
      memoryPoints: prev.memoryPoints + 5 // Agent learns from every command
    }));

    return { success: true, output };
  }, []);

  // WhatsApp Hub & Lead Distribution State
  const [whatsappConfigs, setWhatsappConfigs] = useState<WhatsAppConfig[]>([
    { id: 'wa-central', city: 'Central (Brasil)', phoneNumber: '+55 13 99919-1510', isCentral: true, status: 'online', agentName: 'Winf Core AI' },
    { id: 'wa-santos', city: 'Santos (Sede)', phoneNumber: '+55 13 99919-1510', isCentral: false, status: 'online', agentName: 'Santos Agent v1' },
    { id: 'wa-pg', city: 'Praia Grande', phoneNumber: '+55 13 99919-1510', isCentral: false, status: 'online', agentName: 'PG Agent v1' },
    { id: 'wa-sorocaba', city: 'Sorocaba', phoneNumber: '+55 15 99999-1111', isCentral: false, status: 'online', agentName: 'Sorocaba Agent v1' },
    { id: 'wa-cg', city: 'Campina Grande', phoneNumber: '+55 83 99999-2222', isCentral: false, status: 'online', agentName: 'CG Agent v1' },
  ]);

  const [activeChats, setActiveChats] = useState<WhatsAppChat[]>([
    { id: 'chat1', customerName: 'Carlos Silva', lastMessage: 'Quero saber sobre PPF em Santos', timestamp: new Date().toISOString(), city: 'Santos', status: 'bot_handling' },
    { id: 'chat2', customerName: 'Mariana Oliveira', lastMessage: 'Olá, sou de SP e vi o anúncio', timestamp: new Date().toISOString(), city: 'São Paulo', status: 'bot_handling' },
  ]);

  const distributeLead = useCallback(async (leadData: any): Promise<{ success: boolean; routedTo: string }> => {
    const timestamp = new Date().toLocaleTimeString();
    const city = leadData.city || 'Desconhecido';
    
    // Add to logs in Neural Bridge too
    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, `[WHATSAPP] Novo lead detectado na Central: ${leadData.name} (${city})`]
    }));

    // Find regional config
    const regionalConfig = whatsappConfigs.find(c => c.city.toLowerCase() === city.toLowerCase() && !c.isCentral);
    const routedTo = regionalConfig ? regionalConfig.city : 'Fila de Espera Central';

    // Simulate routing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newChat: WhatsAppChat = {
      id: `chat-${Date.now()}`,
      customerName: leadData.name,
      lastMessage: `Encaminhado para ${routedTo}`,
      timestamp: new Date().toISOString(),
      city: city,
      status: regionalConfig ? 'routed' : 'waiting'
    };

    setActiveChats(prev => [newChat, ...prev]);

    setAgentState(prev => ({
      ...prev,
      logs: [...prev.logs, `[WHATSAPP] Lead ${leadData.name} distribuído para: ${routedTo}`]
    }));

    return { success: true, routedTo };
  }, [whatsappConfigs]);

  const fetchUserProfile = useCallback(async (id: string): Promise<User | null> => {
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      const profileData = docSnap.data();
      return {
        id: docSnap.id,
        name: profileData.name || profileData.email,
        email: profileData.email,
        role: profileData.role || 'Member',
        avatar: profileData.avatar || '',
        winfCoins: profileData.winfCoins || 0,
        company: profileData.company || '',
        phone: profileData.phone || '',
        cnpj: profileData.cnpj || '',
        address: profileData.address || undefined,
        w_rank_xp: profileData.w_rank_xp || 0,
        w_rank_level: profileData.w_rank_level || 'Initiate',
        arch_clearance: profileData.arch_clearance || {
          invisible: false,
          blackpro: false,
          dualreflect: false
        },
        winf_knowledge: profileData.winf_knowledge || 0,
        cortex_influence: profileData.cortex_influence || 0,
        neural_memory: profileData.neural_memory || 0,
        tactical_assets: profileData.tactical_assets || 0
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null); 
    setIsAuthenticated(false);
  };

  const loginAsPrototype = () => {
    const protoUser: User = {
      id: 'proto-tiago-001',
      name: 'Tiago (Prototype)',
      email: 'tiago@winf.com',
      role: 'Admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      winfCoins: 15000,
      w_rank_xp: 2500,
      w_rank_level: 'Master',
      company: 'WINF CORE™ HQ',
      territory: 'Santos (Master Unit)',
      city: 'Santos',
      technical_level: 'Master',
      is_active: true,
      arch_clearance: {
        invisible: true,
        blackpro: true,
        dualreflect: true,
      },
      winf_knowledge: 95,
      cortex_influence: 88,
      neural_memory: 92,
      tactical_assets: 90
    };
    setUser(protoUser);
    setIsAuthenticated(true);
  };

  const fetchCoinLedger = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'coin_ledger'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setCoinLedger(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'coin_ledger');
    }
  }, [user?.id]);

  const updateUserCoins = async (amount: number, reason: string, xp: number = 0) => {
    if (!user?.id) return;
    try {
      const docRef = doc(db, 'users', user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentCoins = docSnap.data().winfCoins || 0;
        const currentXp = docSnap.data().w_rank_xp || 0;
        await updateDoc(docRef, {
          winfCoins: currentCoins + amount,
          w_rank_xp: currentXp + xp
        });
        
        await addDoc(collection(db, 'coin_ledger'), {
          user_id: user.id,
          amount: amount,
          description: reason,
          action_type: amount > 0 ? 'EARN' : 'SPEND',
          created_at: new Date().toISOString()
        });

        const updatedProfile = await fetchUserProfile(user.id);
        if (updatedProfile) setUser(updatedProfile);
        await fetchCoinLedger();
        setNotification({ show: true, message: amount > 0 ? `Ganhou moedas: ${reason}` : `Gastou moedas: ${reason}`, points: amount });
        setRecentActivities(prev => [{ id: `act-${Date.now()}`, type: 'XP_EARNED', description: reason, created_at: new Date().toISOString() }, ...prev]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const gamify = useCallback((action: GamificationAction, details?: any) => {
    let points = 0; let xp = 0; let message = '';
    switch (action) {
      case 'COMMENT': points = 15; xp = 5; message = 'Você ganhou <strong>WinfCoins</strong> por interagir!'; break;
      case 'POST': points = 20; xp = 10; message = 'Publicação realizada! <strong>+20 WinfCoins</strong>.'; break;
      case 'SHARE': points = 25; xp = 10; message = 'Obrigado por compartilhar!'; break;
      case 'LOGIN': points = 10; xp = 5; message = 'Bônus de acesso diário.'; break;
      case 'AI_GENERATED': points = 30; xp = 15; message = 'Conteúdo IA gerado! <strong>+30 WinfCoins</strong>.'; break; // Added XP for AI_GENERATED
      case 'LEAD_ADDED': points = 40; xp = 20; message = 'Novo lead capturado!'; break;
      case 'WARRANTY_REGISTERED': points = 50; xp = 25; message = 'Garantia registrada. Bom trabalho!'; break;
      case 'COURSE_COMPLETED': points = 60; xp = 30; message = 'Módulo da Academy concluído!'; break;
      case 'ACADEMY_COMPLETED': points = 100; xp = 50; message = 'Curso concluído na Academy! <strong>+100 WinfCoins</strong>.'; break;
      case 'SCHEDULE_POST': points = 25; xp = 10; message = 'Postagem agendada!'; break;
      case 'REDEEM': points = -details?.cost || 0; xp = 0; message = `Resgate de ${details?.item || 'item'} concluído.`; break;
    }
    if (points !== 0 || xp !== 0) updateUserCoins(points, message, xp);
    else if (message) setNotification({ show: true, message, points: 0 });
  }, [user?.id]);

  const closeNotification = useCallback(() => setNotification(prev => ({ ...prev, show: false })), []);

  // Installation Jobs State
  const [installationJobs, setInstallationJobs] = useState<InstallationJob[]>([
    {
      id: 'job-1',
      service_order_id: 'OS-2025-001',
      customer_name: 'Marcos Paulo',
      vehicle_model: 'Porsche 911 Carrera',
      collaborator_id: '1',
      status: 'in_progress',
      measurements: { windshield: '1.2m x 0.8m', sides: '0.9m x 0.5m' },
      media: { photos: [], videos: [] },
      created_at: new Date().toISOString()
    }
  ]);

  const addInstallationJob = useCallback(async (job: any) => {
    const newJob: InstallationJob = {
      id: `job-${Date.now()}`,
      ...job,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setInstallationJobs(prev => [newJob, ...prev]);
    return { success: true, error: null };
  }, []);

  const updateInstallationJob = useCallback(async (id: string, updates: any) => {
    setInstallationJobs(prev => prev.map(job => job.id === id ? { ...job, ...updates } : job));
    return { success: true, error: null };
  }, []);

  const completeJobAndGenerateWarranty = useCallback(async (jobId: string, additionalData?: { vehiclePlate: string }) => {
    const job = installationJobs.find(j => j.id === jobId);
    if (!job) return { success: false, error: 'Job not found' };

    // Generate Warranty ID
    const warrantyId = `W-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    
    // Update Job
    setInstallationJobs(prev => prev.map(j => j.id === jobId ? { 
      ...j, 
      status: 'completed', 
      completed_at: new Date().toISOString(),
      warranty_id: warrantyId,
      vehicle_plate: additionalData?.vehiclePlate
    } : j));

    // Register Warranty in the system
    const newWarranty = {
      id: warrantyId,
      customerName: job.customer_name,
      productLine: job.chosen_film || 'Winf Select',
      serialNumber: job.service_order_id,
      purchaseDate: new Date().toISOString(),
      status: 'Ativa',
      agent_status: 'pending',
      licenciado_id: user?.id,
      vehiclePlate: additionalData?.vehiclePlate
    };
    setWarranties(prev => [newWarranty as any, ...prev]);

    // Gamify
    gamify('WARRANTY_REGISTERED');

    return { success: true, warrantyId, error: null };
  }, [installationJobs, user?.id, gamify]);

  const fetchLeads = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'leads'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadType));
      setLeads(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'leads');
    }
  }, [user?.id]);

  const fetchPublicLeads = useCallback(async () => {
    try {
      const q = query(collection(db, 'leads'), where('user_id', '==', 'system-public-inbox'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LeadType));
      setPublicLeads(data);
    } catch (e) {
      console.error('Error fetching public leads:', e);
    }
  }, []);

  const addLead = useCallback(async (lead: any) => {
    const userId = user?.id || 'system-public-inbox';
    try {
      const docRef = await addDoc(collection(db, 'leads'), { ...lead, user_id: userId, created_at: new Date().toISOString(), agent_status: 'pending' });
      const newLead = { id: docRef.id, ...lead, user_id: userId, agent_status: 'pending' };
      if (user?.id === userId) { setLeads(prev => [newLead as any, ...prev]); gamify('LEAD_ADDED'); }
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify]);

  const updateLead = useCallback(async (id: string, updates: any) => {
    try {
      await updateDoc(doc(db, 'leads', id), updates);
      setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, []);

  const deleteLead = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'leads', id));
      setLeads(prev => prev.filter(l => l.id !== id));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, []);

  const fetchWarranties = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'warranties'), where('licenciado_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const warrantiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setWarranties(warrantiesData ? warrantiesData.map(w => ({ id: w.id, customerName: w.customer_name, customerEmail: w.customer_email, productLine: w.product_line, serialNumber: w.serial_number, purchaseDate: w.installation_date || '', coverage: w.coverage_period || '', status: w.status || '' })) : []);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'warranties');
    }
  }, [user?.id]);

  const fetchWarrantyBySerialNumber = useCallback(async (serialNumber: string) => {
    try {
      const q = query(collection(db, 'warranties'), where('serialNumber', '==', serialNumber), limit(1));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as WarrantyRegistration;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `warranties/${serialNumber}`);
      return null;
    }
  }, []);

  const registerWarranty = useCallback(async (data: any) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    const sn = `SN-${Math.floor(100000 + Math.random() * 900000)}`;
    try {
      await addDoc(collection(db, 'warranties'), { licenciado_id: user.id, customer_name: data.customerName, customer_email: data.customerEmail, product_line: data.productLine, serial_number: sn, installation_date: data.purchaseDate, status: 'Active' });
      await fetchWarranties(); gamify('WARRANTY_REGISTERED');
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify, fetchWarranties]);

  const fetchProducts = useCallback(async () => {
    try {
      const q = query(collection(db, 'products'), where('is_active', '==', true));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  }, [user?.id]);

  const fetchOrders = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'orders'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setOrders(data);
    } catch (e) {
      console.error(e);
    }
  }, [user?.id]);

  const fetchInstallations = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'installations'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setInstallations(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'installations');
    }
  }, [user?.id]);

  const fetchInstallationById = useCallback(async (id: string) => {
    try {
      const docRef = doc(db, 'installations', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Installation;
      }
      return null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, `installations/${id}`);
      return null;
    }
  }, []);

  const registerInstallation = useCallback(async (data: any) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    
    const installationId = `INST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const qrCodeUrl = `https://winf.app/certificate/${installationId}`;
    
    const installationData = {
      ...data,
      id: installationId,
      user_id: user.id,
      installer_id: user.id,
      installer_name: user.name,
      qr_code_url: qrCodeUrl,
      status: 'completed',
      agent_status: 'pending',
      created_at: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'installations', installationId), installationData);
      
      // Also register warranty in Firestore
      const warrantyId = `W-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      await addDoc(collection(db, 'warranties'), {
        licenciado_id: user.id,
        customer_name: data.client_name,
        customer_email: data.client_email,
        product_line: data.product_name,
        serial_number: installationId,
        installation_date: data.date,
        status: 'Active',
        created_at: new Date().toISOString()
      });

      setInstallations(prev => [installationData, ...prev]);
      await fetchWarranties();
      gamify('INSTALLATION_REGISTERED');
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify, fetchWarranties]);

  const createOrder = useCallback(async (items: any[], shippingAddress: any, paymentMethod: string) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    const total = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    try {
      const docRef = await addDoc(collection(db, 'orders'), { 
        user_id: user.id, 
        total_amount: total, 
        status: 'completed', 
        created_at: new Date().toISOString(),
        shipping_address: shippingAddress,
        payment_method: paymentMethod
      });
      const orderItems = items.map(i => ({ order_id: docRef.id, product_id: i.product_id, quantity: i.quantity, unit_price: i.unit_price }));
      for (const item of orderItems) {
        await addDoc(collection(db, 'order_items'), item);
      }
      
      // Automatically add to stock for members
      for (const item of items) {
          const product = products.find(p => p.id === item.product_id);
          if (product) {
              await addStockItem({
                  product_id: product.id,
                  product_name: product.name,
                  total_meters: 30 * item.quantity, 
                  width: 1.52,
                  remaining_meters: 30 * item.quantity
              });
          }
      }
      
      await fetchOrders();
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, fetchOrders, products]);

  const addStockItem = useCallback(async (item: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    try {
      const docRef = await addDoc(collection(db, 'stock_items'), { ...item, user_id: user.id });
      setStockItems(prev => [{ id: docRef.id, ...item, user_id: user.id }, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);
  const fetchAiGenerations = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'ai_generations'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setAiGenerations(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'ai_generations');
    }
  }, [user?.id]);

  const saveAiGeneration = useCallback(async (gen: any) => {
    if (!user?.id) return { success: false, error: "Auth required" };
    try {
      const docRef = await addDoc(collection(db, 'ai_generations'), { ...gen, user_id: user.id });
      setAiGenerations(prev => [{ id: docRef.id, ...gen, user_id: user.id }, ...prev]);
      gamify('AI_GENERATED');
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, gamify]);

  const fetchSocialPosts = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'social_posts'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setSocialPosts(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'social_posts');
    }
  }, [user?.id]);

  const fetchVehicles = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'vehicles'), where('owner_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setVehicles(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'vehicles');
    }
  }, [user?.id]);

  const fetchPlatformEvents = useCallback(async () => {
    if (!user?.id) return; 
    try {
      const querySnapshot = await getDocs(collection(db, 'platform_events'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setPlatformEvents(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'platform_events');
    }
  }, [user?.id]);

  const fetchMembers = useCallback(async () => {
    if (user?.role !== 'Admin') return;
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setMembers(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'users');
    }
  }, [user?.role]);

  const updateUserRole = async (userId: string, newRole: string) => {
    if (user?.role !== 'Admin') return;
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      setMembers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole as any } : u));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `users/${userId}`);
    }
  };
  const fetchDocumentItems = useCallback(async () => {
    if (!user?.id) return;
    try {
      const querySnapshot = await getDocs(collection(db, 'documents_master'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setDocumentItems(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'documents_master');
    }
  }, [user?.id]);

  const fetchTotalLeads = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'leads'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      setTotalLeads(querySnapshot.size);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'leads/count');
    }
  }, [user?.id]);

  const fetchTransactions = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'transactions'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setTransactions(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'transactions');
    }
  }, [user?.id]);

  const addTransaction = useCallback(async (tx: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    try {
      const docRef = await addDoc(collection(db, 'transactions'), { ...tx, user_id: user.id });
      setTransactions(prev => [{ id: docRef.id, ...tx, user_id: user.id }, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const fetchQuotes = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'quotes'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setQuotes(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'quotes');
    }
  }, [user?.id]);

  const addQuote = useCallback(async (quote: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    try {
      const docRef = await addDoc(collection(db, 'quotes'), { ...quote, user_id: user.id, status: 'Pending', createdAt: new Date().toISOString() });
      setQuotes(prev => [{ id: docRef.id, ...quote, user_id: user.id, status: 'Pending', createdAt: new Date().toISOString() }, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const approveQuote = useCallback(async (quoteId: string, scheduledDate?: string) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return { success: false, error: 'Quote not found' };

    // 1. Update Quote Status
    await updateQuote(quoteId, { status: 'Approved' });

    // 2. Create Order
    const orderId = `ORD-${Date.now()}`;
    await createOrder(quote.items, {}, 'Pending'); // Simplified order creation

    // 3. Create Installation Job (OS)
    const osId = `OS-${Math.floor(Math.random() * 9000) + 1000}`;
    await addInstallationJob({
      service_order_id: osId,
      customer_name: quote.customerName,
      customer_whatsapp: quote.customerWhatsApp,
      customer_address: quote.customerAddress,
      customer_city: quote.customerCity,
      vehicle_model: quote.vehicleModel || 'Architecture',
      chosen_film: quote.items[0]?.description || 'Winf Film',
      total_amount: quote.totalAmount,
      payment_method: quote.paymentMethod as any,
      status: 'pending',
      scheduled_date: scheduledDate || new Date(Date.now() + 86400000).toISOString(),
      measurements: { architecture: quote.measurements }
    });

    gamify('SALE_CLOSED' as any);
    return { success: true, error: null };
  }, [quotes, user?.id, gamify]);

  const updateQuote = useCallback(async (id: string, updates: any) => {
    try {
      await updateDoc(doc(db, 'quotes', id), updates);
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const fetchStockItems = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'stock_items'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setStockItems(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'stock_items');
    }
  }, [user?.id]);

  const updateStock = useCallback(async (id: string, metersUsed: number) => {
    if (!user?.id) return { success: false, error: "Auth" };
    try {
      const docRef = doc(db, 'stock_items', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return { success: false, error: "Item not found" };
      const current = docSnap.data();
      const newRemaining = Math.max(0, (current.remaining_meters || 0) - metersUsed);
      await updateDoc(docRef, { remaining_meters: newRemaining });
      await fetchStockItems();
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id, fetchStockItems, stockItems]);

  const fetchTrainingModules = useCallback(async () => {
    // Mock training data
    setTrainingModules([
      { id: 'tm1', title: 'A Ciência da Rejeição IR', description: 'Entenda como as películas Winf bloqueiam o calor sem escurecer o ambiente.', type: 'video', category: 'Technical', url: 'https://example.com/video1', duration: '12:45', xp_reward: 100, coins_reward: 50 },
      { id: 'tm2', title: 'Argumentação de Elite: Arquitetura', description: 'Como abordar arquitetos e fechar projetos de alto ticket.', type: 'audio', category: 'Sales', url: 'https://example.com/audio1', duration: '08:20', xp_reward: 80, coins_reward: 40 },
      { id: 'tm3', title: 'Gestão de Estoque e Winf Precision', description: 'Maximizando o lucro através do aproveitamento inteligente de material.', type: 'video', category: 'Management', url: 'https://example.com/video2', duration: '15:10', xp_reward: 120, coins_reward: 60 },
      { id: 'tm4', title: 'Instalação em Grandes Formatos', description: 'Técnicas avançadas para vidros de fachadas e coberturas.', type: 'video', category: 'Technical', url: 'https://example.com/video3', duration: '20:00', xp_reward: 150, coins_reward: 75 },
    ]);
  }, []);

  const fetchPartnerTasks = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'partner_tasks'), where('user_id', '==', user.id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PartnerTask));
      setPartnerTasks(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'partner_tasks');
    }
  }, [user?.id]);

  const fetchAgentInsights = useCallback(async () => {
    if (!user?.id) return;
    try {
      const q = query(collection(db, 'agent_insights'), where('user_id', '==', user.id), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AgentInsight));
      setAgentInsights(data);
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'agent_insights');
    }
  }, [user?.id]);

  const markInsightAsRead = useCallback(async (id: string) => {
    if (!user?.id) return { success: true, error: null };
    try {
      await updateDoc(doc(db, 'agent_insights', id), { is_read: true });
      setAgentInsights(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
      return { success: true, error: null };
    } catch (e: any) {
      handleFirestoreError(e, OperationType.UPDATE, `agent_insights/${id}`);
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const addPartnerTask = useCallback(async (task: any) => {
    if (!user?.id) return { success: false, error: "Auth" };
    try {
      const docRef = await addDoc(collection(db, 'partner_tasks'), { ...task, user_id: user.id });
      setPartnerTasks(prev => [{ id: docRef.id, ...task, user_id: user.id } as PartnerTask, ...prev]);
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const updatePartnerTask = useCallback(async (id: string, updates: any) => {
    try {
      await updateDoc(doc(db, 'partner_tasks', id), updates);
      setPartnerTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } as PartnerTask : t));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const deletePartnerTask = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'partner_tasks', id));
      setPartnerTasks(prev => prev.filter(t => t.id !== id));
      return { success: true, error: null };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }, [user?.id]);

  const toggleFavoriteModule = useCallback((moduleId: string) => {
    setFavoriteModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  }, []);

  const fetchClaudeInsight = useCallback(async (prompt: string, context?: string): Promise<string> => {
    try {
      const systemPrompt = `Você é o Cérebro Central WINF™ baseado em Claude AI. 
      Sua missão é orquestrar o crescimento de licenciados de alta performance.
      Contexto adicional: ${context || 'Nenhum'}`;
      
      const response = await generateResponse(prompt, 'claude', systemPrompt);
      return response;
    } catch (error) {
      console.error('Claude Insight Error:', error);
      return 'Erro na conexão neural com o Cérebro Central.';
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('winf_favorites', JSON.stringify(favoriteModules));
  }, [favoriteModules]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid);
        if (profile) {
          setUser(profile);
          setIsAuthenticated(true);
        } else {
          // Create basic profile if not exists
          const newProfile: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email || 'User',
            email: firebaseUser.email || '',
            role: 'Licenciado',
            avatar: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            winfCoins: 0,
            w_rank_xp: 0,
            w_rank_level: 'Initiate',
            arch_clearance: {
              invisible: false,
              blackpro: false,
              dualreflect: false
            },
            winf_knowledge: 0,
            cortex_influence: 0,
            neural_memory: 0,
            tactical_assets: 0
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newProfile);
          setUser(newProfile);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [fetchUserProfile]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const loadData = async () => {
      if (isAuthenticated && user) {
        setIsLoading(true);
        await Promise.all([
          fetchLeads(), fetchWarranties(), fetchOrders(), fetchInstallations(), fetchAiGenerations(),
          fetchPlatformEvents(), fetchDocumentItems(),
          fetchTotalLeads(), fetchTransactions(), fetchQuotes(),
          fetchStockItems(), fetchTrainingModules(), fetchPartnerTasks(), fetchAgentInsights()
        ]);
        setIsLoading(false);
      }
    };
    loadData();
  }, [isAuthenticated, user, fetchLeads, fetchWarranties, fetchOrders, fetchInstallations, fetchAiGenerations, fetchPlatformEvents, fetchDocumentItems, fetchTotalLeads, fetchTransactions, fetchQuotes, fetchStockItems, fetchTrainingModules, fetchPartnerTasks]);

  const contextValue: WinfContextType = {
    user, isAuthenticated, isLoading, notification, leads, warranties, products, orders, installations, aiGenerations, coinLedger, socialPosts, vehicles,
    userModuleProgress, platformEvents, members, userPerformanceMetrics, contentCalendarEvents, documentItems, transactions, quotes,
    stockItems, stockHistory, trainingModules, partnerTasks,
    totalLeads, totalMembers, totalOrders, recentActivities,
    login, logout, loginAsPrototype, updateUserCoins, gamify, closeNotification,
    uploadFileToStorage: async () => ({ url: null, error: 'Not implemented' }),
    fetchLeads, fetchPublicLeads, addLead, updateLead, deleteLead,
    publicLeads,
    fetchWarranties, registerWarranty, fetchProducts, fetchOrders, createOrder,
    fetchInstallations, registerInstallation,
    fetchAiGenerations, saveAiGeneration, fetchSocialPosts, 
    addSocialPost: async () => ({ success: true, error: null }),
    updateSocialPost: async () => ({ success: true, error: null }),
    deleteSocialPost: async () => ({ success: true, error: null }),
    fetchVehicles, addVehicle: async () => ({ success: true, error: null }),
    updateVehicle: async () => ({ success: true, error: null }),
    deleteVehicle: async () => ({ success: true, error: null }),
    fetchUserModuleProgress: async () => {},
    updateUserModuleProgress: async () => ({ success: true, error: null }),
    fetchPlatformEvents, 
    fetchMembers,
    updateUserRole,
    deleteProfile: async () => ({ success: true, error: null }),
    fetchDocumentItems, 
    fetchCoinLedger, fetchTransactions, addTransaction,
    fetchQuotes, addQuote, approveQuote,
    fetchStockItems, updateStock, addStockItem, fetchTrainingModules,
    fetchPartnerTasks, addPartnerTask, updatePartnerTask, deletePartnerTask,
    agentInsights, fetchAgentInsights, markInsightAsRead,
    fetchClaudeInsight,
    fetchTotalLeads, fetchTotalMembers: async () => {}, fetchTotalOrders: async () => {}, fetchRecentActivities: async () => {},
    fetchInstallationById, fetchWarrantyBySerialNumber,
    fetchUserPerformanceMetrics: async () => {}, fetchContentCalendarEvents: async () => {}, addContentCalendarEvent: async () => ({ success: true, error: null }),
    agentState,
    dispatchAgentCommand,
    paradoxAnalysis,
    setParadoxAnalysis,
    whatsappConfigs,
    distributeLead,
    activeChats,
    installationJobs,
    addInstallationJob,
    updateInstallationJob,
    completeJobAndGenerateWarranty,
    favoriteModules,
    toggleFavoriteModule
  };

  return <WinfContext.Provider value={contextValue}>{children}</WinfContext.Provider>;
};
