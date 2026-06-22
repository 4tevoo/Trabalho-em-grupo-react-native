import { SafeAreaView } from "react-native-safe-area-context"
import { styles } from "./style"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import ObstacleCard from "../../components/ObstacleCard"
import { DisabilityTypeByCategory } from "../../utils/util"
import { useEffect, useState } from "react"
import { obterObstaculos } from "../../services/obstaculoService"
import { DisabilityType, Obstacle } from "../../types/obstacle"
import SwitchButton from "../../components/SwitchButton"

export const Obstacles = () => {

  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [disabilityFilter, setDisabilityFilter] = useState<DisabilityType | null>(null)
  const [showFixed, setShowFixed] = useState(false)

  const buscar = async () => {
    const response = await obterObstaculos()
    if (response.sucesso) setObstacles(response.data ?? [])
  }

  useEffect(() => {
    buscar().finally(() => setLoading(false))
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await buscar()
    setRefreshing(false)
  }

  const filteredObstacles = obstacles
    .filter(o => showFixed || o.gravidade !== 'resolvido')
    .filter(o => !disabilityFilter || DisabilityTypeByCategory[disabilityFilter].includes(o.categoria))

  if (loading) return <ActivityIndicator />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <FlatList
          data={filteredObstacles}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ObstacleCard {...item} />}
          ListHeaderComponent={
            <>
              <SwitchButton
                label="Mostrar ocorrencias já resolvidas"
                style={{ width: '100%' }}
                isActive={showFixed}
                onPress={() => setShowFixed(!showFixed)}
              >
                Mostrar ocorrencias resolvidas
              </SwitchButton>

              <Text style={{ marginVertical: 15, fontSize: 17 }}>Filtrar por deficiência:</Text>

              <View style={styles.filtersWrapper}>

                <SwitchButton label="Visual" style={{ width: '48%' }} isActive={disabilityFilter === 'visual'} onPress={() => setDisabilityFilter(disabilityFilter === 'visual' ? null : 'visual')}>Visual</SwitchButton>
                <SwitchButton label="Cadeirante" style={{ width: '48%' }} isActive={disabilityFilter === 'cadeirante'} onPress={() => setDisabilityFilter(disabilityFilter === 'cadeirante' ? null : 'cadeirante')}>Cadeirante</SwitchButton>
                <SwitchButton label="Mobilidade reduzida" style={{ width: '48%' }} isActive={disabilityFilter === 'mobilidade_reduzida'} onPress={() => setDisabilityFilter(disabilityFilter === 'mobilidade_reduzida' ? null : 'mobilidade_reduzida')}>Mobilidade reduzida</SwitchButton>
                <SwitchButton label="Outros" style={{ width: '48%' }} isActive={disabilityFilter === 'outro'} onPress={() => setDisabilityFilter(disabilityFilter === 'outro' ? null : 'outro')}>Outro</SwitchButton>

              </View>
            </>
          }
        />
      </View>
    </SafeAreaView>
  )
}