import { Breadcrumb, Button, Layout, Input } from 'antd';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IState } from '../../store/modules';
// import { setParcels } from '../../store/modules/pages/parcels/actions';

export const Parcels = () => {

  const { Content } = Layout;

  const { parcelId } = useParams<{ parcelId: string }>();

  const [testValue, setTestValue] = React.useState("")

  const dispatch = useDispatch();
  const data = useSelector((state:IState)=>state.pages.parcels)
  const handleClick = React.useCallback((payload) => dispatch({ type: 'add', payload}), []) 

  return (

    <Layout
      style={{
        padding: '0 24px',
      }}
    >
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>Главная</Breadcrumb.Item>
        <Breadcrumb.Item>Склад</Breadcrumb.Item>
        <Breadcrumb.Item>Приемки на склад</Breadcrumb.Item>
      </Breadcrumb>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: '#FFF',
        }}
      >
        <Input
          value={testValue}
          onChange={(e) => setTestValue(e.target.value)}
        />
        Parcels
        {parcelId}
        {data.map((el,i)=>(<div key={i}>{el}</div>)) }
        <Button
          onClick={()=>handleClick(testValue)}
        >Установить</Button>
      </Content>
    </Layout>

  )
}


