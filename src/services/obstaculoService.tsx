import { supabase } from './supabaseClient';
import { fazerUploadFoto } from './fotoService';
import { DadosObstaculo } from '../types/obstacle';


export const criarObstaculo = async (dados: DadosObstaculo) => {
  try {
    const urls: string[] = [];

    for (const fotoUri of dados.fotos) {
      const url = await fazerUploadFoto(fotoUri);
      if (url) {
        urls.push(url);
      }
    }

    const { data, error } = await supabase
      .from('obstaculos') 
      .insert([
        { 
         profile_id: dados.profile_id,
         categoria: dados.categoria,
         latitude: dados.latitude,
         longitude: dados.longitude,
         descricao: dados.descricao,
         gravidade: dados.gravidade,
         fotos_urls: urls, 
        },
      ])
      .select();

    if (error) throw error;

    return { sucesso: true, data };

  } catch (error: any) {
    console.error('Erro ao salvar obstáculo no banco:', error.message);
    return { sucesso: false, erro: error.message };
  }
};