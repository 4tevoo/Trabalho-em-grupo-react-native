import { View, Text, FlatList } from 'react-native'
import ObstacleCard from '../ObstacleCard'

export default function ObstacleFlatlist() {
  return (<>
    <ObstacleCard id={0} data_criacao={'12/12/2012'} categoria={'buraco'} gravidade={'resolvido'} descricao={'dfsfrgretgfdbgfgsujyfhfghdytu'} ></ObstacleCard>
    <ObstacleCard id={0} data_criacao={'12/12/2012'} categoria={'falta_de_acessibilidade'} gravidade={'intermediario'} descricao={'dfsfrgretgfdbgfgsujyfhfghdytu'} ></ObstacleCard>
    <ObstacleCard id={0} data_criacao={'12/12/2012'} categoria={'elevador_quebrado'} gravidade={'inacessivel'} descricao={'dfsfrgretgfdbgfgsujyfhfghdytu'} ></ObstacleCard>
  </>
    // <FlatList
    //     data={data}
    //     keyExtractor={data.id}
    //     renderItem={({item})=>{<ObstacleCard categoria={item.categoria} gravidade={item.gravidade} descricao={item.descricao} data_criacao={item.data_criacao} />}}
    // ></FlatList>
  )
}