import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import { UserProfile } from '../types/auth';
import Toast from 'react-native-toast-message';

interface AuthContextData {
  user: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nome: string, tipo_deficiencia?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  loginWithSocial: (userProfile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrCreateProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (data) return data;
    if (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
    const { data: userData } = await supabase.auth.getUser();
    const authUser = userData?.user;
    if (!authUser) return null;

    const novoPerfil: UserProfile = {
      id: authUser.id,
      email: authUser.email || '',
      nome: authUser.user_metadata?.full_name || 'Usuário',
      foto_url: authUser.user_metadata?.picture || null,
      tipo_deficiencia: null,
      reputacao: 0,
      data_criacao: new Date().toISOString(),
    };
    const { error: insertError } = await supabase.from('usuario').insert([novoPerfil]);
    if (insertError) {
      console.error('Erro ao criar perfil:', insertError);
      return null;
    }
    return novoPerfil;
  };
  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const perfil = await fetchOrCreateProfile(session.user.id);
          if (perfil) setUser(perfil);
        }
      } catch (error) {
        console.error('Erro ao carregar sessão:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const perfil = await fetchOrCreateProfile(session.user.id);
        if (perfil) setUser(perfil);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, []);
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error('Usuário não encontrado');
      const perfil = await fetchOrCreateProfile(data.user.id);
      if (!perfil) throw new Error('Perfil não carregado');
      setUser(perfil);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async (email: string, password: string, nome: string, tipo_deficiencia?: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: nome } },
      });
      if (error) throw error;
      if (!data.user) throw new Error('Erro ao criar usuário');
      const novoPerfil: UserProfile = {
        id: data.user.id,
        email: data.user.email!,
        nome,
        tipo_deficiencia: tipo_deficiencia || null,
        foto_url: null,
        reputacao: 0,
        data_criacao: new Date().toISOString(),
      };
      const { error: insertError } = await supabase.from('usuario').insert([novoPerfil]);
      if (insertError) throw insertError;

      await signIn(email, password);
    } catch (error: unknown) {
      throw new Error(error instanceof Error ? error.message : 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    Toast.show({ type: 'info', text1: 'Até logo!' });
  };
  const updateUser = async (data: Partial<UserProfile>) => {
    if (!user) return;
    await supabase.from('usuario').update(data).eq('id', user.id);
    setUser(prev => ({ ...prev!, ...data }));
  };
  const loginWithSocial = (userProfile: UserProfile) => setUser(userProfile);
  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateUser, loginWithSocial }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};