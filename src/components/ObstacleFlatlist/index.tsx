import { View, Text, FlatList } from 'react-native'
import ObstacleCard from '../ObstacleCard'
import { obterObstaculos } from '../../services/obstaculoService'
import { useEffect, useState } from 'react'
import { Obstacle } from '../../types/obstacle'

export default function ObstacleFlatlist() {

  const [obstaculos, setObstaculos] = useState<Obstacle[]>([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const buscar = async () => {
      const resultado = await obterObstaculos()
      if (resultado.sucesso) setObstaculos(resultado.data ?? [])
      setCarregando(false)
    }
    buscar()
  }, [])
  return (
    <FlatList
      data={obstaculos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ObstacleCard
          categoria={item.categoria}
          gravidade={item.gravidade}
          descricao={item.descricao}
          data_criacao={item.data_criacao}
          id={item.id}
        />
      )}
    />
  )
}